import { Model } from 'sequelize-typescript';
import { ReviewCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
export declare class Review extends Model<Review, ReviewCreationAtrb> {
    id: number;
    name: string;
    surname: string;
    review: string;
    productId: number;
    product: Product;
}
