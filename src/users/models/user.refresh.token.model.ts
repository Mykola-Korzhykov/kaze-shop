import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  IsEmail,
  IsInt,
  BelongsTo,
  IsUUID,
} from 'sequelize-typescript';
import { UserRefreshCreationAttrbs } from '../../core/interfaces/user.interfaces';
import { User } from './user.model';

@Table({ tableName: 'USER`S_Refresh-tokens' })
export class UserRefreshToken extends Model<
  UserRefreshToken,
  UserRefreshCreationAttrbs
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

  @ApiProperty({ example: 'user@gmail.com', description: 'user`s email' })
  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'email',
  })
  public email: string;

  @ApiProperty({
    example:
      'eyJuilbgghbGciOiJIUzihnuohlI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
    description: 'user`s refresh token',
  })
  @Column({
    type: DataType.CHAR(2500),
    unique: true,
    allowNull: false,
    field: 'userRefreshToken',
  })
  public userRefreshToken: string;

  @ApiProperty({ example: '1', description: 'userId' })
  @ForeignKey(() => User)
  @IsInt
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
    unique: false,
    allowNull: false,
  })
  public userId: number;

  @ApiProperty({ example: '86400000', description: 'expireDate' })
  @Column({
    type: DataType.DATE,
    field: 'expireDate',
  })
  private expireDate: Date;

  @ApiProperty({
    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    description: 'identifier',
  })
  @IsUUID(4)
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'identifier',
  })
  public identifier: string;

  @BelongsTo(() => User)
  private user: User;

  getExpireDate(): Date {
    return this.expireDate;
  }

  setExpireDate(expireDate: Date): Date {
    this.expireDate = expireDate;
    return this.expireDate;
  }

  getuserId(): number {
    return this.userId;
  }

  setuserId(userId: number): number {
    this.userId = userId;
    return this.userId;
  }

  getUser(): User {
    return this.user;
  }

  getIdentifier(): string {
    return this.identifier;
  }

  setIdentifier(identifier: string): string {
    this.identifier = identifier;
    return this.identifier;
  }
}
