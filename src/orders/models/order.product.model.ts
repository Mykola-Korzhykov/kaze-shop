import {
  Column,
  DataType,
  Table,
  Model,
  IsInt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { Order } from './order.model';

@Table({ tableName: 'orderproduct' })
export class OrderProduct extends Model<OrderProduct> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  public id: number;

  @IsInt
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    field: 'productId',
  })
  public productId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'price',
  })
  public price: number;

  @IsInt
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    field: 'orderId',
  })
  public orderId: number;

  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'quantity',
  })
  public quantity: number;

  @BelongsTo(() => Order)
  private order: Order;

  @BelongsTo(() => Product)
  private product: Product;

  getProduct(): Product {
    return this.product;
  }

  getOrder(): Order {
    return this.order;
  }
}
