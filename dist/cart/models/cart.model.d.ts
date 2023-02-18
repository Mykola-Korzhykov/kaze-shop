import { Model } from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { User } from '../../users/models/user.model';
import { CartProduct } from './cart.product.model';
export declare class Cart extends Model<Cart> {
    id: number;
    private cartStatus;
    totalPrice: number;
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
