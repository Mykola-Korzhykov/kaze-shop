/// <reference types="multer" />
import { CreateProductDto } from './dto/create.product.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update.product.dto';
import { ReturnedProduct, ReturnedProducts } from '../core/interfaces/product.interfaces';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getProducts(page: number, pageSize: number): Promise<ReturnedProducts>;
    getProductsByIds(page: number, pageSize: number, productIds: number[]): Promise<ReturnedProducts>;
    filterProducts(page: number, pageSize: number, order: 'ASC' | 'DESC', sizes: string[], colours: string[], categories: number[]): Promise<ReturnedProducts>;
    getById(productId: number): Promise<ReturnedProduct>;
    getBookmarkProducts(page: number, pageSize: number, userId: number): any;
    getWatchedProducts(page: number, pageSize: number, userId: number): any;
    addWatchedProduct(productId: number, userId: number): any;
    addBookmark(productId: number, userId: number): any;
    createProduct(createProductDto: CreateProductDto, files: {
        images?: Express.Multer.File[];
        sizeChartImage?: Express.Multer.File[];
    }, userId: number, type: 'OWNER' | 'ADMIN' | null): Promise<ReturnedProduct>;
    updateProduct(updateProductDto: UpdateProductDto, productId: number, userId: number, type: 'OWNER' | 'ADMIN' | null, files: {
        images?: Express.Multer.File[];
        sizeChartImage?: Express.Multer.File[];
    }): Promise<ReturnedProduct>;
    deleteProduct(productId: number): Promise<number>;
    deleteFile(filePath: string): Promise<string>;
}
