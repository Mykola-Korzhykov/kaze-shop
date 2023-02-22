import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../../roles/roles.service';
import { AddRoleDto } from '../dto/add-role.dto';
import { BanUserDto } from '../dto/ban-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  INVALID_CODE,
  INVALID_EMAIL,
  INVALID_EMAIL_OR_PASSWORD,
  RESET_TIME_EXPIRED,
  USER_NOT_FOUND,
  USER_OR_ROLE_NOT_FOUND,
  USER_WITH_EMAIL_DOESNT_EXIST,
  USER_WITH_EMAIL_EXIST,
  USER_WITH_PHONENUMBER_EXIST,
} from '../constants/user.constants';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import {
  InitializeUser,
  UserInterface,
  ValidateUser,
} from '../../core/interfaces/user.interfaces';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiException } from '../../common/exceptions/api.exception';
@Injectable({ scope: Scope.TRANSIENT })
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly roleService: RolesService,
  ) {}

  async findUser(
    v: string[],
    page: number,
    userPerPage: number,
  ): Promise<any[]> {
    const params = v.map((param: string) => {
      return param.toLowerCase();
    });
    const dbUsers = await this.userRepository.findAll({
      include: { all: true },
      offset: (page - 1) * userPerPage,
      limit: userPerPage,
      order: [['updatedAt', 'DESC']],
      attributes: [
        'id',
        'name',
        'surname',
        'email',
        'phoneNumber',
        'isAdmin',
        'addContent',
        'editContent',
        'editWebsite',
      ],
    });
    if (dbUsers.length === 0) {
      return [];
    }
    const users = [];
    dbUsers.forEach((user: User) => {
      const dbArray = [];
      for (const key in user) {
        dbArray.push(user[key]);
      }
      const isContained = params.some(
        (param: string) => dbArray.indexOf(param) >= 0,
      );
      if (isContained) {
        users.push(user);
      }
    });
    return users;
  }

  async initializeUser(userDto: InitializeUser): Promise<User> {
    const [email, phoneNumber] = await Promise.all([
      await this.getUserByEmail(userDto.email),
      await this.getUserByPhoneNumber(userDto.phoneNumber),
    ]);
    if (email) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_EMAIL_EXIST,
      );
    }
    if (phoneNumber) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_PHONENUMBER_EXIST,
      );
    }
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const user = await this.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async updateUser(userDto: UpdateUserDto, userId: number): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    user.setName(userDto.name);
    user.setSurname(userDto.surname);
    user.setCity(userDto.city);
    user.setCountry(userDto.country);
    user.setPostOffice(userDto.postOffice);
    return user.save();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto);
    user.setIsActivated(false);
    user.setIsAdmin(false);
    user.setAddContent(false);
    user.setEditWebsite(false);
    user.setEditContent(false);
    const role = await this.roleService.getRoleByValue('USER');
    if (!role) {
      const userRole = await this.roleService.createRole({
        value: 'USER',
        description: 'simple user',
      });
      await user.$set('roles', userRole.id);
      user.roles = [role];
      await user.save();
      return user;
    }
    await user.$set('roles', role.id);
    user.roles = [role];
    await user.save();
    return user;
  }

  async getAllUsers(
    page: number,
    userPerPage: number,
  ): Promise<UserInterface[] | []> {
    const users: User[] = await this.userRepository.findAll({
      include: { all: true },
      offset: (page - 1) * userPerPage,
      limit: userPerPage,
      order: [['updatedAt', 'DESC']],
    });
    if (users.length === 0) {
      return [];
    }
    return users.map((user: User) => {
      return {
        id: user.id,
        name: user.getName(),
        surname: user.getSurname(),
        email: user.email,
        phoneNumber: user.phoneNumber,
        isAdmin: user.getIsAdmin(),
        addContent: user.getAddContent(),
        editContent: user.getEditContent(),
        editWebsite: user.getEditWebSite(),
      };
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return user;
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const [user, role] = await Promise.all([
      await this.userRepository.findByPk(dto.userId),
      await this.roleService.getRoleByValue(dto.value),
    ]);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new ApiException(
      HttpStatus.NOT_FOUND,
      'Not found!',
      USER_OR_ROLE_NOT_FOUND,
    );
  }

  async banUser(dto: BanUserDto): Promise<User> {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async validateUser(userDto: ValidateUser): Promise<User> {
    const user = await this.getUserByEmail(userDto.email);
    if (!user) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        USER_WITH_EMAIL_DOESNT_EXIST,
      );
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.getPassword(),
    );
    if (passwordEquals) {
      return user;
    }
    throw new ApiException(
      HttpStatus.UNAUTHORIZED,
      'Unathorized!',
      INVALID_EMAIL_OR_PASSWORD,
    );
  }

  async setConfirmCode(codeDto: CodeDto, code: number): Promise<string> {
    const user = await this.getUserByEmail(codeDto.email);
    user.setConfirmCode(code);
    user.setResetTokenExpiration(Number(Date.now() + 3600000));
    await user.save();
    return user.email;
  }

  async resetPassword(resetDto: ResetDto): Promise<string> {
    const user = await this.getUserByEmail(resetDto.email);
    if (resetDto.email !== user.email) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        INVALID_EMAIL,
      );
    }
    if (Number(Date.now()) >= user.getResetTokenExpiration()) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        RESET_TIME_EXPIRED,
      );
    }
    if (Number(resetDto.code) !== user.getConfirmCode()) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        INVALID_CODE,
      );
    }
    await this.rewritePassword(user.id, resetDto.password);
    return user.email;
  }

  async changePassword(userId: number, password: string): Promise<void | User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    return this.rewritePassword(user.id, password);
  }

  async rewritePassword(
    userId: number,
    password: string,
  ): Promise<User | void> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        USER_NOT_FOUND,
      );
    }
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.setNewPasssword(hashedPassword);
    return user.save();
  }
}
