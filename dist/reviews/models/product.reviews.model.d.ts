import { Model } from 'sequelize-typescript';
export declare class ProductReviews extends Model<ProductReviews> {
    id: number;
    reviewId: number;
    productId: number;
}
