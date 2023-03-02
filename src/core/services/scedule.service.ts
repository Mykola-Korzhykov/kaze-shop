import { Injectable, Logger, Scope } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { OwnerService } from '../../owner/services/owner.service';
import { Currencies } from '../../owner/models/currencies.model';
import { CurrencyService } from '../../owner/services/currency.service';
import { JwtRefreshTokenDeletedEvent } from '../events/jwt-refresh-token-deleted.evet';
import { CreateOwnerDto } from '../../owner/dto/create.owner.dto';
import { join } from 'path';
import deleteEmpty from 'delete-empty';
@Injectable({ scope: Scope.DEFAULT })
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly eventEmitter: EventEmitter2,
    private readonly currencyService: CurrencyService,
  ) {}

  addCronJob(
    name: string,
    time: string,
    callback: () => Promise<void>,
  ): CronJob {
    const job = new CronJob(time, async () => {
      this.logger.warn(`time (${time}) for job ${name} to run!`);
      return callback();
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.warn(`job ${name} added for each minute at ${time} seconds!`);
    return job;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    disabled: true,
  })
  getTimeouts(): string[] {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
    return timeouts;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    disabled: true,
  })
  getCrons(): Map<string, CronJob> {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key) => {
      let next: Date | string;
      try {
        next = value.nextDates().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
    return jobs;
  }

  addInterval(
    name: string,
    milliseconds: number,
    cb: (ownerRefreshToken: string, name: string) => Promise<void>,
    ownerRefreshToken: string,
  ): NodeJS.Timer {
    const callback = async () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
      return cb(ownerRefreshToken, name);
    };
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
    return interval;
  }

  @Cron(CronExpression.EVERY_HOUR, {
    disabled: true,
  })
  getIntervals(): string[] {
    this.deleteCron('');
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
    return intervals;
  }

  addTimeoutForTokens(
    name: string,
    milliseconds: number,
    refreshTokenId: number,
    identifier: string,
    cb: (refreshTokenId: number, identifier: string) => Promise<number | false>,
  ): NodeJS.Timeout {
    try {
      const callback = async (): Promise<boolean | void> => {
        this.logger.log(`Timeout ${name} executing after (${milliseconds})!`);
        const timeout = await cb(refreshTokenId, identifier);
        if (!timeout) {
          return this.deleteTimeout(name);
        }
        this.deleteTimeout(name);
        const jwtRefreshTokenDeletedEvent = new JwtRefreshTokenDeletedEvent();
        jwtRefreshTokenDeletedEvent.name = name;
        jwtRefreshTokenDeletedEvent.userId = refreshTokenId;
        jwtRefreshTokenDeletedEvent.description = `deleted user refresh token: ${refreshTokenId}`;
        return this.eventEmitter.emit(
          'refreshtoken.deleted',
          jwtRefreshTokenDeletedEvent,
        );
      };
      this.logger.warn(`Timeout ${name} executing!`);
      const timeout = setTimeout(callback, milliseconds);
      this.schedulerRegistry.addTimeout(name, timeout);
      return timeout;
    } catch (err) {
      this.deleteTimeout(name);
    }
  }

  @Cron(CronExpression.EVERY_12_HOURS, {
    name: 'deleteEmptyFolders',
  })
  async deleteEmptyFolders(): Promise<string[]> {
    try {
      const deleted = await deleteEmpty(join(__dirname, 'static'));
      this.logger.log(deleted);
      return deleted;
    } catch (err) {
      this.deleteCron('deleteEmptyFolders');
    }
  }

  @Cron(CronExpression.EVERY_WEEK, {
    name: 'renewCurrencies',
  })
  async renewCurrencies(): Promise<Currencies> {
    try {
      return this.currencyService.renewCurrencies();
    } catch (err) {
      this.deleteCron('renewCurrencies');
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'setting-up',
    unrefTimeout: true,
    utcOffset: 1,
  })
  async setUp(): Promise<boolean | void> {
    try {
      this.logger.warn(`time (${30}) second for job setting-up to run!`);
      const owner = await OwnerService.creatingOwner(<CreateOwnerDto>{
        name: process.env.OWNER.toString().trim().split(',')[0],
        surname: process.env.OWNER.toString().trim().split(',')[1],
        phoneNumber: process.env.OWNER.toString().trim().split(',')[2],
        email: process.env.OWNER.toString().trim().split(',')[3],
        password: process.env.OWNER.toString().trim().split(',')[4],
      });
      if (owner) {
        return this.currencyService.setCurrencies(owner.id);
      }
      return this.deleteCron('setting-up');
    } catch (err) {
      this.deleteCron('setting-up');
    }
  }

  private deleteTimeout(name: string): void {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.log(`Timeout ${name} deleted!`);
    return;
  }

  private deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return;
  }

  private deleteInterval(name: string): void {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
    return;
  }
}
