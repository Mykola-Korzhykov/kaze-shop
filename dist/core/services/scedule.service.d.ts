/// <reference types="node" />
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
export declare class TasksService {
    private schedulerRegistry;
    private eventEmitter;
    private readonly logger;
    constructor(schedulerRegistry: SchedulerRegistry, eventEmitter: EventEmitter2);
    addCronJob(name: string, time: string, callback: () => Promise<void>): CronJob;
    getCrons(): Map<string, CronJob>;
    deleteCron(name: string): void;
    addInterval(name: string, milliseconds: number, cb: (ownerRefreshToken: string, name: string) => Promise<void>, ownerRefreshToken: string): NodeJS.Timer;
    deleteInterval(name: string): void;
    getIntervals(): string[];
    garbageCollector(name: string, milliseconds: number): NodeJS.Timer;
    addTimeoutForTokens(name: string, milliseconds: number, refreshTokenId: number, identifier: string, cb: (refreshTokenId: number, identifier: string) => Promise<number | false>): NodeJS.Timeout;
    deleteTimeout(name: string): void;
    getTimeouts(): string[];
}
