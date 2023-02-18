import { ReturnedCategory } from '../core/interfaces/product.interfaces';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { Category } from './models/category.model';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: typeof Category);
    getCategoryByValue(value: string): Promise<Category>;
    getCategoriesByIds(categoryIds: number[]): Promise<Category[]>;
    getCategoryById(categoryId: number): Promise<Category>;
    getCategories(): Promise<ReturnedCategory[]>;
    createCategory(categoryDto: CreateCategoryDto): Promise<ReturnedCategory>;
    deleteCategory(categoryId: number): Promise<number>;
    updateCategory(categoryId: number, updateDto: UpdateCategoryDto): Promise<ReturnedCategory>;
}
