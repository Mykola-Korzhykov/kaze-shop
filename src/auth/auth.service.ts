import {
  HttpStatus,
  Injectable,
  Logger,
  Next,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import {
  AuthUser,
  Payload,
  Tokens,
  CodeDto,
} from '../core/interfaces/auth.interfaces';
import {
  InitializeUser,
  ValidateUser,
} from '../core/interfaces/user.interfaces';
import {
  ACTIVATION_EXPIRED,
  ADMIN_NOT_AUTHORIZIED,
  LANGUAGE_NOT_PROVIDED,
  OWNER_NOT_AUTHORIZIED,
  USER_NOT_AUTHORIZIED,
} from './auth.constants';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { NextFunction, Request, Response } from 'express';
import { MailService } from '../mail/mail.service';
import { AdminService } from '../admin/services/admin.service';
import { OwnerService } from '../owner/services/owner.service';
import { UserJwtRefreshTokenService } from '../users/services/jwt-refresh.service';
import { UsersService } from '../users/services/users.service';
import { OwnerJwtRefreshService } from '../owner/services/jwt-refresh.service';
import { AdminJwtRefreshService } from '../admin/services/jwt-refresh.service';
import { User } from '../users/models/user.model';
import { Owner } from '../owner/models/owner.model';
import { Admin } from '../admin/models/admin.model';
import { CreateAccessTokenDto } from './dto/create.access.token.dto';
import { USER_NOT_FOUND } from '../users/constants/user.constants';
import { ResetDto } from './dto/reset.password.dto';
import { ChangeDto } from './dto/change.password.dto';
import { v4 } from 'uuid';
import { TasksService } from '../core/services/scedule.service';
import { ApiException } from '../common/exceptions/api.exception';
import { TOKEN_NOT_FOUND } from '../admin/constants/jwt-refresh.constants';
import { OwnerRefreshToken } from '../owner/models/owner.refresh.token.model';
import { AdminRefreshToken } from '../admin/models/admin.refresh.token.model';
import { UserRefreshToken } from '../users/models/user.refresh.token.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { JwtRefreshTokenDeletedEvent } from 'src/core/events/jwt-refresh-token-deleted.evet';
@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  private readonly Logger = new Logger(AuthService.name);
  constructor(
    private readonly ownerJwtRefreshTokenService: OwnerJwtRefreshService,
    private readonly adminJwtRefreshTokenService: AdminJwtRefreshService,
    private readonly ownerService: OwnerService,
    private readonly adminService: AdminService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
    private readonly jwtService: JwtService,
    private readonly userJwtRefreshTokenService: UserJwtRefreshTokenService,
  ) {}

  async login(
    userDto: LoginDto,
    response: Response,
    request: Request,
    next: NextFunction,
    userAgent: string,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const user = await this.authenticateUser(userDto, userAgent, false);
      const tokens = await this.generateTokens(user, userAgent);
      await this.activateUser(user, response);
      response.cookie('refreshToken', tokens.refreshToken, {
        maxAge: Number(tokens.expireDate),
        path: '/',
        httpOnly: true,
        expires: tokens.expireDate,
        // domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
      });
      return response.json({ ...this.setResponse(tokens, user) });
    } catch (error: unknown) {
      return next(error);
    }
  }

  async signup(
    userDto: SignupDto,
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    userAgent: string,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      if (!authHeader || bearer !== 'Bearer') {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const user = await this.authenticateUser(userDto, userAgent, true);
      const tokens = await this.generateTokens(user, userAgent);
      await this.activateUser(user, response);
      response.cookie('refreshToken', tokens.refreshToken, {
        maxAge: Number(tokens.expireDate),
        path: '/',
        httpOnly: true,
        expires: tokens.expireDate,
        // domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
      });
      return response.json({ ...this.setResponse(tokens, user) });
    } catch (error: unknown) {
      return next(error);
    }
  }

  async logout(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    type: 'OWNER' | 'ADMIN' | null,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      if (!authHeader || bearer !== 'Bearer') {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const refreshToken = request?.cookies['refreshToken'];
      const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
      let logout: number;
      if (type && type === 'OWNER') {
        response.clearCookie('user-id');
        response.clearCookie('refreshToken');
        logout = await this.ownerJwtRefreshTokenService.removeToken(
          decodedToken,
        );
        return response.json({ logout });
      }
      if (type && type === 'ADMIN') {
        response.clearCookie('user-id');
        response.clearCookie('refreshToken');
        logout = await this.adminJwtRefreshTokenService.removeToken(
          decodedToken,
        );
        return response.json({ logout });
      }
      logout = await this.userJwtRefreshTokenService.removeToken(decodedToken);
      response.clearCookie('refreshToken');
      return response.json({ logout }); 
    } catch (error: unknown) {
      return next(error);
    }
  }

  async refresh(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    type: 'OWNER' | 'ADMIN' | null,
    userAgent: string,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const refreshToken = request?.cookies['refreshToken'];
      if (!refreshToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
      }
      const dto = await this.validateRefreshToken(refreshToken, type);
      if (!dto.user) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);   
      }
      const tokens = await this.refreshTokens(dto.user, userAgent, dto.identifier);
      response.cookie('refreshToken', tokens.refreshToken, {
        maxAge: Number(tokens.expireDate),
        path: '/',
        httpOnly: true,
        expires: tokens.expireDate,
        // domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
      });
      await this.activateUser(dto.user, response);
      return response.json({ ...this.setResponse(tokens, dto.user) });
    } catch (error: unknown) {
      return next(error);
    }
  }

  async activate(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
    activationLink: string,
    code: number,
    type: 'OWNER' | 'ADMIN',
    userAgent: string,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const user = await this.setIsActivated(
        type,
        code,
        activationLink,
        request,
      );
      await this.activateUser(user, response);
      return response.redirect(process.env.CLIENT_URL.toString());
    } catch (error: unknown) {
      return next(error);
    }
  }

  async setCode(
    codeDto: CodeDto,
    locale: 'ua' | 'ru' | 'rs' | 'en',
  ): Promise<string> {
    if (!locale) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request!', LANGUAGE_NOT_PROVIDED);
    }
    const code = this.generateConfirmCode();
    if (codeDto?.type && codeDto?.type === 'OWNER') {
      const email = await this.ownerService.setConfirmCode(codeDto, code);
      await this.mailService.sendCode(email, code, locale);
      return email;
    }
    if (codeDto?.type && codeDto?.type === 'ADMIN') {
      const email = await this.adminService.setConfirmCode(codeDto, code);
      await this.mailService.sendCode(email, code, locale);
      return email;
    }
    const email = await this.userService.setConfirmCode(codeDto, code);
    await this.mailService.sendCode(email, code, locale);
    return email;
  }

  async resetPassword(resetDto: ResetDto, codeDto: CodeDto): Promise<string | void> {
    if (codeDto?.type && codeDto?.type === 'OWNER') {
      return this.ownerService.resetPassword(resetDto);
    }
    if (codeDto?.type && codeDto?.type === 'ADMIN') {
      return this.adminService.resetPassword(resetDto);
    }
    return this.userService.resetPassword(resetDto);
  }

  async changePassword(
    @Res() response: Response,
    @Req() request: Request,
    @Next() next: NextFunction,
    changeDto: ChangeDto,
    userId: number,
    type: 'OWNER' | 'ADMIN' | null,
  ) {
    if (type && type === 'OWNER') {
      await this.ownerService.changePassword(userId, changeDto.password);
    }
    if (type && type === 'ADMIN') {
      await this.adminService.changePassword(userId, changeDto.password);
    }
    if (!type) {
      await this.userService.changePassword(userId, changeDto.password);
    }
    return this.logout(response, request, next, type);
  }

  async validateAccessToken(token: string): Promise<Payload> {
    try {
      const userData = this.jwtService.verify(token);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  private generateConfirmCode(): number {
    const confirmCode = Number(('' + Math.random()).substring(2, 10));
    return confirmCode;
  }

  private generateAccessToken(payload: CreateAccessTokenDto): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  private setResponse(tokens: Tokens, user: User | Admin | Owner): AuthUser {
    if (user instanceof Owner) {
      return {
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          name: user.getName(),
          surname: user.getSurname(),
          phoneNumber: user.phoneNumber,
          email: user.email,
          type: 'OWNER',
        },
      };
    }
    if (user instanceof Admin) {
      return {
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          name: user.getName(),
          surname: user.getSurname(),
          phoneNumber: user.phoneNumber,
          email: user.email,
          type: 'ADMIN',
        },
      };
    }
    return {
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        name: user.getName(),
        surname: user.getSurname(),
        phoneNumber: user.phoneNumber,
        email: user.email,
        country: user.getCountry(),
        city: user.getCity(),
        postOffice: user.getPostOffice(),
        type: 'USER',
      },
    };
  }

  private async generateTokens(
    user: User | Admin | Owner,
    userAgent: string
  ): Promise<Tokens> {
    let accessToken: string;
    let refreshToken: string;
    let dbToken: OwnerRefreshToken | AdminRefreshToken | UserRefreshToken;
    if (user instanceof User) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        email: user.email,
        roles: user.roles,
      });
      refreshToken = await this.userJwtRefreshTokenService.generateRefreshToken(
        {
          userId: user.id,
          isActivated: user.getIsActivated(),
          email: user.email,
          roles: user.roles,
        },
      );
      dbToken = await this.userJwtRefreshTokenService.insertToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        new Date(new Date().setDate(new Date().getDate() + 7)),
      );
    }
    if (user instanceof Admin) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        userActivationLink: user.activationLink,
        email: user.email,
        roles: user.roles,
      });
      refreshToken =
        await this.adminJwtRefreshTokenService.generateRefreshToken({
          isActivated: user.getIsActivated(),
          email: user.email,
          adminId: user.id,
          adminAgent: userAgent,
          roles: user.roles,
        });
      dbToken = await this.adminJwtRefreshTokenService.insertToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        user.phoneNumber,
        new Date(new Date().setDate(new Date().getDate() + 2)),
      );
    }
     if (user instanceof Owner) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        userActivationLink: user.activationLink,
        email: user.email,
        roles: user.roles,
      });
      refreshToken =
        await this.ownerJwtRefreshTokenService.generateRefreshToken({
          isActivated: user.getIsActivated(),
          email: user.email,
          ownerId: user.id,
          ownerAgent: userAgent,
          roles: user.roles,
        });
      dbToken = await this.ownerJwtRefreshTokenService.insertToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        user.phoneNumber,
        new Date(new Date().setDate(new Date().getDate() + 1)),
      );
    }
    const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString(
      'base64',
    );
    const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString(
      'base64',
    );
    this.setTimeouts(user, refreshToken, dbToken.identifier); 
    return {
      expireDate: dbToken.getExpireDate(),
      refreshToken: encodedRefreshToken,
      accessToken: encodedAccessToken,
    };
  }

  private async refreshTokens(
    user: User | Admin | Owner,
    userAgent: string,
    identifier: string,
  ): Promise<Tokens> {
    let accessToken: string;
    let refreshToken: string;
    let dbToken: OwnerRefreshToken | AdminRefreshToken | UserRefreshToken;
    if (user instanceof User) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        email: user.email,
        roles: user.roles,
      });
      refreshToken = await this.userJwtRefreshTokenService.generateRefreshToken(
        {
          userId: user.id,
          isActivated: user.getIsActivated(),
          email: user.email,
          roles: user.roles,
        },
      );
      dbToken = await this.userJwtRefreshTokenService.saveToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        new Date(new Date().setDate(new Date().getDate() + 7)),
        identifier,
      );
    }
    if (user instanceof Admin) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        userActivationLink: user.activationLink,
        email: user.email,
        roles: user.roles,
      });
      refreshToken =
        await this.adminJwtRefreshTokenService.generateRefreshToken({
          isActivated: user.getIsActivated(),
          email: user.email,
          adminId: user.id,
          adminAgent: userAgent,
          roles: user.roles,
        });
      dbToken = await this.adminJwtRefreshTokenService.saveToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        user.phoneNumber,
        new Date(new Date().setDate(new Date().getDate() + 2)),
        identifier,
      );
    }
     if (user instanceof Owner) {
      accessToken = this.generateAccessToken({
        userId: user.id,
        isUserActivated: user.getIsActivated(),
        userActivationLink: user.activationLink,
        email: user.email,
        roles: user.roles,
      });
      refreshToken =
        await this.ownerJwtRefreshTokenService.generateRefreshToken({
          isActivated: user.getIsActivated(),
          email: user.email,
          ownerId: user.id,
          ownerAgent: userAgent,
          roles: user.roles,
        });
      dbToken = await this.ownerJwtRefreshTokenService.saveToken(
        user.id,
        refreshToken,
        user.email,
        userAgent,
        user.phoneNumber,
        new Date(new Date().setDate(new Date().getDate() + 1)),
        identifier,
      );
    }
    const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString(
      'base64',
    );
    const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString(
      'base64',
    );
    return {
      expireDate: dbToken.getExpireDate(),
      refreshToken: encodedRefreshToken,
      accessToken: encodedAccessToken,
    };
  }

  private async authenticateUser(
    userDto: InitializeUser | ValidateUser,
    userAgent: string,
    isNew: boolean,
  ): Promise<Admin | Owner | User> {
    const owner = await this.ownerService.validateOwner({
      email: userDto.email,
      password: userDto.password,
    });
    if (owner instanceof Owner && !owner.getOwnerAgent()) {
      owner.setOwnerAgent(userAgent);
      await owner.save();
    }
    if (owner && owner instanceof Owner) {
      return owner;
    }
    const admin = await this.adminService.validateAdmin({
      email: userDto.email,
      password: userDto.password,
    });
    if (admin instanceof Admin && !admin.getAdminAgent()) {
      admin.setAdminAgent(userAgent);
      await admin.save();
    }
    if (admin && admin instanceof Admin) {
      return admin;
    }
    if (
      isNew &&
      'name' in <InitializeUser>userDto &&
      'surname' in <InitializeUser>userDto &&
      'phoneNumber' in <InitializeUser>userDto &&
      'email' in <InitializeUser>userDto &&
      'password' in <InitializeUser>userDto &&
      'confirmPassword' in <InitializeUser>userDto
    ) {
      const user = await this.userService.initializeUser(
        <InitializeUser>userDto,
      );
      return user;
    }
    const user = await this.userService.validateUser(<ValidateUser>userDto);
    if (user instanceof User) {
      return user;
    }
    throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);   
  }

  private async validateRefreshToken(
    refreshToken: string,
    type: 'OWNER' | 'ADMIN' | null,
  ): Promise<{
    user: Owner;
    identifier: string;
  } | {
    user: Admin;
    identifier: string;
  } | {
    user: User;
    identifier: string;
  }> {
    const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
    if (type && type === 'OWNER') {
      const ownerData =
        await this.ownerJwtRefreshTokenService.validateRefreshToken(
          decodedToken,
        );
      if (!ownerData) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
      }
      const owner = await this.ownerService.getOwnerById(ownerData.ownerId);
      const dbToken = await this.ownerJwtRefreshTokenService.findToken(decodedToken);
      if (!dbToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
      }
      return {
        user: owner,
        identifier: dbToken.token.getIdentifier(),
      };
    }
    if (type && type === 'ADMIN') {
      const adminData =
        await this.adminJwtRefreshTokenService.validateRefreshToken(
          decodedToken,
        );
      if (!adminData) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ADMIN_NOT_AUTHORIZIED);
      }
      const admin = await this.adminService.getAdminById(adminData.adminId);
      const dbToken = await this.adminJwtRefreshTokenService.findToken(decodedToken);
      if (!dbToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
      }
      return {
        user: admin,
        identifier: dbToken.token.getIdentifier(),
      };
    }
    const userData = await this.userJwtRefreshTokenService.validateRefreshToken(
      decodedToken,
    );
    if (!userData) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', USER_NOT_AUTHORIZIED);
    }
    const user = await this.userService.getUserById(userData.userId);
    if (!user) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);
    }
    const dbToken = await this.userJwtRefreshTokenService.findToken(decodedToken);
      if (!dbToken) {
        throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_NOT_AUTHORIZIED);
      }
    return {
      user: user,
      identifier: dbToken.token.getIdentifier(),
    };
  }

  private async generateEncryptedValue(
    value: string,
    bytes: number,
  ): Promise<string> {
    const iv = randomBytes(bytes);
    const API_KEY = process.env.API_KEY.toString();
    const key = (await promisify(scrypt)(API_KEY, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    return Buffer.concat([cipher.update(value), cipher.final()]).toString(
      'base64',
    );
  }

  private async activateUser(
    user: Admin | Owner | User,
    response: Response,
  ): Promise<void> {
    if (user instanceof User) {
      return;
    }
    if (user instanceof Admin) {
      response.cookie('user-id', user.activationLink, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        signed: true,
        path: '/',
        httpOnly: true,
        // domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
      });
    } 
    if (user instanceof Admin && !user.getIsActivated()) {
      const link = await this.generateEncryptedValue('ADMIN', 16);
      const code = this.generateConfirmCode();
      user.setResetToken(link.replace('/', `${v4()}`).replace('=', `${v4()}`));
      user.setActivationCode(code);
      user.setResetTokenExpiration(Number(Date.now() + 3600000));
      await user.save();
      return this.mailService.sendActivationMailToAdmin(
        user.email,
        `${process.env.API_URL}/auth/activate/${user.getResetToken().trim()}?code=${code}`,
      );
    }
    if (user instanceof Owner) {
      response.cookie('user-id', user.activationLink, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        signed: true,
        httpOnly: true,
        // domain: process.env.CLIENT_DOMAIN.toString().trim(),
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'strict',
        path: '/',
      });
    }
    if (user instanceof Owner && !user.getIsActivated()) {
      const link = await this.generateEncryptedValue('OWNER', 16);
      const code = this.generateConfirmCode();
      user.setResetToken(link.replace('/', `${v4()}`).replace('=', `${v4()}`));
      user.setActivationCode(code);
      user.setResetTokenExpiration(Number(Date.now() + 3600000));
      await user.save();
      this.Logger.log(`activating owner with email ${user.email}`);
      return this.mailService.sendActivationMailToOwner(
        user.email,
        `${process.env.API_URL}/auth/activate/${user.getResetToken().trim()}?code=${code}`,
      );
    }
    return;
  }

  private async setIsActivated(
    type: 'OWNER' | 'ADMIN',
    code: number,
    activationLink: string,
    request: Request,
  ): Promise<Admin | Owner> {
    let user: Owner | Admin;
    if (type && type === 'OWNER') {
      user = await this.ownerService.findByActivationLink(
        request['activationLink'],
      );
      user.setOwnerAgent(null);
      await user.save();
    }
    if (type && type === 'ADMIN') {
      user = await this.adminService.findByActivationLink(
        request['activationLink'],
      );
      user.setAdminAgent(null);
      await user.save();
    }
    if (!user || activationLink !== user.resetToken) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);
    }
    if (
      Number(Date.now()) >= user.getResetTokenExpiration() &&
      code !== user.getActivationCode()
    ) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ACTIVATION_EXPIRED);
    }
    user.setIsActivated(true);
    return user.save();
  }

  async setTimeouts(
    user: User | Admin | Owner,
    refreshToken: string,
    identifier: string,
  ): Promise<NodeJS.Timeout | void> {
    if (user instanceof User) {
      const refreshData = await this.userJwtRefreshTokenService.findTokenByToken(
        refreshToken,
        identifier,
      );
      if (!refreshData) {
         throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      return this.addTimeoutForTokens(
        `delete-user-refresh-token,: ${v4()}`,
        Number(process.env.USER_DELAY),
        refreshData.id,
        identifier,
        this.userJwtRefreshTokenService.removeTokenInTime,
      );
    }
    if (user instanceof Admin) {
      const refreshData =
        await this.adminJwtRefreshTokenService.findTokenByToken(
          refreshToken,
          identifier,
        );
      if (!refreshData) {
         throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      return this.addTimeoutForTokens(
        `delete-admin-refresh-token: ${v4()}`,
        Number(process.env.ADMIN_DELAY),
        refreshData.id,
        identifier,
        this.adminJwtRefreshTokenService.removeTokenInTime,
      );
    }
    if (user instanceof Owner) {
      const refreshData =
        await this.ownerJwtRefreshTokenService.findTokenByToken(
          refreshToken,
          identifier,
        );
      if (!refreshData) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      return this.addTimeoutForTokens(
        `delete-owner-refresh-token: ${v4()}`,
        Number(process.env.OWNER_DELAY),
        refreshData.id,
        identifier,
        this.ownerJwtRefreshTokenService.removeTokenInTime,
      );
    }
  }

  addTimeoutForTokens(
    name: string,
    milliseconds: number,
    refreshTokenId: number,
    identifier: string,
    cb: (refreshTokenId: number, identifier: string) => Promise<number | false>,
  ): NodeJS.Timeout {
    const callback = async (): Promise<boolean | void> => {
      this.Logger.log(`Timeout ${name} executing after (${milliseconds})!`);
      const timeout = await cb(refreshTokenId, identifier);
      if (!timeout) {
        return this.deleteTimeout(name);
      }
      this.deleteTimeout(name);
      const jwtRefreshTokenDeletedEvent = new JwtRefreshTokenDeletedEvent();
      jwtRefreshTokenDeletedEvent.name = name;
      jwtRefreshTokenDeletedEvent.userId = refreshTokenId;
      jwtRefreshTokenDeletedEvent.description = `deleted user refresh token: ${refreshTokenId}`;
      return this.eventEmitter.emit(
        'refreshtoken.deleted',
        jwtRefreshTokenDeletedEvent,
      );
    };
    this.Logger.warn(`Timeout ${name} executing!`);
    const timeout = setTimeout(callback, milliseconds);
    this.schedulerRegistry.addTimeout(name, timeout);
    return timeout;
  }

  deleteTimeout(name: string): void {
    this.schedulerRegistry.deleteTimeout(name);
    this.Logger.log(`Timeout ${name} deleted!`);
    return;
  }

}
