"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 69:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TasksService_1;
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const common_1 = __webpack_require__(7);
const event_emitter_1 = __webpack_require__(70);
const schedule_1 = __webpack_require__(62);
const cron_1 = __webpack_require__(71);
const owner_service_1 = __webpack_require__(60);
const currency_service_1 = __webpack_require__(63);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(72);
const file_service_1 = __webpack_require__(73);
const path_1 = __webpack_require__(75);
const delete_empty_1 = __importDefault(__webpack_require__(79));
let TasksService = TasksService_1 = class TasksService {
    constructor(schedulerRegistry, eventEmitter, currencyService, filesService) {
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
        this.currencyService = currencyService;
        this.filesService = filesService;
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
        this.deleteCron('');
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
        return intervals;
    }
    garbageCollector(name, milliseconds) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
        });
        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
        return interval;
    }
    addTimeoutForTokens(name, milliseconds, refreshTokenId, identifier, cb) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Timeout ${name} executing after (${milliseconds})!`);
            const timeout = yield cb(refreshTokenId, identifier);
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
    deleteEmptyFolders() {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield (0, delete_empty_1.default)((0, path_1.join)(__dirname, 'static'));
            this.logger.log(deleted);
            return deleted;
        });
    }
    renewCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.currencyService.renewCurrencies();
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.warn(`time (${1}) second for job setting-up to run!`);
            const owner = yield owner_service_1.OwnerService.creatingOwner({
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
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Map !== "undefined" && Map) === "function" ? _e : Object)
], TasksService.prototype, "getCrons", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksService.prototype, "getIntervals", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksService.prototype, "getTimeouts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], TasksService.prototype, "deleteEmptyFolders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], TasksService.prototype, "renewCurrencies", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS, {
        name: 'setting-up',
        unrefTimeout: true,
        utcOffset: 1,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], TasksService.prototype, "setUp", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object, typeof (_c = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _c : Object, typeof (_d = typeof file_service_1.FilesService !== "undefined" && file_service_1.FilesService) === "function" ? _d : Object])
], TasksService);
exports.TasksService = TasksService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4710345ed8c47ed1da76")
/******/ })();
/******/ 
/******/ }
;