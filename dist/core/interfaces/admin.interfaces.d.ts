export interface AdminRefreshTokenCreationAttrbs {
    email: string;
    adminId: number;
    adminRefreshToken: string;
    adminAgent: string;
    phoneNumber: string;
}
export interface AdmincreationAttrbs {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    password: string;
    activationLink: string;
}
export interface AdminInterface {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    userId: number;
    addContent: boolean;
    editContent: boolean;
    editWebsite: boolean;
}
