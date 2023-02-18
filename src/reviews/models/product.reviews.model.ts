import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Review } from './review.model';


@Table({ tableName: 'PRODUCT_Reviews', createdAt: false, updatedAt: false })
export class ProductReviews extends Model<ProductReviews> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  public id: number;

  @ForeignKey(() => Review)
  @Column({
    type: DataType.INTEGER,
    field: 'reviewId',
  })
  public reviewId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'productId',
  })
  public productId: number;
}
