import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
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
