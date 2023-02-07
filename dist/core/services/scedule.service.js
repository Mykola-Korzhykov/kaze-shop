"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const cron_1 = require("cron");
const jwt_refresh_token_deleted_evet_1 = require("../events/jwt-refresh-token-deleted.evet");
let TasksService = TasksService_1 = class TasksService {
    constructor(schedulerRegistry, eventEmitter) {
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    addCronJob(name, time, callback) {
        const job = new cron_1.CronJob(time, () => __awaiter(this, void 0, void 0, function* () {
            this.logger.warn(`time (${time}) for job ${name} to run!`);
            return callback();
        }));
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
        this.logger.warn(`job ${name} added for each minute at ${time} seconds!`);
        return job;
    }
    getCrons() {
        const jobs = this.schedulerRegistry.getCronJobs();
        jobs.forEach((value, key) => {
            let next;
            try {
                next = value.nextDates().toJSDate();
            }
            catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`job: ${key} -> next: ${next}`);
        });
        return jobs;
    }
    deleteCron(name) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
        return;
    }
    addInterval(name, milliseconds, cb, ownerRefreshToken) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
            return cb(ownerRefreshToken, name);
        });
        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
        return interval;
    }
    deleteInterval(name) {
        this.schedulerRegistry.deleteInterval(name);
        this.logger.warn(`Interval ${name} deleted!`);
        return;
    }
    getIntervals() {
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
        return intervals;
    }
    addTimeoutForTokens(name, milliseconds, refreshTokenId, cb) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Timeout ${name} executing after (${milliseconds})!`);
            const timeout = yield cb(refreshTokenId);
            if (!timeout) {
                return this.deleteTimeout(name);
            }
            this.deleteTimeout(name);
            const jwtRefreshTokenDeletedEvent = new jwt_refresh_token_deleted_evet_1.JwtRefreshTokenDeletedEvent();
            jwtRefreshTokenDeletedEvent.name = name;
            jwtRefreshTokenDeletedEvent.userId = refreshTokenId;
            jwtRefreshTokenDeletedEvent.description = `deleted user refresh token: ${refreshTokenId}`;
            return this.eventEmitter.emit('refreshtoken.deleted', jwtRefreshTokenDeletedEvent);
        });
        this.logger.warn(`Timeout ${name} executing!`);
        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
        return timeout;
    }
    deleteTimeout(name) {
        this.schedulerRegistry.deleteTimeout(name);
        this.logger.log(`Timeout ${name} deleted!`);
        return;
    }
    getTimeouts() {
        const timeouts = this.schedulerRegistry.getTimeouts();
        timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
        return timeouts;
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Map)
], TasksService.prototype, "getCrons", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksService.prototype, "getIntervals", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksService.prototype, "getTimeouts", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        event_emitter_1.EventEmitter2])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=scedule.service.js.map