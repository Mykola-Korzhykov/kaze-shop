/// <reference types="multer" />
import { AdminService } from '../admin/services/admin.service';
import { ReturnedProduct, ReturnedProducts } from '../core/interfaces/product.interfaces';
import { OwnerService } from '../owner/services/owner.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './models/product.model';
import { UsersService } from '../users/services/users.service';
export declare class ProductService {
    private readonly productRepository;
    private readonly userService;
    private readonly ownerService;
    private readonly adminService;
    private readonly categoriesService;
    private readonly Logger;
    constructor(productRepository: typeof Product, userService: UsersService, ownerService: OwnerService, adminService: AdminService, categoriesService: CategoriesService);
    getBookmarks(page: number, productPerPage: number, userId: number): Promise<{
        products: {
            id: number;
            title: {
                ua: string;
                ru: string;
                rs: string;
                en: string;
            };
            description: {
                ua: string;
                ru: string;
                rs: string;
                en: string;
            };
            price: number;
            quantity: number;
            images: string[];
            sizeChartImage: string;
            sizes: string[];
            colours: string[];
            categories: {
                id: number;
                ua: string;
                en: string;
                rs: string;
                ru: string;
                createdAt: any;
                updatedAt: any;
            }[];
            reviews: {
                id: number;
                name: string;
                surname: string;
                review: string;
                createdAt: any;
                updatedAt: any;
            }[];
        }[];
        totalItems: number;
    }>;
    getWatchedProducts(page: number, productPerPage: number, userId: number): Promise<ReturnedProducts>;
    addWatchedProduct(productId: number, userId: number): Promise<number>;
    addBookmarkProduct(productId: number, userId: number): Promise<number>;
    getProductsByIds(productIds: number[], page: number, productPerPage: number): Promise<{
        products: {
            id: number;
            title: {
                ua: string;
                ru: string;
                rs: string;
                en: string;
            };
            description: {
                ua: string;
                ru: string;
                rs: string;
                en: string;
            };
            price: number;
            quantity: number;
            images: string[];
            sizeChartImage: string;
            sizes: string[];
            colours: string[];
            categories: {
                id: number;
                ua: string;
                en: string;
                rs: string;
                ru: string;
                createdAt: any;
                updatedAt: any;
            }[];
            reviews: {
                id: number;
                name: string;
                surname: string;
                review: string;
                createdAt: any;
                updatedAt: any;
            }[];
        }[];
        totalItems: number;
    }>;
    getProducts(page: number, productPerPage: number): Promise<ReturnedProducts>;
    filterProducts(page: number, productPerPage: number, order: 'ASC' | 'DESC' | null, sizes: string[], colours: string[], categories: number[]): Promise<ReturnedProducts>;
    getProductById(productId: number): Promise<ReturnedProduct>;
    findById(productId: number): Promise<Product>;
    createProduct(createProductDto: CreateProductDto, userId: number, type: 'OWNER' | 'ADMIN' | null, images: Express.Multer.File[], sizeChartImage: Express.Multer.File[]): Promise<ReturnedProduct>;
    updateProduct(updateProductDto: UpdateProductDto, productId: number, userId: number, type: 'OWNER' | 'ADMIN' | null, images: Express.Multer.File[], sizeChartImage: Express.Multer.File[]): Promise<ReturnedProduct>;
    deleteProduct(productId: number): Promise<number>;
    deleteImage(filePath: string): Promise<string>;
}
