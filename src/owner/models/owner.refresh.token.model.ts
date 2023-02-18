import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  IsEmail,
  BelongsTo,
  IsUUID,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { OwnerRefreshTokenCreationAttrbs } from '../../core/interfaces/owner.interfaces';
import { Owner } from './owner.model';

@Table({ tableName: 'OWNER`s_Refresh-tokens' })
export class OwnerRefreshToken extends Model<
  OwnerRefreshToken,
  OwnerRefreshTokenCreationAttrbs
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

  @ApiProperty({ example: '+06614568945', description: 'owner`s phoneNumber' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'phoneNumber',
  })
  public phoneNumber: string;

  @ApiProperty({ example: 'owner@gmail.com', description: 'owner`s email' })
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
      'eyJhbGciOiJIUjpzI1NiIsInR5cCI6IdfuthojpkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
    description: 'owner`s refresh token',
  })
  @Column({
    type: DataType.CHAR(2500),
    unique: true,
    allowNull: false,
    field: 'ownerRefreshToken',
  })
  public ownerRefreshToken: string;

  @ApiProperty({ example: '1', description: 'ownerId' })
  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
    field: 'ownerId',
  })
  public ownerId: number;

  @ApiProperty({
    example:
      // tslint:disable-next-line: max-line-length
      'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
    description: 'owner`s agent',
  })
  @Column({
    type: DataType.CHAR(350),
    unique: false,
    allowNull: false,
    field: 'ownerAgent',
  })
  private ownerAgent: string;

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

  @BelongsTo(() => Owner)
  private owner: Owner;

  getExpireDate(): Date {
    return this.expireDate;
  }

  setExpireDate(expireDate: Date): Date {
    this.expireDate = expireDate;
    return this.expireDate;
  }

  getownerId(): number {
    return this.ownerId;
  }

  setownerId(ownerId: number): number {
    this.ownerId = ownerId;
    return this.ownerId;
  }

  getownerAgent(): string {
    return this.ownerAgent;
  }

  setownerAgent(ownerAgent: string): string {
    this.ownerAgent = ownerAgent;
    return this.ownerAgent;
  }

  getOwner(): Owner {
    return this.owner;
  }

  getIdentifier(): string {
    return this.identifier;
  }

  setIdentifier(identifier: string): string {
    this.identifier = identifier;
    return this.identifier;
  }
}
