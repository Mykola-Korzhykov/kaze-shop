"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const global_interceptor_1 = require("./interceptors/global.interceptor");
const cluster_service_1 = require("./services/cluster.service");
const file_service_1 = require("./services/file.service");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const scedule_service_1 = require("./services/scedule.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: global_interceptor_1.GlobalInterceptor },
            { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard,
            },
            scedule_service_1.TasksService,
            cluster_service_1.AppClusterService,
            file_service_1.FilesService,
        ],
        imports: [
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                newListener: true,
                removeListener: true,
                maxListeners: 20,
                verboseMemoryLeak: true,
                ignoreErrors: false,
            }),
            schedule_1.ScheduleModule.forRoot(),
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map