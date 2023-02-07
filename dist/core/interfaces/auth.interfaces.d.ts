import { Role } from '../../roles/models/roles.model';
export interface payload {
    email: string;
    userId: number;
    userActivationLink: string;
    isUserActivated: boolean;
    roles?: Role[];
}
export interface tokens {
    refreshToken: string;
    accessToken: string;
    expireDate: Date;
}
export interface AuthUser {
    accessToken: string;
    owner?: returnedOwner;
    admin?: returnedAdmin;
    user?: returnedUser;
    type?: string;
}
export interface returnedUser {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    country: string | null;
    city: string | null;
    postOffice: string | null;
}
export interface returnedOwner {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
}
export interface returnedAdmin {
    id: number;
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
}
export interface CodeDto {
    type: 'OWNER' | 'ADMIN' | null;
    email: string;
}
