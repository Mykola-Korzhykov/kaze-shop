import { Model } from 'sequelize-typescript';
import { CategoryCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
export declare class Category extends Model<Category, CategoryCreationAtrb> {
    id: number;
    ua: string;
    ru: string;
    en: string;
    rs: string;
    private products;
    getProducts(): Product[];
}
