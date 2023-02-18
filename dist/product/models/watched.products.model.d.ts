import { Model } from 'sequelize-typescript';
export declare class WatchedProducts extends Model<WatchedProducts> {
    id: number;
    userId: number;
    productId: number;
}
