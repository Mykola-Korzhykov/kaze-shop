import { HttpStatus, Injectable, Logger, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  TOKEN_INVALID,
  TOKEN_NOT_FOUND,
  ADMIN_NOT_FOUND,
  ERROR_WHILE_REMOVING_TOKEN,
  ERROR_WHILE_SAVING_TOKEN,
  ERROR_WHILE_VALIDATING_TOKEN,
  ERROR_WHILE_SIGNING_TOKEN,
} from '../constants/jwt-refresh.constants';
import { AdminRefreshToken } from '../models/admin.refresh.token.model';
import { AdminService } from './admin.service';
import { CreateAdminRefreshTokenDto } from '../dto/create-admin-refresh-token.dto';
import { MailService } from '../../mail/mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { TasksService } from '../../core/services/scedule.service';
import { ApiException } from '../../common/exceptions/api.exception';
import { randomBytes, scrypt, createCipheriv } from 'crypto';
import { promisify } from 'util';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class AdminJwtRefreshService {
  private readonly Logger = new Logger(AdminJwtRefreshService.name);
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private sheduleService: TasksService,
    private mailService: MailService,
    @InjectModel(AdminRefreshToken)
    private readonly adminRefreshTokenRepository: typeof AdminRefreshToken,
  ) {}

  async generateRefreshToken(
    payload: CreateAdminRefreshTokenDto,
  ): Promise<string> {
    try {
      const adminRefreshToken = this.jwtService.sign(payload);
      return adminRefreshToken;
    } catch (err) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SIGNING_TOKEN,
      );
    }
  }

  async validateRefreshToken(
    adminRefreshToken: string,
  ): Promise<CreateAdminRefreshTokenDto> {
    try {
      const adminData = this.jwtService.verify(adminRefreshToken);
      if (!adminData) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request',
          TOKEN_INVALID,
        );
      }
      return adminData;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_VALIDATING_TOKEN,
      );
    }
  }

  async insertToken(
    adminId: number,
    adminRefreshToken: string,
    email: string,
    adminAgent: string,
    phoneNumber: string,
    expireDate: Date,
  ) {
    try {
      const admin = await this.adminService.getAdminById(adminId);
      if (!admin) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          ADMIN_NOT_FOUND,
        );
      }
      const token = await this.adminRefreshTokenRepository.create({
        adminRefreshToken: adminRefreshToken,
        adminId: admin.id,
        email: email,
        adminAgent: adminAgent,
        phoneNumber: phoneNumber,
      });
      token.setIdentifier(v4());
      await token.save();
      if (!token.getExpireDate()) {
        token.setExpireDate(expireDate);
        await token.save();
      }
      if (
        !admin.getAdminRefreshTokens() ||
        admin.getAdminRefreshTokens().length === 0
      ) {
        admin.$set('adminRefreshTokens', token.id);
        admin.adminRefreshTokens = [token];
      } else {
        admin.$add('adminRefreshTokens', token.id);
      }
      await admin.save();
      return token;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SAVING_TOKEN,
      );
    }
  }

  async saveToken(
    adminId: number,
    adminRefreshToken: string,
    email: string,
    adminAgent: string,
    phoneNumber: string,
    expireDate: Date,
    identifier: string,
  ): Promise<AdminRefreshToken> {
    try {
      const admin = await this.adminService.getAdminById(adminId);
      if (!admin) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          ADMIN_NOT_FOUND,
        );
      }
      const tokenData = await this.adminRefreshTokenRepository.findOne({
        where: {
          adminId: adminId,
          identifier: identifier,
        },
      });
      if (tokenData && admin.getAdminAgent() === 'null') {
        admin.setAdminAgent(adminAgent);
        tokenData.setAdminAgent(adminAgent);
        await admin.save();
        await tokenData.save();
      }
      if (tokenData) {
        tokenData.adminRefreshToken = adminRefreshToken;
        if (
          admin.getAdminAgent() &&
          admin.getAdminAgent().trim() !== adminAgent
        ) {
          admin.setIsActivated(false);
          const link = await this.generateEncryptedValue('ADMIN', 16);
          const code = this.generateActivationCode();
          admin.setResetToken(
            link.replace('/', `${v4()}`).replace('=', `${v4()}`),
          );
          admin.setActivationCode(code);
          admin.setResetTokenExpiration(Number(Date.now() + 3600000));
          await admin.save();
          this.Logger.log(
            `checking owner with email ${admin.email}`,
            admin.getAdminAgent() !== adminAgent,
          );
          this.mailService.sendActivationMailToAdmin(
            admin.email,
            `${process.env.API_URL}/auth/activate/${admin
              .getResetToken()
              .trim()}?code=${code}`,
          );
        }
        await tokenData.save();
        return tokenData;
      }
      const token = await this.adminRefreshTokenRepository.create({
        adminRefreshToken: adminRefreshToken,
        adminId: adminId,
        email: email,
        adminAgent: adminAgent,
        phoneNumber: phoneNumber,
      });
      if (!token.getExpireDate()) {
        token.setExpireDate(expireDate);
        await token.save();
      }
      return token;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SAVING_TOKEN,
      );
    }
  }

  async removeToken(adminRefreshToken: string): Promise<number> {
    try {
      const token = await this.findToken(adminRefreshToken);
      if (!token) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          TOKEN_NOT_FOUND,
        );
      }
      const admin = await this.adminService.getAdminById(token.adminId);
      admin.$remove('adminRefreshTokens', token.token.id);
      await admin.save();
      const tokenData = await this.adminRefreshTokenRepository.destroy({
        where: { adminRefreshToken: adminRefreshToken },
      });
      return tokenData;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_REMOVING_TOKEN,
      );
    }
  }

  async findToken(adminRefreshToken: string): Promise<
    | false
    | {
        token: AdminRefreshToken;
        adminId: number;
      }
  > {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { adminRefreshToken: adminRefreshToken },
      include: {
        all: true,
      },
    });
    if (!token) {
      return false;
    }
    return { token: token, adminId: token.adminId };
  }

  async findTokenByToken(
    adminRefreshToken: string,
    identifier: string,
  ): Promise<AdminRefreshToken | false> {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { adminRefreshToken: adminRefreshToken, identifier: identifier },
    });
    if (!token) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        TOKEN_NOT_FOUND,
      );
    }
    return token;
  }

  async findTokenByParams(
    email: string,
    phoneNumber: string,
    identifier: string,
  ): Promise<AdminRefreshToken> {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { email: email, phoneNumber: phoneNumber, identifier: identifier },
    });
    if (!token) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        TOKEN_INVALID,
      );
    }
    return token;
  }

  async removeTokenInTime(
    adminRefreshTokenId: number,
    identifier: string,
  ): Promise<number | false> {
    const token = await AdminRefreshToken.findOne({
      where: {
        id: adminRefreshTokenId,
        identifier: identifier,
      },
    });
    if (!token) {
      return false;
    }
    const admin = await this.adminService.getAdminById(token.adminId);
    admin.$remove('adminRefreshTokens', token.id);
    await admin.save();
    return this.adminRefreshTokenRepository.destroy({
      where: {
        id: token.id,
        phoneNumber: token.phoneNumber,
        identifier: identifier,
      },
    });
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

  private generateActivationCode(): number {
    const confirmCode = Number(('' + Math.random()).substring(2, 10));
    return confirmCode;
  }
}
