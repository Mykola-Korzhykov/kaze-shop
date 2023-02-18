import { Model } from 'sequelize-typescript';
export declare class ProductCategories extends Model<ProductCategories> {
    id: number;
    categoryId: number;
    productId: number;
}
