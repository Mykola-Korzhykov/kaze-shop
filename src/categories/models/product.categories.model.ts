import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { Category } from './category.model';

@Table({ tableName: 'product_categories', createdAt: false, updatedAt: false })
export class ProductCategories extends Model<ProductCategories> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  public id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    field: 'categoryId',
  })
  public categoryId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'productId',
  })
  public productId: number;
}
