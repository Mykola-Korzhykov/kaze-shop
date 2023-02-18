import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Owner } from '../../owner/models/owner.model';
import { Admin } from '../../admin/models/admin.model';
import { User } from '../../users/models/user.model';
import { Role } from './roles.model';

@Table({ tableName: 'USER`s_Roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
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
  @ApiProperty({ example: '1', description: 'roleId' })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    field: 'roleId',
  })
  public roleId: number;
  @ApiProperty({ example: '1', description: 'userId' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @ApiProperty({ example: '1', description: 'adminId' })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    field: 'adminId',
  })
  public adminId: number;

  @ApiProperty({ example: '1', description: 'ownerId' })
  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
    field: 'ownerId',
  })
  public ownerId: number;
}
