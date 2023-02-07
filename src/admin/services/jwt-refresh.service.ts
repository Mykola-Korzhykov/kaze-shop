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
import { ApiException } from 'src/common/exceptions/api.exception';

@Injectable({ scope: Scope.TRANSIENT })
export class AdminJwtRefreshService {
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
        ERROR_WHILE_SIGNING_TOKEN
      );   
    }
  }

  async validateRefreshToken(
    adminRefreshToken: string,
  ): Promise<CreateAdminRefreshTokenDto> {
    try {
      const adminData = this.jwtService.verify(adminRefreshToken);
      if (!adminData) {
        throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', TOKEN_INVALID);
      }
      return adminData;
    } catch (err: unknown) {
      throw new ApiException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Internal Server Error',
        ERROR_WHILE_VALIDATING_TOKEN
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
  ): Promise<AdminRefreshToken> {
    try {
      const admin = await this.adminService.getAdminById(adminId);
      if (!admin) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', ADMIN_NOT_FOUND);
      }
      const tokenData = await this.adminRefreshTokenRepository.findOne({
        where: { adminId: adminId },
      });
      if (tokenData) {
        tokenData.adminRefreshToken = adminRefreshToken;
        if (admin.getAdminAgent() && admin.getAdminAgent() !== adminAgent) {
          admin.setIsActivated(false);
          // await this.mailService дописати відправку пошти!!
        }
        return tokenData.save();
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
        ERROR_WHILE_SAVING_TOKEN
      );   
    }
  }

  async removeToken(adminRefreshToken: string): Promise<number> {
    try {
      const token = await this.findToken(adminRefreshToken);
      if (!token) {
        throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
      }
      const tokenData = await this.adminRefreshTokenRepository.destroy({
        where: { adminRefreshToken: adminRefreshToken },
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

  async findToken(
    adminRefreshToken: string,
  ): Promise<AdminRefreshToken | false> {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { adminRefreshToken: adminRefreshToken },
    });
    if (!token) {
      return false;
    }
    return token;
  }

  async findTokenByToken(
    adminRefreshToken: string,
  ): Promise<AdminRefreshToken | false> {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { adminRefreshToken: adminRefreshToken },
    });
    if (!token) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', TOKEN_NOT_FOUND);   
    }
    return token;
  }

  async findTokenByParams(
    email: string,
    phoneNumber: string,
  ): Promise<AdminRefreshToken> {
    const token = await this.adminRefreshTokenRepository.findOne({
      where: { email: email, phoneNumber: phoneNumber },
    });
    if (!token) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', TOKEN_INVALID);
    }
    return token;
  }

  async removeTokenInTime(
    adminRefreshTokenId: number,
  ): Promise<number | false> {
    const token = await AdminRefreshToken.findByPk(adminRefreshTokenId);
    if (!token) {
      return false;
    }
    return this.adminRefreshTokenRepository.destroy({
      where: {
        id: token.id,
        phoneNumber: token.phoneNumber,
      },
    });
  }
}
