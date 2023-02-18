import { Model } from 'sequelize-typescript';
import { UserRefreshCreationAttrbs } from '../../core/interfaces/user.interfaces';
import { User } from './user.model';
export declare class UserRefreshToken extends Model<UserRefreshToken, UserRefreshCreationAttrbs> {
    id: number;
    email: string;
    userRefreshToken: string;
    userId: number;
    private expireDate;
    identifier: string;
    private user;
    getExpireDate(): Date;
    setExpireDate(expireDate: Date): Date;
    getuserId(): number;
    setuserId(userId: number): number;
    getUser(): User;
    getIdentifier(): string;
    setIdentifier(identifier: string): string;
}
