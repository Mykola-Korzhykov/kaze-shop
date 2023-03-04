import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable({ scope: Scope.DEFAULT })
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectQueue('garbageColecting') private garbageQueue: Queue,
    @InjectQueue('deleteProductsFromCarts') private freshQueue: Queue,
    @InjectQueue('deleteNotCompletedOrders') private deleteOrdersQueue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: 'garbageColecting',
  })
  async deleteFiles() {
    try {
      await this.garbageQueue.add('deleteFiles');
    } catch (err) {
      this.deleteCron('garbageColecting');
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS, {
    name: 'freshCarts',
  })
  async freshCarts() {
    try {
      await this.freshQueue.add('freshCarts');
    } catch (err) {
      this.deleteCron('freshCarts');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_11PM, {
    name: 'deleteOrders',
  })
  async fdeleteOrders() {
    try {
      await this.deleteOrdersQueue.add('deleteOrders');
    } catch (err) {
      this.deleteCron('deleteOrders');
    }
  }

  private deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return;
  }
}
