import { Model } from 'sequelize-typescript';
import { CategoryCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/product.model';
export declare class Category extends Model<Category, CategoryCreationAtrb> {
    id: number;
    title: string;
    description: string;
    private products;
    getProducts(): Product[];
}
