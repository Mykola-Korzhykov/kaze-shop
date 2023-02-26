import {
  Column,
  DataType,
  Table,
  Model,
  IsInt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Cart } from './cart.model';

@Table({ tableName: 'CART_products' })
export class CartProduct extends Model<CartProduct> {
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

  @IsInt
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    field: 'cartId',
  })
  public cartId: number;

  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'quantity',
  })
  public quantity: number;

  @BelongsTo(() => Cart)
  public cart: Cart;

  @BelongsTo(() => Product)
  public product: Product;

  getProduct(): Product {
    return this.product;
  }

  getCart(): Cart {
    return this.cart;
  }
}
