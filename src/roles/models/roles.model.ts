import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { RolecreationAttrbs } from '../../core/interfaces/user.interfaces';
import { Admin } from '../../admin/models/admin.model';
import { Owner } from '../../owner/models/owner.model';
import { User } from '../../users/models/user.model';
import { UserRoles } from './user.roles.model';

@Table({ tableName: 'ROLES' })
export class Role extends Model<Role, RolecreationAttrbs> {
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
  @ApiProperty({ example: 'ADMIN', description: 'User`s role' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    field: 'value',
  })
  public value: string;
  @ApiProperty({ example: 'Admin', description: 'Role`s description' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'description',
  })
  public description: string;
  @BelongsToMany(() => User, () => UserRoles)
  private users: User[];

  @BelongsToMany(() => Admin, () => UserRoles)
  private admins: Admin[];

  @BelongsToMany(() => Owner, () => UserRoles)
  private owners: Owner[];

  getUsers(): User[] {
    return this.users;
  }

  getAdmins(): Admin[] {
    return this.admins;
  }

  getOwners(): Owner[] {
    return this.owners;
  }
}
