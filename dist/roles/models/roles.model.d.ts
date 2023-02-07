import { Model } from 'sequelize-typescript';
import { RolecreationAttrbs } from '../../core/interfaces/user.interfaces';
import { Admin } from '../../admin/models/admin.model';
import { Owner } from '../../owner/models/owner.model';
import { User } from '../../users/models/user.model';
export declare class Role extends Model<Role, RolecreationAttrbs> {
    id: number;
    value: string;
    description: string;
    private users;
    private admins;
    private owners;
    getUsers(): User[];
    getAdmins(): Admin[];
    getOwners(): Owner[];
}
