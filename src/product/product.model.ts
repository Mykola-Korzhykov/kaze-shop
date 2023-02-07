import {
  Column,
  DataType,
  Table,
  Model,
  IsInt,
  BelongsTo,
  ForeignKey,
  IsArray,
  BelongsToMany,
} from 'sequelize-typescript';
import { CartProduct } from '../cart/models/cart-item.model';
import { Cart } from '../cart/models/cart.model';
import { Order } from '../orders/models/order.model';
import { OrderProduct } from '../orders/models/order.product.model';
import { Category } from '../categories/models/category.model';
import { ProductCategories } from '../categories/models/product.categories.model';
import { ProductCreationAttrs } from '../core/interfaces/product.interfaces';
import { Owner } from '../owner/models/owner.model';
import { Admin } from 'src/admin/models/admin.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
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
    field: 'title',
  })
  public title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'description',
  })
  public description: string;

  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'price',
  })
  public price: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    unique: false,
    allowNull: false,
    field: 'images',
  })
  public images: string[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'sizeChart',
  })
  public sizeChartImage: string;

  @Column({
    type: DataType.ARRAY(DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL')),
    unique: false,
    allowNull: true,
    field: 'sizes',
  })
  public sizes: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    unique: false,
    allowNull: true,
    field: 'colours',
  })
  public colours: string[];

  @IsInt
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    field: 'quantity',
  })
  public quantity: number;

  @IsInt
  @ForeignKey(() => Admin)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  private adminId: number;

  @IsInt
  @ForeignKey(() => Owner)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: true })
  private ownerId: number;

  @BelongsTo(() => Owner)
  public owner: Owner;

  @BelongsTo(() => Admin)
  public admin: Admin;

  @BelongsToMany(() => Category, () => ProductCategories)
  public categories: Category[];

  @BelongsToMany(() => Cart, () => CartProduct)
  private carts: Cart[];

  @BelongsToMany(() => Order, () => OrderProduct)
  private orders: Order[];

  getCategories(): Category[] {
    return this.categories;
  }

  setCategories(categories: Category[]): Category[] {
    this.categories = categories;
    return this.categories;
  }

  getCarts(): Cart[] {
    return this.carts;
  }

  getAuthor(): Owner {
    return this.owner;
  }

  getOwnerId(): number {
    return this.ownerId;
  }

  setOwnerId(ownerId: number): number {
    this.ownerId = ownerId;
    return this.ownerId;
  }

  getAdminId(): number {
    return this.adminId;
  }

  setAdminId(adminId: number): number {
    this.adminId = adminId;
    return adminId;
  }

  getOrders(): Order[] {
    return this.orders;
  }
}
