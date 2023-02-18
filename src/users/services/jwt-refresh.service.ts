import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ERROR_WHILE_REMOVING_TOKEN,
  ERROR_WHILE_SAVING_TOKEN,
  ERROR_WHILE_SIGNING_TOKEN,
  ERROR_WHILE_VALIDATING_TOKEN,
  TOKEN_INVALID,
  TOKEN_NOT_FOUND,
  USER_NOT_FOUND,
} from '../constants/jwt-refresh.constants';
import { UserRefreshToken } from '../models/user.refresh.token.model';
import { UsersService } from './users.service';
import { CreateUserRefreshTokenDto } from '../dto/create-user-refresh-token.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TasksService } from '../../core/services/scedule.service';
import { ApiException } from '../../common/exceptions/api.exception';
import { v4 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class UserJwtRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private sheduleService: TasksService,
    @InjectModel(UserRefreshToken)
    private readonly userRefreshTokenRepository: typeof UserRefreshToken,
  ) {}

  async generateRefreshToken(
    payload: CreateUserRefreshTokenDto,
  ): Promise<string> {
    try {
      const userRefreshToken = this.jwtService.sign(payload);
      return userRefreshToken;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SIGNING_TOKEN
      );   
    }
  }

  async validateRefreshToken(
    userRefreshToken: string,
  ): Promise<CreateUserRefreshTokenDto> {
    try {
      const userData = this.jwtService.verify(userRefreshToken);
      if (!userData) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', TOKEN_INVALID);
      } 
      return userData;
    } catch (err: unknown) {
       throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
          'Internal Server Error',
          ERROR_WHILE_VALIDATING_TOKEN
        );  
    }
  }

  async insertToken(
    userId: number,
    userRefreshToken: string,
    email: string,
    userAgent: string,
    expireDate: Date,
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
         throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);   
      }
      const token = await this.userRefreshTokenRepository.create({
        userRefreshToken: userRefreshToken,
        userId: user.id,
        email: email,
        userAgent:
          userAgent ||
          'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
      });
      token.setIdentifier(v4());
      await token.save();
      if (!token.getExpireDate()) {
        token.setExpireDate(expireDate);
        await token.save(); 
      }
      if (!user.getUserRefreshTokens() || user.getUserRefreshTokens().length === 0) {
        user.$set('userRefreshTokens', token.id);
        user.userRefreshTokens = [token];
      } else {
        user.$add('userRefreshTokens', token.id);
      }
      await user.save();
      return token;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SAVING_TOKEN
      );   
    }
  }

  async saveToken(
    userId: number,
    userRefreshToken: string,
    email: string,
    userAgent: string,
    expireDate: Date,
    identifier: string,
  ): Promise<UserRefreshToken> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
         throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', USER_NOT_FOUND);   
      }
      const tokenData = await this.userRefreshTokenRepository.findOne({
        where: {
          userId: userId,
          identifier: identifier,
        },
      });
      if (tokenData) {
        tokenData.userRefreshToken = userRefreshToken;
        return tokenData.save();
      }
      const token = await this.userRefreshTokenRepository.create({
        userRefreshToken: userRefreshToken,
        userId: userId,
        email: email,
        userAgent:
          userAgent ||
          'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
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
          ERROR_WHILE_SAVING_TOKEN
        );   
    }
  }

  async removeToken(userRefreshToken: string): Promise<number> {
    try {
      const token = await this.findToken(userRefreshToken);
      if (!token) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      const user = await this.userService.getUserById(token.userId);
      user.$remove('userRefreshTokens', token.token.id);
      await user.save();
      const tokenData = await this.userRefreshTokenRepository.destroy({
        where: { userRefreshToken: userRefreshToken },
      });
      return tokenData;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_REMOVING_TOKEN
      );   
    }
  }

  async findTokenByToken(
    userRefreshToken: string,
    identifier: string,
  ): Promise<UserRefreshToken> {
    const token = await UserRefreshToken.findOne({
      where: {
        userRefreshToken: userRefreshToken,
        identifier: identifier,
      },
    });
    if (!token) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
    }
    return token;
  }

  async findToken(
    userRefreshToken: string,
  ): Promise<{
    token: UserRefreshToken;
    userId: number;
  }>{
    const token = await UserRefreshToken.findOne({
      where: {
        userRefreshToken: userRefreshToken,
      },
    });
    if (!token) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
    }
    return {
      token: token,
      userId: token.userId,
    };
  }

  async removeTokenInTime(
    userRefreshTokenId: number,
    identifier: string,
  ): Promise<number | false> {
    const token = await this.userRefreshTokenRepository.findOne({
      where: {
        id: userRefreshTokenId,
        identifier: identifier,
      },
    });
    if (!token) {
      return false;
    }
    const user = await this.userService.getUserById(token.userId);
    user.$remove('userRefreshTokens', token.id);
    await user.save();
    return this.userRefreshTokenRepository.destroy({
      where: { id: userRefreshTokenId, identifier: identifier },
    });
  }
}
