import { Model } from 'sequelize-typescript';
import { AdminRefreshTokenCreationAttrbs } from '../../core/interfaces/admin.interfaces';
import { Admin } from './admin.model';
export declare class AdminRefreshToken extends Model<AdminRefreshToken, AdminRefreshTokenCreationAttrbs> {
    id: number;
    email: string;
    phoneNumber: string;
    adminRefreshToken: string;
    adminId: number;
    private adminAgent;
    private expireDate;
    private admin;
    getExpireDate(): Date;
    setExpireDate(expireDate: Date): Date;
    getAdminAgent(): string;
    setAdminAgent(adminAgent: string): string;
    getAdmin(): Admin;
}
