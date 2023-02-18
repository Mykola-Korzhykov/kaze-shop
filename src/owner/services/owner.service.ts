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
import { LoginDto } from '../../auth/dto/login.dto';
import {
  OWNER_WITH_PHONENUMBER_EXIST,
  OWNER_WITH_EMAIL_EXIST,
  INVALID_LINK,
  OWNER_NOT_FOUND,
  INVALID_CODE,
  INVALID_EMAIL,
  RESET_TIME_EXPIRED,
  OWNER_ID_NOT_PROVIDED,
  NOT_ACTIVATED,
  ACCESS_DENIED,
} from '../constants/owner.constants';
import { CreateOwnerDto } from '../dto/create.owner.dto';
import { Owner } from '../models/owner.model';
import { RolesService } from '../../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { ResetDto } from '../../auth/dto/reset.password.dto';
import { CodeDto } from '../../core/interfaces/auth.interfaces';
import { Payload } from '../../core/interfaces/auth.interfaces';
import { v4 } from 'uuid';
import { Role } from '../../roles/models/roles.model';
import { ApiException } from '../../common/exceptions/api.exception';
@Injectable({ scope: Scope.TRANSIENT })
export class OwnerService {
  constructor(
    @InjectModel(Owner) private readonly ownerRepository: typeof Owner,
    private readonly roleService: RolesService,
  ) {}

  static async creatingOwner(OWNER: string[]) {
    const existingOwners = await Owner.findAll();
    console.log(existingOwners);
    if (existingOwners.length > 0) {
      return;
    }
    console.log('Creating');
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS || 10);
    const hashedPassword = await bcrypt.hash(OWNER[4], salt);
    const ownerDto = {
      name: OWNER[0],
      surname: OWNER[1],
      phoneNumber: OWNER[2],
      email: OWNER[3],
      password: hashedPassword,
      activationLink: v4(),
    };
    const owner = await Owner.create(<CreateOwnerDto>ownerDto);
    owner.setIsActivated(false);
    const role = await Role.findOne({ where: { value: 'OWNER' } });
    if (!role) {
      const ownerRole = await Role.create({
        value: 'OWNER',
        description: 'Owner owns website',
      });
      await owner.$set('roles', ownerRole.id);
      owner.roles = [ownerRole];
      await owner.save();
      return owner;
    }
    await owner.$set('roles', role.id);
    owner.roles = [role];
    await owner.save();
    return owner;
  }

  async createOwner(dto: CreateOwnerDto): Promise<Owner> {
    const [phoneNumber, email] = await Promise.all([
      await this.getOwnerByPhoneNumber(dto.phoneNumber),
      await this.getOwnerByEmail(dto.email),
    ]);
    if (phoneNumber) {
       throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', OWNER_WITH_PHONENUMBER_EXIST);
    }
    if (email) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', OWNER_WITH_EMAIL_EXIST);
    }
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const owner = await this.create({
      ...dto,
      password: hashedPassword,
      activationLink: v4(),
    });
    return owner.save();
  }

  private async create(dto: CreateOwnerDto) {
    const owner = await this.ownerRepository.create(dto);
    owner.setIsActivated(false);
    const role = await this.roleService.getRoleByValue('OWNER');
    if (!role) {
      const userRole = await this.roleService.createRole({
        value: 'OWNER',
        description: 'Owner owns website',
      });
      await owner.$set('roles', userRole.id);
      owner.roles = [userRole];
      await owner.save();
      return owner;
    }
    await owner.$set('roles', role.id);
    owner.roles = [role];
    await owner.save();
    return owner;
  }

  async findByActivationLink(activationLink: string): Promise<Owner> {
    const owner = this.ownerRepository.findOne({
      where: { activationLink: activationLink },
    });
    if (!owner) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_LINK);
    }
    return owner;
  }

  async getOwnerById(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findByPk(id, {
      include: { all: true },
    });
    if (!owner) {
      throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', OWNER_NOT_FOUND);   
    }
    return owner;
  }

  async getOwnerByEmail(email: string): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { email: email },
      include: { all: true },
    });
    return owner;
  }

  async getOwnerByPhoneNumber(phoneNumber: string): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { phoneNumber: phoneNumber },
      include: { all: true },
    });
    return owner;
  }

  async validateOwner(ownerDto: LoginDto): Promise<Owner | boolean> {
    const owner = await this.getOwnerByEmail(ownerDto.email);
    if (!owner) {
      return false;
    }
    const passwordEquals = await bcrypt.compare(
      ownerDto.password,
      owner.getPassword(),
    );
    if (passwordEquals) {
      return owner;
    }
    return false;
  }

  async checkOwner(payload: Payload, activationLink: string | undefined) {
    if (!activationLink) {
      throw new ApiException(HttpStatus.UNAUTHORIZED, 'Unathorized!', OWNER_ID_NOT_PROVIDED); 
    }
    const owner = await this.getOwnerById(payload.userId);
    if (owner instanceof Owner && !owner.getIsActivated()) {
      throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', NOT_ACTIVATED); 
    }
    if (owner instanceof Owner && owner.activationLink === activationLink) {
      return true;
    }
    throw new ApiException(HttpStatus.FORBIDDEN, 'Forbidden!', ACCESS_DENIED); 
  }

  async setConfirmCode(codeDto: CodeDto, code: number): Promise<string> {
    const owner = await this.getOwnerByEmail(codeDto.email);
    owner.setConfirmCode(code);
    owner.setResetTokenExpiration(Number(Date.now() + 3600000));
    await owner.save();
    return owner.email;
  }

  async resetPassword(resetDto: ResetDto): Promise<string> {
    const owner = await this.getOwnerByEmail(resetDto.email);
    if (resetDto.email !== owner.email) {
       throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_EMAIL);
    }
    if (Number(Date.now()) >= owner.getResetTokenExpiration()) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', RESET_TIME_EXPIRED);
    }
    if (Number(resetDto.code) !== owner.getConfirmCode()) {
      throw new ApiException(HttpStatus.BAD_REQUEST, 'Bad request', INVALID_CODE);
    }
    await this.rewritePassword(owner, resetDto.password);
    return owner.email;
  }

  async changePassword(ownerId: number, password: string): Promise<Owner | void> {
    const owner = await this.getOwnerById(ownerId);
    if (!owner) {
       throw new ApiException(HttpStatus.NOT_FOUND, 'Not found!', OWNER_NOT_FOUND);   
    }
    return this.rewritePassword(owner, password);
  }

  private async rewritePassword(
    owner: Owner,
    password: string,
  ): Promise<Owner> {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    owner.setNewPasssword(hashedPassword);
    return owner.save();
  }
}
