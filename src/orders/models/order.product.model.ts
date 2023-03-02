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
import { Colour } from '../../categories&colours/models/colours.model';
import { Product } from '../../product/models/product.model';
import { Order } from './order.model';

@Table({ tableName: 'PRODUCT_Orders' })
export class OrderProduct extends Model<OrderProduct> {
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

  @HasOne(() => Colour)
  public colour: Colour;

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
