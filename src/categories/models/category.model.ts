import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoryCreationAtrb } from '../../core/interfaces/product.interfaces';
import { Product } from '../../product/product.model';
import { ProductCategories } from './product.categories.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAtrb> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  })
  public id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  public title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: false,
    field: 'description',
  })
  public description: string;

  @BelongsToMany(() => Product, () => ProductCategories)
  private products: Product[];

  getProducts(): Product[] {
    return this.products;
  }
}
