import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { ReviewCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
import { ProductReviews } from './product.reviews.model';

@Table({ tableName: 'REVIEWS' })
export class Review extends Model<Review, ReviewCreationAtrb> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    field: 'name',
  })
  public name: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    field: 'surname',
  })
  public surname: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    field: 'review',
  })
  public review: string;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'productId',
  })
  public productId: number;

  @BelongsToMany(() => Product, () => ProductReviews)
  public product: Product;
}
