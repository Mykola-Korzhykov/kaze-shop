import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Job } from 'bull';
import { Order } from '../../orders/models/order.model';

@Processor('deleteNotCompletedOrders')
export class DeleteNotCompletedOrders {
  private readonly logger = new Logger(DeleteNotCompletedOrders.name);
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
  ) {}
  @Process('deleteOrders')
  async processNamedJob(job: Job): Promise<any> {
    try {
      this.logger.warn('JOB started: deleting orders', job.name);
      this.logger.log(process.cwd());
      const orders = await this.orderRepository.findAll({
        include: { all: true },
      });
      // tslint:disable-next-line: await-promise
      for await (const order of orders) {
        if (
          new Date(
            order.getOrderTokenExpiration().getTime() + 60 * 60 * 24 * 1000,
          ) > new Date() &&
          !order.city &&
          !order.postOffice &&
          !order.country &&
          order.getOrderStatus() === 'Submitted'
        ) {
          await this.orderRepository.destroy({ where: { id: order.id } });
        }
      }
      const newOrders = await this.orderRepository.findAll({
        include: { all: true },
      });
      this.logger.log('JOB finished succesfully!', job.name);
      return newOrders;
    } catch (err) {
      this.logger.error(err);
      process.exit(1);
    }
  }
}
