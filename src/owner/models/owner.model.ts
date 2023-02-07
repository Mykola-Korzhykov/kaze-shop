import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  DataType,
  Table,
  Model,
  IsInt,
  IsEmail,
  IsUUID,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Role } from '../../roles/models/roles.model';
import { UserRoles } from '../../roles/models/user.roles.model';
import { OwnerCreationAttrbs } from '../../core/interfaces/owner.interfaces';
import { Product } from '../../product/product.model';
import { OwnerRefreshToken } from './owner.refresh.token.model';

@Table({ tableName: 'OWNER' })
export class Owner extends Model<Owner, OwnerCreationAttrbs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  public id: number;

  @ApiProperty({ example: 'owner@gmail.com', description: 'owner`s email' })
  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'email',
  })
  public email: string;

  @ApiProperty({ example: 'Alex', description: 'owner`s Name' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'name',
  })
  private name: string;

  @ApiProperty({ example: 'Cusler', description: 'owner`s surname' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'surname',
  })
  private surname: string;

  @ApiProperty({ example: '+251912345678', description: 'owner`s phoneNumber' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'phoneNumber',
  })
  public phoneNumber: string;

  @ApiProperty({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'resetToken',
  })
  public resetToken: string;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'resetTokenExpiration',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'resetTokenExpiration',
  })
  private resetTokenExpiration: number;

  @ApiProperty({
    example: 'etrhg45ty5yeewt4t4665y',
    description: 'owner`s password',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'password',
  })
  @Exclude()
  private password: string;

  @ApiProperty({
    example: 'True',
    description: 'Is admin activated',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'isActivated',
  })
  private isActivated: boolean;

  @ApiProperty({
    example: 'http://sdgdgsgsfhd_rh;eh',
    description: 'activationLink',
  })
  @IsUUID(4)
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'activationLink',
  })
  public activationLink: string;

  @ApiProperty({
    example: '56733423',
    description: 'confirmCode',
  })
  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    field: 'confirmCode',
  })
  private confirmCode: number;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'owner`s agent',
  })
  @Column({
    type: DataType.CHAR(350),
    unique: true,
    allowNull: true,
    field: 'ownerAgent',
  })
  private ownerAgent: string;

  @ApiProperty({
    example: '56733423',
    description: 'activationCode',
  })
  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    field: 'activationCode',
  })
  private activationCode: number;

  @HasMany(() => Product)
  private products: Product[];

  @BelongsToMany(() => Role, () => UserRoles)
  public roles: Role[];

  @HasMany(() => OwnerRefreshToken)
  private ownerRefreshToken: OwnerRefreshToken;

  getName(): string {
    return this.name;
  }

  setName(name: string): string {
    this.name = name;
    return this.name;
  }

  getSurname(): string {
    return this.surname;
  }

  setSurname(surname: string): string {
    this.surname = surname;
    return this.surname;
  }

  getPassword(): string {
    return this.password;
  }

  setNewPasssword(password: string): string {
    this.password = password;
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getIsActivated(): boolean {
    return this.isActivated;
  }

  setIsActivated(isActivated: boolean): boolean {
    this.isActivated = isActivated;
    return this.isActivated;
  }

  getConfirmCode(): number {
    return this.confirmCode;
  }

  setConfirmCode(confirnCode: number): number {
    this.confirmCode = confirnCode;
    return this.confirmCode;
  }

  getResetToken(): string {
    return this.resetToken;
  }

  setResetToken(resetToken: string): string {
    this.resetToken = resetToken;
    return this.resetToken;
  }

  getResetTokenExpiration(): number {
    return this.resetTokenExpiration;
  }

  setResetTokenExpiration(resetTokenExpiration: number): number {
    this.resetTokenExpiration = resetTokenExpiration;
    return this.resetTokenExpiration;
  }

  getOwnerAgent(): string {
    return this.ownerAgent;
  }

  setOwnerAgent(ownerAgent: string): string {
    this.ownerAgent = ownerAgent;
    return this.ownerAgent;
  }

  getActivationCode(): number {
    return this.activationCode;
  }

  setActivationCode(activationCode: number): number {
    this.activationCode = activationCode;
    return this.activationCode;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getOwnerRefreshToken(): OwnerRefreshToken {
    return this.ownerRefreshToken;
  }
}
