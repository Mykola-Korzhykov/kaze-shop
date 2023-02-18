import { Role } from '../../roles/models/roles.model';
export declare class CreateAccessTokenDto {
    readonly userId: number;
    readonly isUserActivated?: boolean;
    readonly userActivationLink?: string;
    readonly email: string;
    readonly roles?: Role[];
}
