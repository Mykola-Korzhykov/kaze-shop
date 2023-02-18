import { Model } from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Cart } from './cart.model';
export declare class CartProduct extends Model<CartProduct> {
    id: number;
    productId: number;
    cartId: number;
    quantity: number;
    private cart;
    private product;
    getProduct(): Product;
    getCart(): Cart;
}
