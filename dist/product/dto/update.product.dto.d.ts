export declare class UpdateProductDto {
    readonly title: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    readonly description: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    readonly price: number;
    readonly sizes: string[];
    readonly colours: string[];
    readonly quantity: number;
    readonly categories: number[];
}
