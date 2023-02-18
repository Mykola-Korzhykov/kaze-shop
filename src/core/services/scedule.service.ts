import { Injectable, Logger, Scope } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { JwtRefreshTokenDeletedEvent } from '../events/jwt-refresh-token-deleted.evet';

@Injectable({ scope: Scope.DEFAULT })
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
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

  @Cron(CronExpression.EVERY_HOUR)
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

  deleteCron(name: string): void {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
    return;
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

  deleteInterval(name: string): void {
    this.schedulerRegistry.deleteInterval(name);
    this.logger.warn(`Interval ${name} deleted!`);
    return;
  }

  @Cron(CronExpression.EVERY_HOUR)
  getIntervals(): string[] {
    const intervals = this.schedulerRegistry.getIntervals();
    intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
    return intervals;
  }

  garbageCollector(
    name: string,
    milliseconds: number
  ) {
    const callback = async () => {
      this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
    };
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);
    return interval;
  }

  addTimeoutForTokens(
    name: string,
    milliseconds: number,
    refreshTokenId: number,
    identifier: string,
    cb: (refreshTokenId: number, identifier: string) => Promise<number | false>,
  ): NodeJS.Timeout {
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
  }

  deleteTimeout(name: string): void {
    this.schedulerRegistry.deleteTimeout(name);
    this.logger.log(`Timeout ${name} deleted!`);
    return;
  }

  @Cron(CronExpression.EVERY_HOUR)
  getTimeouts(): string[] {
    const timeouts = this.schedulerRegistry.getTimeouts();
    timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
    return timeouts;
  }
}
