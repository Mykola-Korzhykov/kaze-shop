import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAdminDto } from '../dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import {
  INVALID_LINK,
  ADMIN_NOT_FOUND,
  ADMIN_WITH_EMAIL_EXIST,
  ADMIN_WITH_PHONENUMBER_EXIST,
  INVALID_EMAIL,
  RESET_TIME_EXPIRED,
  INVALID_CODE,
  ADMIN_ID_NOT_PROVIDED,
  NOT_ACTIVATED,
} from '../constants/admin.constants';
import { Admin } from '../models/admin.model';
import { LoginDto } from '../../auth/dto/login.dto';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { AdminInterface } from '../../core/interfaces/admin.interfaces';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/models/user.model';
import { RolesService } from '../../roles/roles.service';
import { ApiException } from '../../common/exceptions/api.exception';

@Injectable({ scope: Scope.TRANSIENT })
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly userService: UsersService,
    private readonly roleService: RolesService,
  ) {}

  async findAdmin(
    v: string[],
    page: number,
    adminPerPage: number,
  ): Promise<any[]> {
    const params = v.map((param: string) => {
      return param.toLowerCase();
    });
    const dbAdmins = await this.adminRepository.findAll({
      include: { all: true },
      offset: (page - 1) * adminPerPage,
      limit: adminPerPage,
      order: [['updatedAt', 'DESC']],
      attributes: [
        'id',
        'name',
        'surname',
        'email',
        'phoneNumber',
        'userId',
        'addContent',
        'editContent',
        'editWebsite',
      ],
    });
    if (dbAdmins.length === 0) {
      return [];
    }
    const admins = [];
    dbAdmins.forEach((admin: Admin) => {
      const dbArray = [];
      for (const key in admin) {
        dbArray.push(admin[key]);
      }
      const isContained = params.some(
        (param: string) => dbArray.indexOf(param) >= 0,
      );
      if (isContained) {
        admins.push(admin);
      }
    });
    return admins;
  }

  async createAdmin(dto: CreateAdminDto): Promise<Admin | User> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!dto.isAdmin) {
      user.setIsAdmin(dto.isAdmin);
      user.setAddContent(dto.addContent);
      user.setEditContent(dto.editContent);
      user.setEditWebsite(dto.editWebSite);
      await user.save();
      return JSON.parse(JSON.stringify(user));
    }
    if (user.getIsAdmin()) {
      user.setAddContent(dto.addContent);
      user.setEditContent(dto.editContent);
      user.setEditWebsite(dto.editWebSite);
      await user.save();
      const admin = await this.getAdminByEmail(dto.email);
      admin.setAddContent(dto.addContent);
      admin.setEditContent(dto.editWebSite);
      admin.setEditWebsite(dto.editWebSite);
      await admin.save();
      return JSON.parse(JSON.stringify(admin));
    }
    const [phoneNumber, email] = await Promise.all([
      await this.getAdminByPhoneNumber(dto.phoneNumber),
      await this.getAdminByEmail(dto.email),
    ]);
    if (phoneNumber) {
       throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', ADMIN_WITH_PHONENUMBER_EXIST);
    }
    if (email) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', ADMIN_WITH_EMAIL_EXIST);
    }
    const [admin] = await Promise.all([await this.adminRepository.create(dto)]);
    const role = await this.roleService.getRoleByValue('ADMIN');
    if (!role) {
      const userRole = await this.roleService.createRole({
        value: 'ADMIN',
        description: 'User with rights',
      });
      user.setIsAdmin(dto.isAdmin);
      user.setAddContent(dto.addContent);
      user.setEditContent(dto.editContent);
      user.setEditWebsite(dto.editWebSite);
      await user.save();
      admin.setIsActivated(user.getIsActivated());
      admin.userId = user.id;
      await admin.$set('roles', userRole.id);
      admin.roles = [role];
      await admin.save();
      return JSON.parse(JSON.stringify(admin));
    }
    user.setIsAdmin(dto.isAdmin);
    user.setAddContent(dto.addContent);
    user.setEditContent(dto.editContent);
    user.setEditWebsite(dto.editWebSite);
    await user.save();
    admin.setIsActivated(user.getIsActivated());
    await admin.$set('roles', role.id);
    admin.roles = [role];
    admin.userId = user.id;
    await admin.save();
    return JSON.parse(JSON.stringify(admin));
  }

  async updateAdmin(dto: CreateAdminDto): Promise<number | Admin> {
    const [admin, user] = await Promise.all([
      await this.getAdminByEmail(dto.email),
      await this.userService.getUserByEmail(dto.email),
    ]);
    if (dto.isAdmin) {
      user.setIsAdmin(dto.isAdmin);
      user.setAddContent(dto.addContent);
      user.setEditContent(dto.editContent);
      user.setEditWebsite(dto.editWebSite);
      admin.userId = user.id;
      admin.setAddContent(dto.addContent);
      admin.setEditContent(dto.editContent);
      admin.setEditWebsite(dto.editWebSite);
      await Promise.all([await user.save(), await admin.save()]);
      return JSON.parse(JSON.stringify(admin));
    }
    user.setIsAdmin(dto.isAdmin);
    user.setAddContent(dto.addContent);
    user.setEditContent(dto.editContent);
    user.setEditWebsite(dto.editWebSite);
    const [deletedAdmin] = await Promise.all([
      await this.adminRepository.destroy({
        where: {
          userId: user.id,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
        },
      }),
      await user.save(),
    ]);
    return deletedAdmin;
  }

  async findByActivationLink(activationLink: string): Promise<Admin> {
    const admin = this.adminRepository.findOne({
      where: { activationLink: activationLink },
    });
    if (!admin) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_LINK);
    }
    return admin;
  }

  async getAllAdmins(
    page: number,
    adminPerPage: number,
  ): Promise<AdminInterface[] | []> {
    const admins = await this.adminRepository.findAll({
      include: { all: true },
      offset: (page - 1) * adminPerPage,
      limit: adminPerPage,
      order: [['updatedAt', 'DESC']],
    });
    if (admins.length === 0) {
      return [];
    }
    return admins.map((admin: Admin) => {
      return {
        id: admin.id,
        name: admin.getName(),
        surname: admin.getSurname(),
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        userId: admin.userId,
        addContent: admin.getAddContent(),
        editContent: admin.getEditContent(),
        editWebsite: admin.getEditWebSite(),
      };
    });
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findByPk(id, {
      include: { all: true },
    });
    if (!admin) {
       throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', ADMIN_NOT_FOUND);  
    }
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return admin;
  }

  async checkAdmin(payload: Payload, activationLink: string | undefined) {
    if (!activationLink) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', ADMIN_ID_NOT_PROVIDED); 
    }
    const admin = await this.getAdminById(payload.userId);
    if (!admin.getIsActivated()) {
      throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NOT_ACTIVATED); 
    }
    if (
      admin.activationLink === activationLink &&
      payload.userActivationLink === activationLink
    ) {
      return true;
    }
    return false;
  }

  async getAdminByPhoneNumber(phoneNumber: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { phoneNumber: phoneNumber },
      include: { all: true },
    });
    return admin;
  }

  async validateAdmin(adminDto: LoginDto): Promise<Admin | boolean> {
    const admin = await this.getAdminByEmail(adminDto.email);
    if (!admin) {
      return false;
    }
    const passwordEquals = await bcrypt.compare(
      adminDto.password,
      admin.getPassword(),
    );
    if (passwordEquals) {
      return admin;
    }
    return false;
  }

  async setConfirmCode(codeDto: CodeDto, code: number): Promise<string> {
    const admin = await this.getAdminByEmail(codeDto.email);
    admin.setConfirmCode(code);
    admin.setResetTokenExpiration(Number(Date.now() + 3600000));
    await admin.save();
    return admin.email;
  }

  async resetPassword(resetDto: ResetDto): Promise<string> {
    const admin = await this.getAdminByEmail(resetDto.email);
    if (resetDto.email !== admin.email) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_EMAIL);
    }
    if (Number(Date.now()) >= admin.getResetTokenExpiration()) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', RESET_TIME_EXPIRED);
    }
    if (Number(resetDto.code) !== admin.getConfirmCode()) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_CODE);
    }
    await this.userService.rewritePassword(admin.userId, resetDto.password);
    await this.rewritePassword(admin, resetDto.password);
    return admin.email;
  }

  async changePassword(adminId: number, password: string): Promise<Admin> {
    const admin = await this.getAdminById(adminId);
    await this.userService.rewritePassword(admin.userId, password);
    return this.rewritePassword(admin, password);
  }

  private async rewritePassword(
    admin: Admin,
    password: string,
  ): Promise<Admin> {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    admin.setNewPasssword(hashedPassword);
    return admin.save();
  }
}
