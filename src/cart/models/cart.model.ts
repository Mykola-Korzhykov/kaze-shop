import {
  Column,
  DataType,
  Table,
  Model,
  HasMany,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { User } from '../../users/models/user.model';
import { CartProduct } from './cart-item.model';

@Table({ tableName: 'carts' })
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
  private cartStatus: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'userId',
  })
  public userId: number;

  @BelongsTo(() => User)
  private user: User;

  @BelongsToMany(() => Product, () => CartProduct)
  private products: Product[];

  @HasMany(() => CartProduct)
  private cartProducts: CartProduct[];

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
}
