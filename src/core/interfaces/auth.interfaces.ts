import { Role } from '../../roles/models/roles.model';
// tslint:disable-next-line: class-name
export interface payload {
  email: string;
  userId: number;
  userActivationLink: string;
  isUserActivated: boolean;
  roles?: Role[];
}

// tslint:disable-next-line: class-name
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

// tslint:disable-next-line: class-name
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

// tslint:disable-next-line: class-name
export interface returnedOwner {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

// tslint:disable-next-line: class-name
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
