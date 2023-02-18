import { Model } from 'sequelize-typescript';
import { Cart } from '../../cart/models/cart.model';
import { Order } from '../../orders/models/order.model';
import { Category } from '../../categories/models/category.model';
import { ProductCreationAttrs } from '../../core/interfaces/product.interfaces';
import { Owner } from '../../owner/models/owner.model';
import { Admin } from '../../admin/models/admin.model';
import { Review } from '../../reviews/models/review.model';
export declare class Product extends Model<Product, ProductCreationAttrs> {
    id: number;
    title: string;
    getTitle(): {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    setTitle(title: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    }): string;
    description: string;
    getDescription(): {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    };
    setDescription(description: {
        ua: string;
        ru: string;
        rs: string;
        en: string;
    }): string;
    price: number;
    images: string[];
    sizeChartImage: string;
    sizes: string[];
    colours: string[];
    quantity: number;
    private adminId;
    private ownerId;
    owner: Owner;
    admin: Admin;
    categories: Category[];
    private carts;
    private orders;
    reviews: Review[];
    getCategories(): Category[];
    setCategories(categories: Category[]): Category[];
    getCarts(): Cart[];
    getAuthor(): Owner;
    getOwnerId(): number;
    setOwnerId(ownerId: number): number;
    getAdminId(): number;
    setAdminId(adminId: number): number;
    getOrders(): Order[];
}
