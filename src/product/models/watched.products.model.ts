import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Product } from '../../product/models/product.model';

@Table({ tableName: 'PRODUCT_Categories', createdAt: false, updatedAt: false })
export class WatchedProducts extends Model<WatchedProducts> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    field: 'id',
  })
  public id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'productId',
  })
  public productId: number;
}
