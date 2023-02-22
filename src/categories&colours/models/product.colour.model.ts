import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Colour } from './colours.model';

@Table({ tableName: 'PRODUCT_Colours', createdAt: false, updatedAt: false })
export class ProductColours extends Model<ProductColours> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  public id: number;

  @ForeignKey(() => Colour)
  @Column({
    type: DataType.INTEGER,
    field: 'colourId',
  })
  public colourId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'productId',
  })
  public productId: number;
}
