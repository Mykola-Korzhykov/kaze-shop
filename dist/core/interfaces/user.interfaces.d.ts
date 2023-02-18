export interface UserRefreshCreationAttrbs {
    userId: number;
    userRefreshToken: string;
    userAgent: string;
    email: string;
}
export interface RolecreationAttrbs {
    value: string;
    description: string;
}
export interface UsercreationAttrbs {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    password: string;
    activationLink: string;
}
export interface InitializeUser {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export interface ValidateUser {
    email: string;
    password: string;
}
export interface UserInterface {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    addContent: boolean;
    editContent: boolean;
    editWebsite: boolean;
}
