import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { User } from '../../users/models/user.model';
import { OrderProduct } from './order.product.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  public id: number;

  @Column({
    type: DataType.ENUM('Canceled', 'Submitted', 'Completed', 'Processing'),
    unique: false,
    field: 'orderStatus',
  })
  private orderStatus: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'totalPrice',
  })
  public totalPrice: number;

  @BelongsTo(() => User)
  private user: User;

  @HasMany(() => OrderProduct)
  private orderProducts: OrderProduct[];

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[];

  getUser(): User {
    return this.user;
  }

  getOrderStatus(): string {
    return this.orderStatus;
  }

  setOrderStatus(orderStatus: string): string {
    this.orderStatus = orderStatus;
    return this.orderStatus;
  }

  getOrderProducts(): OrderProduct[] {
    return this.orderProducts;
  }
}
