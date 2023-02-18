import { Role } from '../../roles/models/roles.model';
export declare class CreateUserRefreshTokenDto {
    readonly userId: number;
    readonly isActivated: boolean;
    readonly roles: Role[];
    readonly email: string;
}
