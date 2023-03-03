import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Order } from 'src/orders/models/order.model';
import { Admin } from '../../admin/models/admin.model';
import { Owner } from '../../owner/models/owner.model';
import { Product } from '../../product/models/product.model';
import { User } from '../../users/models/user.model';
import { CartProduct } from './cart.product.model';

@Table({ tableName: 'CARTS' })
export class Cart extends Model<Cart> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  public id: number;

  @Column({
    type: DataType.ENUM('Open', 'CheckedOut'),
    unique: false,
    field: 'cartStatus',
  })
  public cartStatus: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    field: 'totalPrice',
  })
  public totalPrice: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    field: 'identifier',
  })
  public identifier: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
    field: 'adminId',
  })
  public adminId: number;

  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
    field: 'ownerId',
  })
  public ownerId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'orderId',
  })
  public orderId: number;

  @BelongsTo(() => User)
  public user: User;

  @BelongsTo(() => Admin)
  public admin: Admin;

  @BelongsTo(() => Owner)
  public owner: Owner;

  @HasOne(() => Order)
  public order: Order;

  @BelongsToMany(() => Product, () => CartProduct)
  public products: Product[];

  @HasMany(() => CartProduct)
  public cartProducts: CartProduct[];

  getCartStatus(): string {
    return this.cartStatus;
  }

  setCartStatus(cartStatus: string): string {
    this.cartStatus = cartStatus;
    return this.cartStatus;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): User {
    this.user = user;
    return this.user;
  }
}
