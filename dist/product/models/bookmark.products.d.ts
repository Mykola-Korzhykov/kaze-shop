import { Model } from 'sequelize-typescript';
export declare class BookmarksProducts extends Model<BookmarksProducts> {
    id: number;
    userId: number;
    productId: number;
}
