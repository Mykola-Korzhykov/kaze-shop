import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ApiException } from 'src/common/exceptions/api.exception';
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
          ERROR_WHILE_SIGNING_TOKEN
        );   
    }
  }

  async validateRefreshToken(
    ownerRefreshToken: string,
  ): Promise<CreateOwnerRefreshTokenDto | void> {
    try {
      const ownerData = this.jwtService.verify(ownerRefreshToken);
      if (!ownerData) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', TOKEN_INVALID);
      }
      return ownerData;
    } catch (err: unknown) {
       throw new ApiException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Internal Server Error',
          ERROR_WHILE_VALIDATING_TOKEN
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
  ): Promise<OwnerRefreshToken> {
    try {
      const owner = await this.ownerService.getOwnerById(ownerId);
      if (!owner) {
       throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', OWNER_NOT_FOUND);   
      }
      const tokenData = await this.ownerRefreshTokenRepository.findOne({
        where: { ownerId: ownerId },
      });
      if (tokenData) {
        tokenData.ownerRefreshToken = ownerRefreshToken;
        if (owner.getOwnerAgent() && owner.getOwnerAgent() !== ownerAgent) {
          owner.setIsActivated(false);
          // await this.mailService дописати відправку пошти!!
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
        ERROR_WHILE_SAVING_TOKEN
      );   
    }
  }

  async removeToken(ownerRefreshToken: string): Promise<number> {
    try {
      const token = await this.findToken(ownerRefreshToken);
      if (!token) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      const tokenData = await this.ownerRefreshTokenRepository.destroy({
        where: { ownerRefreshToken: ownerRefreshToken },
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
    ownerRefreshToken: string,
  ): Promise<OwnerRefreshToken> {
    const token = await this.ownerRefreshTokenRepository.findOne({
      where: { ownerRefreshToken: ownerRefreshToken },
    });
    if (!token) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
    }
    return token;
  }

  async findToken(
    ownerRefreshToken: string,
  ): Promise<OwnerRefreshToken | boolean> {
    const token = await this.ownerRefreshTokenRepository.findOne({
      where: { ownerRefreshToken: ownerRefreshToken },
    });
    if (!token) {
      return false;
    }
    return token;
  }

  async findTokenByParams(
    email: string,
    phoneNumber: string,
  ): Promise<OwnerRefreshToken> {
    const token = await this.ownerRefreshTokenRepository.findOne({
      where: { email: email, phoneNumber: phoneNumber },
    });
    if (!token) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', TOKEN_INVALID);
    }
    return token;
  }

  async removeTokenInTime(
    ownerRefreshTokenId: number,
  ): Promise<number | false> {
    const token = await OwnerRefreshToken.findByPk(ownerRefreshTokenId);
    if (!token) {
      return false;
    }
    return OwnerRefreshToken.destroy({
      where: {
        id: token.id,
        phoneNumber: token.phoneNumber,
      },
    });
  }
}
