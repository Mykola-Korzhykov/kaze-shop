export interface ProductCreationAttrs {
    title: string;
    description: string;
    ownerId?: number;
    adminId?: number;
    images: string[];
    price: number;
    sizeChartImage: string;
    sizes: string[];
    colours: string[];
}
export interface ReviewCreationAtrb {
    name: string;
    surname: string;
    review: string;
}
export interface ReturnedReview {
    id: number;
    name: string;
    surname: string;
    review: string;
    createdAt: any;
    updatedAt: any;
}
export interface CategoryCreationAtrb {
    ua: string;
    ru: string;
    rs: string;
    en: string;
}
export interface ReturnedProduct {
    id: number;
    title: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    description: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    price: number;
    quantity: number;
    images: string[];
    sizeChartImage: string;
    sizes: string[];
    colours: string[];
    categories: ReturnedCategory[];
    reviews: ReturnedReview[] | [];
}
export interface ReturnedProducts {
    products: ReturnedProduct[];
    totalItems: number;
}
export interface ReturnedCategory {
    id: number;
    ua: string;
    en: string;
    rs: string;
    ru: string;
    createdAt: any;
    updatedAt: any;
}
