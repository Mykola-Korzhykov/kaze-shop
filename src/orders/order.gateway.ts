import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/orders/verify_order' })
export class OrdersGateway {
  @WebSocketServer() wss: Server;

  sendToAll(msg: string) {
    this.wss.emit('OnPaymentProceed', { type: 'PaymentDone', message: msg });
  }

  @SubscribeMessage('OrderContinued')
  handleOrderContinued(client: Socket, orderStatus: string) {
    client.emit('orderConinued', orderStatus);
  }

  @SubscribeMessage('OrderLeft')
  handleOrderLeft(client: Socket, orderStatus: string) {
    client.emit('orderLeft', orderStatus);
  }
}
