/// <reference types="multer" />
import { CategoriesService } from '../categories/categories.service';
import { OwnerService } from '../owner/services/owner.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './product.model';
export declare class ProductService {
    private readonly productRepository;
    private readonly ownerService;
    private readonly categoriesService;
    constructor(productRepository: typeof Product, ownerService: OwnerService, categoriesService: CategoriesService);
    createProduct(createProductDto: CreateProductDto, userId: number, type: 'OWNER' | 'ADMIN' | null, images: Express.Multer.File[], sizeChartImage: Express.Multer.File[]): Promise<Product>;
    updateProduct(updateProductDto: UpdateProductDto, images: Express.Multer.File[], sizeChartImage: Express.Multer.File[]): Promise<void>;
    deleteProduct(productId: number): Promise<void>;
    deleteImage(filePath: string): Promise<void>;
}
