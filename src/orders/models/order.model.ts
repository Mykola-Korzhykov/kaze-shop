import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  IsEmail,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/models/cart.model';
import { OrderCreatinAtrrb } from '../../core/interfaces/order.interfaces';
import { Product } from '../../product/models/product.model';
import { User } from '../../users/models/user.model';
import { OrderProduct } from './order.product.model';
@Table({ tableName: 'ORDERS' })
export class Order extends Model<Order, OrderCreatinAtrrb> {
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
    allowNull: false,
    field: 'userName',
  })
  public userName: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'languageCode',
  })
  public languageCode: string;

  @Column({
    type: DataType.JSONB,
    unique: false,
    allowNull: false,
    field: 'currency',
  })
  private currency: string;

  getCurrency(): {
    countryCode: string;
    currencyCode: string;
    symbol: string;
    rate: number;
  } {
    return JSON.parse(this.currency);
  }

  setCurrency(currency: {
    countryCode: string;
    currencyCode: string;
    symbol: string;
    rate: number;
  }) {
    this.currency = JSON.stringify(currency);
    return this.currency;
  }

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'userSurname',
  })
  public userSurname: string;

  @IsEmail
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'userEmail',
  })
  public userEmail: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'userPhoneNumber',
  })
  public userPhoneNumber: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'country',
  })
  public country: string;

  @Column({
    type: DataType.DATE,
    unique: false,
    allowNull: false,
    field: 'sendDate',
  })
  public sendDate: Date;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'city',
  })
  public city: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
    field: 'postOffice',
  })
  public postOffice: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    field: 'comment',
  })
  public comment: string;

  @Column({
    type: DataType.ENUM(
      'Canceled',
      'Submitted',
      'Completed',
      'Processing',
      'PAID',
    ),
    unique: false,
    field: 'orderStatus',
  })
  private orderStatus: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
    field: 'orderToken',
  })
  public orderToken: string;

  @Column({
    type: DataType.DATE,
    unique: true,
    allowNull: true,
    field: 'orderTokenExpiration',
  })
  private orderTokenExpiration: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    field: 'cartId',
  })
  public cartId: number;

  @Column({
    type: DataType.INTEGER,
    field: 'totalPrice',
  })
  public totalPrice: number;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Cart)
  public cart: Cart;

  @HasMany(() => OrderProduct)
  public orderProducts: OrderProduct[];

  @BelongsToMany(() => Product, () => OrderProduct)
  public products: Product[];

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

  getOrderToken(): string {
    return this.orderToken;
  }

  setOrderToken(orderToken: string): string {
    this.orderToken = orderToken;
    return this.orderToken;
  }

  getOrderTokenExpiration(): Date {
    return this.orderTokenExpiration;
  }

  setOrderTokenExpiration(orderTokenExpiration: Date): Date {
    this.orderTokenExpiration = orderTokenExpiration;
    return this.orderTokenExpiration;
  }
}
