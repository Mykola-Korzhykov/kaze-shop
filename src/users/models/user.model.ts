import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  IsEmail,
  IsInt,
  HasMany,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { Cart } from '../../cart/models/cart.model';
import { Admin } from '../../admin/models/admin.model';
import { UsercreationAttrbs } from '../../core/interfaces/user.interfaces';
import { Role } from '../../roles/models/roles.model';
import { UserRoles } from '../../roles/models/user.roles.model';
import { UserRefreshToken } from './user.refresh.token.model';
import { Product } from '../../product/models/product.model';
import { BookmarksProducts } from '../../product/models/bookmark.products';
import { WatchedProducts } from '../../product/models/watched.products.model';
@Table({ tableName: 'USERS' })
export class User extends Model<User, UsercreationAttrbs> {
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

  @ApiProperty({ example: 'Alex', description: 'user`s Name' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'name',
  })
  private name: string;

  @ApiProperty({ example: 'Cusler', description: 'user`s surname' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'surname',
  })
  private surname: string;

  @ApiProperty({ example: '+251912345678', description: 'user`s phoneNumber' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'phoneNumber',
  })
  public phoneNumber: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'user`s email' })
  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'email',
  })
  public email: string;

  @ApiProperty({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'resetToken',
  })
  private resetToken: string;

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
    description: 'user`s password',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'password',
  })
  private password: string;

  @ApiProperty({
    example: 'true',
    description: 'Is user banned or not?',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'false',
    field: 'banned',
  })
  public banned: boolean;

  @ApiProperty({
    example: 'Bad behaviour',
    description: 'Reason of banning a user',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'banReason',
  })
  public banReason: string;

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
    example: 'True',
    description: 'Is user activated',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'isActivated',
  })
  private isActivated: boolean;

  @ApiProperty({
    example: 'Ukraine',
    description: 'country',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'country',
  })
  private country: string;

  @ApiProperty({
    example: 'Lviv',
    description: 'city',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'city',
  })
  private city: string;

  @ApiProperty({
    example: 'Lviv',
    description: 'postOffice',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'postOffice',
  })
  private postOffice: string;

  @ApiProperty({
    example: 'True',
    description: 'Is user Admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: true,
    field: 'isAdmin',
  })
  private isAdmin: boolean;

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

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    field: 'adminId',
  })
  public adminId: number;

  @BelongsToMany(() => Role, () => UserRoles)
  public roles: Role[];

  @HasMany(() => UserRefreshToken)
  public userRefreshTokens: UserRefreshToken[];

  @HasOne(() => Cart)
  public cart: Cart;

  @HasMany(() => Cart)
  public leftCarts: Cart[];

  @BelongsToMany(() => Product, () => BookmarksProducts)
  public bookmarks: Product[];

  @BelongsToMany(() => Product, () => WatchedProducts)
  public watched: Product[];

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

  getCity(): string {
    return this.city;
  }

  setCity(city: string): string {
    this.city = city;
    return this.city;
  }

  getCountry(): string {
    return this.country;
  }

  setCountry(country: string): string {
    this.country = country;
    return this.country;
  }

  getPostOffice(): string {
    return this.postOffice;
  }

  setPostOffice(postOffice: string): string {
    this.postOffice = postOffice;
    return this.postOffice;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  setIsAdmin(isAdmin: boolean): boolean {
    this.isAdmin = isAdmin;
    return this.isAdmin;
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

  getCarts(): Cart[] {
    return this.leftCarts;
  }

  getUserRefreshTokens(): UserRefreshToken[] {
    return this.userRefreshTokens;
  }
}
