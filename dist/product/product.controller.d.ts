/// <reference types="multer" />
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update.product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto, files: {
        images?: Express.Multer.File[];
        sizeChartImage?: Express.Multer.File[];
    }, userId: number, type: 'OWNER' | 'ADMIN' | null): Promise<import("./product.model").Product>;
    updateProduct(updateProductDto: UpdateProductDto, files: {
        images?: Express.Multer.File[];
        sizeChartImage?: Express.Multer.File[];
    }): Promise<void>;
    deleteProduct(productId: number): Promise<void>;
    deleteFile(filePath: string): void;
}
