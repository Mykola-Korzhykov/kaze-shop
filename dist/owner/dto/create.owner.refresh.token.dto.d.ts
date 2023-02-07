import { Role } from '../../roles/models/roles.model';
export declare class CreateOwnerRefreshTokenDto {
    readonly ownerId: number;
    readonly isActivated: boolean;
    readonly email: string;
    readonly ownerAgent: string;
    readonly roles: Role[];
}
