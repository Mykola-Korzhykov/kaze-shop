import { Model } from 'sequelize-typescript';
import { OwnerRefreshTokenCreationAttrbs } from '../../core/interfaces/owner.interfaces';
import { Owner } from './owner.model';
export declare class OwnerRefreshToken extends Model<OwnerRefreshToken, OwnerRefreshTokenCreationAttrbs> {
    id: number;
    phoneNumber: string;
    email: string;
    ownerRefreshToken: string;
    ownerId: number;
    private ownerAgent;
    private expireDate;
    identifier: string;
    private owner;
    getExpireDate(): Date;
    setExpireDate(expireDate: Date): Date;
    getownerId(): number;
    setownerId(ownerId: number): number;
    getownerAgent(): string;
    setownerAgent(ownerAgent: string): string;
    getOwner(): Owner;
    getIdentifier(): string;
    setIdentifier(identifier: string): string;
}
