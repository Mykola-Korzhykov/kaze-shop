import { HttpStatus, Injectable, Logger, Scope } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { randomBytes, scrypt, createCipheriv } from 'crypto';
import { promisify } from 'util';
import { v4 } from 'uuid';
import { ApiException } from '../../common/exceptions/api.exception';
import { TasksService } from '../../core/services/scedule.service';
import { MailService } from '../../mail/mail.service';
import {
  ERROR_WHILE_REMOVING_TOKEN,
  ERROR_WHILE_SAVING_TOKEN,
  ERROR_WHILE_SIGNING_TOKEN,
  ERROR_WHILE_VALIDATING_TOKEN,
  TOKEN_INVALID,
  TOKEN_NOT_FOUND,
} from '../constants/jwt-refresh.constants';
import { OWNER_NOT_FOUND } from '../constants/owner.constants';
import { CreateOwnerRefreshTokenDto } from '../dto/create.owner.refresh.token.dto';
import { OwnerRefreshToken } from '../models/owner.refresh.token.model';
import { OwnerService } from './owner.service';

@Injectable({ scope: Scope.TRANSIENT })
export class OwnerJwtRefreshService {
  private readonly Logger = new Logger(OwnerJwtRefreshService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly ownerService: OwnerService,
    private readonly mailService: MailService,
    private sheduleService: TasksService,
    @InjectModel(OwnerRefreshToken)
    private readonly ownerRefreshTokenRepository: typeof OwnerRefreshToken,
  ) {}

  async generateRefreshToken(
    payload: CreateOwnerRefreshTokenDto,
  ): Promise<string> {
    try {
      const ownerRefreshToken = this.jwtService.sign(payload);
      return ownerRefreshToken;
    } catch (err) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SIGNING_TOKEN,
      );
    }
  }

  async validateRefreshToken(
    ownerRefreshToken: string,
  ): Promise<CreateOwnerRefreshTokenDto | void> {
    try {
      const ownerData = this.jwtService.verify(ownerRefreshToken);
      if (!ownerData) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request',
          TOKEN_INVALID,
        );
      }
      return ownerData;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_VALIDATING_TOKEN,
      );
    }
  }

  async insertToken(
    ownerId: number,
    ownerRefreshToken: string,
    email: string,
    ownerAgent: string,
    phoneNumber: string,
    expireDate: Date,
  ) {
    try {
      const owner = await this.ownerService.getOwnerById(ownerId);
      if (!owner) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          OWNER_NOT_FOUND,
        );
      }
      const token = await this.ownerRefreshTokenRepository.create({
        ownerRefreshToken: ownerRefreshToken,
        ownerId: owner.id,
        email: email,
        ownerAgent: ownerAgent,
        phoneNumber: phoneNumber,
      });
      token.setIdentifier(v4());
      await token.save();
      if (!token.getExpireDate()) {
        token.setExpireDate(expireDate);
        await token.save();
      }
      if (
        !owner.getOwnerRefreshTokens() ||
        owner.getOwnerRefreshTokens().length === 0
      ) {
        owner.$set('ownerRefreshTokens', token.id);
        owner.ownerRefreshTokens = [token];
      } else {
        owner.$add('ownerRefreshTokens', token.id);
      }
      return token;
    } catch (err: unknown) {
      console.log(err);
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_SAVING_TOKEN,
      );
    }
  }

  async saveToken(
    ownerId: number,
    ownerRefreshToken: string,
    email: string,
    ownerAgent: string,
    phoneNumber: string,
    expireDate: Date,
    identifier: string,
  ): Promise<OwnerRefreshToken> {
    try {
      const owner = await this.ownerService.getOwnerById(ownerId);
      if (!owner) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          OWNER_NOT_FOUND,
        );
      }
      const tokenData = await this.ownerRefreshTokenRepository.findOne({
        where: {
          ownerId: ownerId,
          identifier: identifier,
        },
      });
      if (tokenData && !owner.getOwnerAgent()) {
        owner.setOwnerAgent(ownerAgent);
        tokenData.setownerAgent(ownerAgent);
        await owner.save();
        await tokenData.save();
      }
      if (tokenData) {
        tokenData.ownerRefreshToken = ownerRefreshToken;
        if (
          owner.getOwnerAgent() &&
          owner.getOwnerAgent().trim() !== ownerAgent
        ) {
          owner.setIsActivated(false);
          const link = await this.generateEncryptedValue('OWNER', 16);
          const code = this.generateActivationCode();
          owner.setResetToken(
            link.replace('/', `${v4()}`).replace('=', `${v4()}`),
          );
          owner.setActivationCode(code);
          owner.setResetTokenExpiration(Number(Date.now() + 3600000));
          await owner.save();
          this.Logger.log(
            `checking owner with email ${owner.email}`,
            owner.getOwnerAgent() !== ownerAgent,
          );
          this.mailService.sendActivationMailToOwner(
            owner.email,
            `${process.env.API_URL}/auth/activate/${owner
              .getResetToken()
              .trim()}?code=${code}`,
          );
        }
        return tokenData.save();
      }
      const token = await this.ownerRefreshTokenRepository.create({
        ownerRefreshToken: ownerRefreshToken,
        ownerId: ownerId,
        email: email,
        ownerAgent: ownerAgent,
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

  async removeToken(ownerRefreshToken: string): Promise<number> {
    try {
      const token = await this.findToken(ownerRefreshToken);
      if (!token) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          TOKEN_NOT_FOUND,
        );
      }
      const owner = await this.ownerService.getOwnerById(token.ownerId);
      owner.$remove('ownerRefreshTokens', token.token.id);
      await owner.save();
      const tokenData = await this.ownerRefreshTokenRepository.destroy({
        where: { ownerRefreshToken: ownerRefreshToken },
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

  async findTokenByToken(
    ownerRefreshToken: string,
    identifier: string,
  ): Promise<OwnerRefreshToken> {
    const token = await this.ownerRefreshTokenRepository.findOne({
      where: {
        ownerRefreshToken: ownerRefreshToken,
        identifier: identifier,
      },
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

  async findToken(ownerRefreshToken: string): Promise<
    | false
    | {
        token: OwnerRefreshToken;
        ownerId: number;
      }
  > {
    const token = await this.ownerRefreshTokenRepository.findOne({
      where: { ownerRefreshToken: ownerRefreshToken },
    });
    if (!token) {
      return false;
    }
    return { token: token, ownerId: token.ownerId };
  }

  async findTokenByParams(
    email: string,
    phoneNumber: string,
    identifier: string,
  ): Promise<OwnerRefreshToken> {
    const token = await this.ownerRefreshTokenRepository.findOne({
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
    ownerRefreshTokenId: number,
    identifier: string,
  ): Promise<number | false> {
    const token = await OwnerRefreshToken.findOne({
      where: {
        id: ownerRefreshTokenId,
        identifier: identifier,
      },
    });
    if (!token) {
      return false;
    }
    const owner = await this.ownerService.getOwnerById(token.ownerId);
    owner.$remove('ownerRefreshTokens', token.id);
    await owner.save();
    return OwnerRefreshToken.destroy({
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
