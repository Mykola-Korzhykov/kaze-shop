import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { ReturnedCategory } from '../core/interfaces/product.interfaces';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<ReturnedCategory[]>;
    createCategory(categoryDto: CreateCategoryDto): Promise<ReturnedCategory>;
    updateCategory(categoryId: number, categoryDto: CreateCategoryDto): Promise<ReturnedCategory>;
    deleteCategory(categoryId: number): Promise<number>;
}
