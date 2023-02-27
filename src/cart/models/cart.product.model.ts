import {
  Column,
  DataType,
  Table,
  Model,
  IsInt,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Colour } from 'src/categories&colours/models/colours.model';
import { CartProductCreatinAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
import { Cart } from './cart.model';
@Table({ tableName: 'CART_products' })
export class CartProduct extends Model<CartProduct, CartProductCreatinAtrb> {
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
    allowNull: true,
    field: 'imageUrl',
  })
  public imageUrl: string;

  @Column({
    type: DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL', 'XXL'),
    unique: false,
    allowNull: true,
    field: 'size',
  })
  public size: string;

  @IsInt
  @ForeignKey(() => Colour)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'colourId',
  })
  public colourId: number;

  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'price',
  })
  public price: number;

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

  @HasOne(() => Colour)
  public colour: Colour;

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
