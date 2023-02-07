import { Model } from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { User } from '../../users/models/user.model';
import { OrderProduct } from './order.product.model';
export declare class Order extends Model<Order> {
    id: number;
    private orderStatus;
    userId: number;
    totalPrice: number;
    private user;
    private orderProducts;
    products: Product[];
    getUser(): User;
    getOrderStatus(): string;
    setOrderStatus(orderStatus: string): string;
    getOrderProducts(): OrderProduct[];
}
