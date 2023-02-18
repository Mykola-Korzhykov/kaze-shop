import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoryCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/models/product.model';
import { ProductCategories } from './product.categories.model';

@Table({ tableName: 'CATEGORIES' })
export class Category extends Model<Category, CategoryCreationAtrb> {
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

  @BelongsToMany(() => Product, () => ProductCategories)
  private products: Product[];

  getProducts(): Product[] {
    return this.products;
  }
}
