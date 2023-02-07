import { Role } from '../../roles/models/roles.model';
export declare class CreateAdminRefreshTokenDto {
    readonly adminId: number;
    readonly isActivated: boolean;
    readonly email: string;
    readonly adminAgent: string;
    readonly roles: Role[];
}
