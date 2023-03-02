import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { OrderProduct } from '../../orders/models/order.product.model';
import { CartProduct } from '../../cart/models/cart.product.model';
import { ColourCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
import { ProductColours } from './product.colour.model';

@Table({ tableName: 'COLOURS' })
export class Colour extends Model<Colour, ColourCreationAtrb> {
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
    allowNull: false,
    unique: false,
    field: 'ua-locale',
  })
  public ua: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'ru-locale',
  })
  public ru: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'en-locale',
  })
  public en: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'rs-locale',
  })
  public rs: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'hex',
  })
  public hex: string;

  @ForeignKey(() => CartProduct)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    field: 'cartProductId',
  })
  public cartProductId: number;

  @ForeignKey(() => OrderProduct)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    field: 'orderProductId',
  })
  public orderProductId: number;

  @BelongsToMany(() => Product, () => ProductColours)
  private products: Product[];

  getProducts(): Product[] {
    return this.products;
  }
}