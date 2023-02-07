import { Model } from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { User } from '../../users/models/user.model';
import { CartProduct } from './cart-item.model';
export declare class Cart extends Model<Cart> {
    id: number;
    private cartStatus;
    userId: number;
    private user;
    private products;
    private cartProducts;
    getCartStatus(): string;
    setCartStatus(cartStatus: string): string;
    getProducts(): Product[];
    getCartProducts(): CartProduct[];
    getUser(): User;
}
