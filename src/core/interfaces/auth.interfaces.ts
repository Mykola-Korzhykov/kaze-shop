import { Role } from '../../roles/models/roles.model';
export interface Payload {
  email: string;
  userId: number;
  userActivationLink: string;
  isUserActivated: boolean;
  roles?: Role[];
}

export interface Tokens {
  refreshToken: string;
  accessToken: string;
  expireDate: Date;
}

export interface AuthUser {
  accessToken: string;
  user: ReturnedUser | ReturnedAdmin | ReturnedOwner;
}

export interface ReturnedUser {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  country: string | null;
  city: string | null;
  postOffice: string | null;
  type: 'USER';
}

export interface ReturnedOwner {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  type: 'OWNER';
}

export interface ReturnedAdmin {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  type: 'ADMIN';
}

export interface CodeDto {
  type: 'OWNER' | 'ADMIN' | null;
  email: string;
}
