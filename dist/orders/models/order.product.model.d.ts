import { Model } from 'sequelize-typescript';
import { Product } from '../../product/models/product.model';
import { Order } from './order.model';
export declare class OrderProduct extends Model<OrderProduct> {
    id: number;
    productId: number;
    price: number;
    orderId: number;
    quantity: number;
    private order;
    private product;
    getProduct(): Product;
    getOrder(): Order;
}
