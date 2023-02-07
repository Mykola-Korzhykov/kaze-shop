import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './models/category.model';
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: typeof Category);
    getCategoryByValue(value: string): Promise<Category>;
    getCategories(): Promise<{
        title: string;
        description: string;
        createdAt: any;
        updatedAt: any;
    }[]>;
    createCategory(categoryDto: CreateCategoryDto): Promise<{
        title: string;
        description: string;
    }>;
    deleteCategory(categoryId: number): Promise<number>;
}
