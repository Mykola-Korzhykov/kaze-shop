export interface OwnerRefreshTokenCreationAttrbs {
    email: string;
    ownerId: number;
    ownerRefreshToken: string;
    phoneNumber: string;
    ownerAgent: string;
}
export interface OwnerCreationAttrbs {
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    password: string;
    activationLink: string;
}
