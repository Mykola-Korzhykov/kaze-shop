import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, Scope } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable({ scope: Scope.DEFAULT })
export class WorkerService {
  private readonly logger = new Logger(WorkerService.name);
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectQueue('garbageColecting') private queue: Queue,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: 'garbageColecting',
  })
  async deleteFiles() {
    try {
      await this.queue.add('deleteFiles');
      this.logger.log('done');
    } catch (err) {
      this.deleteCron('garbageColecting');
    }
  }

  private deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return;
  }
}
