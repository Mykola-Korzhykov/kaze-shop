import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  IsEmail,
  IsUUID,
  IsInt,
  BelongsToMany,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { AdmincreationAttrbs } from '../../core/interfaces/admin.interfaces';
import { Exclude } from 'class-transformer';
import { Role } from '../../roles/models/roles.model';
import { UserRoles } from '../../roles/models/user.roles.model';
import { User } from '../../users/models/user.model';
import { AdminRefreshToken } from './admin.refresh.token.model';
import { Product } from '../../product/models/product.model';

@Table({ tableName: 'ADMINS' })
export class Admin extends Model<Admin, AdmincreationAttrbs> {
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

  @ApiProperty({ example: 'admin@gmail.com', description: 'admin`s email' })
  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'email',
  })
  public email: string;

  @ApiProperty({ example: 'Alex', description: 'admin`s Name' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'name',
  })
  private name: string;

  @ApiProperty({ example: 'Cusler', description: 'admin`s surname' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'surname',
  })
  private surname: string;

  @ApiProperty({ example: '+251912345678', description: 'admin`s phoneNumber' })
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
    description: 'admin`s password',
  })
  @Exclude()
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'password',
  })
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
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
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

  @ApiProperty({
    example: 'True',
    description: 'Right to edit website',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'editWebSite',
  })
  private editWebSite: boolean;

  @ApiProperty({
    example: 'True',
    description: 'Right to add content',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'addContent',
  })
  private addContent: boolean;

  @ApiProperty({
    example: 'True',
    description: 'Right to edit content',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'editContent',
  })
  private editContent: boolean;

  @ApiProperty({ example: '1', description: 'userId' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'admin`s agent',
  })
  @Column({
    type: DataType.CHAR(350),
    unique: false,
    allowNull: true,
    field: 'userAgent',
  })
  private adminAgent: string;

  @HasMany(() => Product)
  private products: Product[];

  @HasMany(() => AdminRefreshToken)
  public adminRefreshTokens: AdminRefreshToken[];

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => User)
  private user: User;

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

  getProducts(): Product[] {
    return this.products;
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

  getEditWebSite(): boolean {
    return this.editWebSite;
  }

  setEditWebsite(editWebSite: boolean): boolean {
    this.editWebSite = editWebSite;
    return editWebSite;
  }

  getAddContent(): boolean {
    return this.addContent;
  }

  setAddContent(addContent: boolean): boolean {
    this.addContent = addContent;
    return this.addContent;
  }

  getEditContent(): boolean {
    return this.editContent;
  }

  setEditContent(editContent: boolean): boolean {
    this.editContent = editContent;
    return this.editContent;
  }

  getAdminAgent(): string {
    return this.adminAgent;
  }

  setAdminAgent(adminAgent: string): string {
    this.adminAgent = adminAgent;
    return this.adminAgent;
  }

  getActivationCode(): number {
    return this.activationCode;
  }

  setActivationCode(activationCode: number): number {
    this.activationCode = activationCode;
    return this.activationCode;
  }

  getAdminRefreshTokens(): AdminRefreshToken[] {
    return this.adminRefreshTokens;
  }

  getUser(): User {
    return this.user;
  }

  addProduct(product: Product): Product[] {
    this.products.push(product);
    return this.products;
  }
}
