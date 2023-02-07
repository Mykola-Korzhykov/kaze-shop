import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  IsEmail,
  BelongsTo,
} from 'sequelize-typescript';
import { AdminRefreshTokenCreationAttrbs } from '../../core/interfaces/admin.interfaces';
import { Admin } from './admin.model';
@Table({ tableName: 'Admin refresh tokens' })
export class AdminRefreshToken extends Model<
  AdminRefreshToken,
  AdminRefreshTokenCreationAttrbs
> {
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

  @ApiProperty({ example: '+251912345678', description: 'admin`s phoneNumber' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'phoneNumber',
  })
  public phoneNumber: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJrdyIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
    description: 'admin`s refresh token',
  })
  @Column({
    type: DataType.CHAR(2500),
    unique: true,
    allowNull: false,
    field: 'adminRefreshToken',
  })
  public adminRefreshToken: string;

  @ApiProperty({ example: '1', description: 'adminId' })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    field: 'adminId',
  })
  public adminId: number;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'admin`s agent',
  })
  @Column({
    type: DataType.CHAR(350),
    unique: false,
    allowNull: false,
    field: 'userAgent',
  })
  private adminAgent: string;

  @ApiProperty({ example: '86400000', description: 'expireDate' })
  @Column({
    type: DataType.DATE,
    field: 'expireDate',
  })
  private expireDate: Date;

  @BelongsTo(() => Admin)
  private admin: Admin;

  getExpireDate(): Date {
    return this.expireDate;
  }

  setExpireDate(expireDate: Date): Date {
    this.expireDate = expireDate;
    return this.expireDate;
  }

  getAdminAgent(): string {
    return this.adminAgent;
  }

  setAdminAgent(adminAgent: string): string {
    this.adminAgent = adminAgent;
    return this.adminAgent;
  }

  getAdmin(): Admin {
    return this.admin;
  }
}
