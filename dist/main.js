/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __resourceQuery = "?100";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.slice(1) || 0;
	var log = __webpack_require__(1);

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function (updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(2)(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function (err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + log.formatError(err));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log("warning", "[HMR] Update failed: " + log.formatError(err));
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}


/***/ }),
/* 1 */
/***/ ((module) => {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function (level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function (level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function (level) {
	logLevel = level;
};

module.exports.formatError = function (err) {
	var message = err.message;
	var stack = err.stack;
	if (!stack) {
		return message;
	} else if (stack.indexOf(message) < 0) {
		return message + "\n" + stack;
	} else {
		return stack;
	}
};


/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function (updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function (moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(1);

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function (moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function (moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function (moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				'[HMR] Consider using the optimization.moduleIds: "named" for module names.'
			);
	}
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const app_module_1 = __webpack_require__(6);
const helmet_1 = __importDefault(__webpack_require__(150));
const compression_1 = __importDefault(__webpack_require__(151));
const cookie_parser_1 = __importDefault(__webpack_require__(152));
const cluster_service_1 = __webpack_require__(101);
const all_exceptions_filter_1 = __webpack_require__(97);
const owner_service_1 = __webpack_require__(52);
const error_handler_filter_1 = __webpack_require__(73);
const api_exception_filter_1 = __webpack_require__(75);
const PORT = Number(process.env.PORT) || 2222;
function startServer() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            bodyParser: true,
            bufferLogs: true,
            autoFlushLogs: true,
            forceCloseConnections: true,
        });
        if (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'production') {
            const OWNER = process.env.OWNER.toString().trim().split(',');
            yield owner_service_1.OwnerService.creatingOwner(OWNER);
        }
        const httpAdapter = app.get(core_1.HttpAdapterHost);
        app.enableShutdownHooks();
        app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter), new error_handler_filter_1.ApiErrorExceptionFilter(), new api_exception_filter_1.ApiExceptionFilter());
        app.setGlobalPrefix('kaze_shop');
        app.set('trust proxy', true);
        app.use((0, helmet_1.default)());
        app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        app.use(helmet_1.default.referrerPolicy({ policy: 'same-origin' }));
        app.use((0, cookie_parser_1.default)(process.env.SECRET_KEY.toString().trim()));
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            preflightContinue: true,
            optionsSuccessStatus: 204,
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization', 'imageType'],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
        });
        app.use((0, compression_1.default)({
            level: 1,
            threshold: 1,
            windowBits: 15,
            memLevel: 9,
            chunkSize: 16384,
        }));
        const config = new swagger_1.DocumentBuilder()
            .addSecurity('basic', {
            type: 'http',
            scheme: 'basic',
        })
            .addApiKey({
            type: 'http',
        })
            .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: 'Enter JWT token',
            in: 'header',
        }, 'JWT-auth')
            .setTitle('Kazi.spos-API')
            .setDescription('Kazi.spos-API Docs')
            .setVersion('1.1.2')
            .addTag('nest.js')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('/api/docs', app, document);
        process.on('unhandledRejection', (reason) => {
            console.log(reason.name, reason.message);
            console.log('UNHANDLED REJECTION! 💥 Shutting down...');
            return process.exit(1), reason;
        });
        process.on('uncaughtException', (err) => {
            console.log(err.name, err.message);
            console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
            return process.exit(1);
        });
        try {
            yield app.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
                console.log(`Directory: ${process.cwd()}, Process: ${process.pid}, URL: ${yield app.getUrl()}, Server is being listened on port: ${PORT}`);
                return app.getUrl();
            }));
            if (true) {
                module.hot.accept();
                module.hot.dispose(() => app.close());
            }
            return app;
        }
        catch (error) {
            console.error(`Error occured: ${error.message}`);
        }
    });
}
if (((_a = process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) === 'development') {
    try {
        startServer();
    }
    catch (err) {
        console.log(err);
    }
}
if (((_b = process.env) === null || _b === void 0 ? void 0 : _b.NODE_ENV) === 'production') {
    try {
        cluster_service_1.AppClusterService.clusterize(startServer);
    }
    catch (err) {
        console.log(err);
    }
}


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/core");

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const config_1 = __webpack_require__(95);
const admin_model_1 = __webpack_require__(27);
const auth_module_1 = __webpack_require__(76);
const cluster_service_1 = __webpack_require__(101);
const throttler_1 = __webpack_require__(67);
const serve_static_1 = __webpack_require__(139);
const path_1 = __importDefault(__webpack_require__(105));
const admin_refresh_token_model_1 = __webpack_require__(43);
const mail_module_1 = __webpack_require__(107);
const cors_middleware_1 = __webpack_require__(140);
const core_1 = __webpack_require__(4);
const all_exceptions_filter_1 = __webpack_require__(97);
const global_interceptor_1 = __webpack_require__(98);
const core_module_1 = __webpack_require__(96);
const product_module_1 = __webpack_require__(116);
const users_module_1 = __webpack_require__(108);
const owner_module_1 = __webpack_require__(90);
const orders_module_1 = __webpack_require__(132);
const cart_module_1 = __webpack_require__(129);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const app_controller_1 = __webpack_require__(143);
const telegram_module_1 = __webpack_require__(144);
const telegram_config_1 = __webpack_require__(149);
const categories_module_1 = __webpack_require__(126);
const product_model_1 = __webpack_require__(35);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
const platform_express_1 = __webpack_require__(121);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cors_middleware_1.CorsMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [
            cluster_service_1.AppClusterService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: global_interceptor_1.GlobalInterceptor,
            },
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            telegram_module_1.TelegramModule.forRootAsync({
                useFactory: telegram_config_1.getTelegramConfig,
            }),
            common_1.CacheModule.register({
                ttl: 6000,
                max: 100,
                isGlobal: true,
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 600,
                limit: 100,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.default.join(__dirname, 'static'),
            }),
            platform_express_1.MulterModule.register({
                dest: './static',
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.PGHOST.toString(),
                port: Number(process.env.PGPORT),
                username: process.env.PGUSER.toString(),
                password: process.env.PGPASSWORD.toString(),
                database: process.env.PGDATABASE.toString(),
                models: [
                    product_model_1.Product,
                    order_model_1.Order,
                    order_product_model_1.OrderProduct,
                    category_model_1.Category,
                    product_categories_model_1.ProductCategories,
                    admin_model_1.Admin,
                    admin_refresh_token_model_1.AdminRefreshToken,
                    owner_model_1.Owner,
                    owner_refresh_token_model_1.OwnerRefreshToken,
                    user_model_1.User,
                    user_refresh_token_model_1.UserRefreshToken,
                    roles_model_1.Role,
                    user_roles_model_1.UserRoles,
                    cart_model_1.Cart,
                    cart_item_model_1.CartProduct,
                ],
                autoLoadModels: true,
                synchronize: true,
                retryDelay: 5,
                retryAttempts: 5,
            }),
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            core_module_1.CoreModule,
            product_module_1.ProductModule,
            users_module_1.UsersModule,
            owner_module_1.OwnerModule,
            orders_module_1.OrdersModule,
            cart_module_1.CartModule,
            categories_module_1.CategoriesModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common");

/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/sequelize");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AdminModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminModule = void 0;
const common_1 = __webpack_require__(7);
const admin_controller_1 = __webpack_require__(10);
const admin_service_1 = __webpack_require__(24);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(27);
const auth_module_1 = __webpack_require__(76);
const jwt_1 = __webpack_require__(16);
const admin_refresh_token_model_1 = __webpack_require__(43);
const jwt_refresh_service_1 = __webpack_require__(61);
const owner_module_1 = __webpack_require__(90);
const mail_service_1 = __webpack_require__(21);
const initialize_user_middleware_1 = __webpack_require__(114);
const owner_service_1 = __webpack_require__(52);
const owner_model_1 = __webpack_require__(31);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const owner_refresh_token_model_1 = __webpack_require__(42);
const users_module_1 = __webpack_require__(108);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const user_admin_middleware_1 = __webpack_require__(137);
const body_validator_pipe_1 = __importDefault(__webpack_require__(115));
const create_admin_dto_1 = __webpack_require__(63);
const config_1 = __webpack_require__(95);
const admin_user_middleware_1 = __webpack_require__(138);
const core_module_1 = __webpack_require__(96);
const scedule_service_1 = __webpack_require__(55);
let AdminModule = AdminModule_1 = class AdminModule {
    configure(consumer) {
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'admin/get_admins', method: common_1.RequestMethod.GET }, { path: 'admin/find_admin', method: common_1.RequestMethod.GET }, { path: 'admin/create_admin', method: common_1.RequestMethod.POST }, { path: 'admin/update_admin', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(user_admin_middleware_1.UserAdminMiddleware)
            .forRoutes({ path: 'admin/create_admin', method: common_1.RequestMethod.POST });
        consumer
            .apply(body_validator_pipe_1.default.validate(create_admin_dto_1.CreateAdminDto))
            .forRoutes({ path: 'admin/create_admin', method: common_1.RequestMethod.POST });
        consumer
            .apply(admin_user_middleware_1.AdminUserMiddleware)
            .forRoutes({ path: 'admin/update_admin', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(body_validator_pipe_1.default.validate(create_admin_dto_1.CreateAdminDto))
            .forRoutes({ path: 'admin/update_admin', method: common_1.RequestMethod.PATCH });
    }
};
AdminModule = AdminModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [admin_controller_1.AdminController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_ADMIN_SECRET.toString().trim() ||
                    'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
                signOptions: {
                    expiresIn: 172800000,
                },
            }),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => AdminModule_1),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        providers: [
            scedule_service_1.TasksService,
            admin_service_1.AdminService,
            jwt_refresh_service_1.AdminJwtRefreshService,
            mail_service_1.MailService,
            owner_service_1.OwnerService,
            admin_service_1.AdminService,
        ],
        exports: [admin_service_1.AdminService, jwt_refresh_service_1.AdminJwtRefreshService],
    })
], AdminModule);
exports.AdminModule = AdminModule;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const jwt_auth_guard_1 = __webpack_require__(11);
const create_admin_dto_1 = __webpack_require__(63);
const admin_model_1 = __webpack_require__(27);
const admin_service_1 = __webpack_require__(24);
const validation_pipe_1 = __webpack_require__(64);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const roles_auth_decorator_1 = __webpack_require__(68);
const roles_guard_1 = __webpack_require__(69);
const owner_admin_guard_1 = __webpack_require__(70);
const jw_refresh_guard_1 = __webpack_require__(71);
const throttler_1 = __webpack_require__(67);
const pipes_1 = __webpack_require__(72);
const error_handler_filter_1 = __webpack_require__(73);
const api_exception_filter_1 = __webpack_require__(75);
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    createAdmin(adminDto) {
        return this.adminService.createAdmin(adminDto);
    }
    updateAdmin(adminDto) {
        return this.adminService.updateAdmin(adminDto);
    }
    findAdmin(v, page, pageSize) {
        return this.adminService.findAdmin(v, page, pageSize);
    }
    getAllUsers(page, pageSize) {
        return this.adminService.getAllAdmins(page, pageSize);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creating Admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('create_admin'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_admin_dto_1.CreateAdminDto !== "undefined" && create_admin_dto_1.CreateAdminDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Updating Admin' }),
    (0, swagger_1.ApiResponse)({ status: 202, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.Patch)('update_admin'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof create_admin_dto_1.CreateAdminDto !== "undefined" && create_admin_dto_1.CreateAdminDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting Admins' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('find_admin'),
    __param(0, (0, common_1.Query)('v', pipes_1.ParseArrayPipe)),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AdminController.prototype, "findAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting Admins' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_model_1.Admin] }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('get_admins'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AdminController.prototype, "getAllUsers", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminController);
exports.AdminController = AdminController;


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const auth_service_1 = __webpack_require__(13);
const api_exception_1 = __webpack_require__(47);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const bearer = authHeader.split(' ')[0];
            const accessToken = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || !accessToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const decodedToken = Buffer.from(accessToken, 'base64').toString('ascii');
            let payload;
            try {
                payload = yield this.authService.validateAccessToken(decodedToken);
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            req.payload = payload;
            return true;
        }))();
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NO_RIGHT = exports.INVALID_REQUEST = exports.NO_LINK_PROVIDED = exports.USER_NOT_DETECTED = exports.INVALID_HEADER = exports.ACCESS_TOKEN_NOT_PROVIDED = exports.ACTIVTING_PARAMS_NOT_PROVIDED = exports.USER_WITH_EMAIL_NOT_FOUND = exports.EMAIL_NOT_PROVIDED = exports.REFRESH_TOKEN_NOT_PROVIDED = exports.INVALID_REFRESH_TOKEN = exports.INVALID_PARAMS = exports.OWNER_NOT_AUTHORIZIED = exports.ADMIN_NOT_AUTHORIZIED = exports.USER_NOT_AUTHORIZIED = exports.LANGUAGE_NOT_PROVIDED = exports.ACTIVATION_EXPIRED = exports.NO_TOKEN_PROVIDED = exports.ACCESS_DENIED = exports.INVALID_EMAIL_OR_PASSWORD = exports.USER_WITH_EMAIL_DOESNT_EXIST = exports.USER_WITH_PHONENUMBER_EXIST = exports.USER_WITH_EMAIL_EXIST = exports.SURNAME_VALIDATION = exports.USERNAME_VALIDATION = exports.EMAIL_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = void 0;
exports.PASSWORD_VALIDATION = 'Password must be between 8 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.USERNAME_VALIDATION = 'User name must be valid. Invalid username. Please try again.';
exports.SURNAME_VALIDATION = 'User surname must be valid. Invalid username. Please try again.';
exports.USER_WITH_EMAIL_EXIST = 'User with this email already exist, pick different one.';
exports.USER_WITH_PHONENUMBER_EXIST = 'User with this phone number already exist, pick different one.';
exports.USER_WITH_EMAIL_DOESNT_EXIST = 'User with this email doesn`t exist, pick different one.';
exports.INVALID_EMAIL_OR_PASSWORD = 'Invalid entered email or password';
exports.ACCESS_DENIED = 'You cannot access this!';
exports.NO_TOKEN_PROVIDED = 'No access token provided!';
exports.ACTIVATION_EXPIRED = {
    en: 'Activation expired!',
    ru: 'Срок действия активации истек!',
    rs: 'Активација је истекла!',
    ua: 'Термін активації минув!'
};
exports.LANGUAGE_NOT_PROVIDED = {
    en: 'No language provided!',
    ua: 'Немає мови!',
    ru: 'Язык не указан!',
    rs: 'Није наведен језик!'
};
exports.USER_NOT_AUTHORIZIED = {
    en: 'User is not authorized, token is not valid!',
    ua: 'Користувач не авторизований, токен недійсний!',
    ru: 'Пользователь не авторизован, токен недействителен!',
    rs: 'Корисник није овлашћен, токен није важећи!',
};
exports.ADMIN_NOT_AUTHORIZIED = {
    en: 'Admin is not authorized, token is not valid!',
    ua: 'Адміністратор не авторизований, токен недійсний!',
    ru: 'Админ не авторизован, токен недействителен!',
    rs: 'Администратор није овлашћен, токен није важећи!',
};
exports.OWNER_NOT_AUTHORIZIED = {
    en: 'Owner is not authorized, token is not valid!',
    ua: 'Власник не авторизований, токен недійсний!',
    ru: 'Владелец не авторизован, токен недействителен!',
    rs: 'Власник није овлашћен, токен није важећи!',
};
exports.INVALID_PARAMS = {
    en: 'Invalid request params!',
    ru: 'Недопустимые параметры запроса!',
    ua: 'Недійсні параметри запиту!',
    rs: 'Неважећи параметри захтева!',
};
exports.INVALID_REFRESH_TOKEN = {
    en: 'Invalid refresh token provided!',
    ru: 'Предоставлен неверный токен обновления!',
    ua: 'Надано недійсний токен оновлення!',
    rs: 'Достављен је неважећи токен за освежавање!',
};
exports.REFRESH_TOKEN_NOT_PROVIDED = {
    en: 'Refresh token not provided!',
    ru: 'Токен обновления не предоставлен!',
    ua: 'Токен оновлення не надано!',
    rs: 'Токен за освежавање није обезбеђен!',
};
exports.EMAIL_NOT_PROVIDED = {
    en: 'No email provided!',
    ru: 'Электронная почта не указана!',
    ua: 'Електронна адреса не вказана!',
    rs: 'Није наведена е-пошта!',
};
exports.USER_WITH_EMAIL_NOT_FOUND = {
    en: 'User with this email not found!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    rs: 'Корисник са овом е-поштом није пронађен!',
};
exports.ACTIVTING_PARAMS_NOT_PROVIDED = {
    en: 'Activating params not provided!',
    ua: 'Параметри активації не надано!',
    ru: 'Параметры активации не указаны!',
    rs: 'Параметри за активирање нису обезбеђени!'
};
exports.ACCESS_TOKEN_NOT_PROVIDED = {
    en: 'Access token not provided!',
    ru: 'Токен доступа не предоставлен!',
    ua: 'Токен доступу не надано!',
    rs: 'Приступни токен није обезбеђен!',
};
exports.INVALID_HEADER = {
    en: 'Invalid authorization header provided!',
    ru: 'Токен доступа не предоставлен!',
    ua: 'Надано недійсний заголовок авторизації!',
    rs: 'Приступни токен није обезбеђен!',
};
exports.USER_NOT_DETECTED = {
    en: 'User is not detected!',
    ru: 'Пользователь не обнаружен!',
    ua: 'Користувача не виявлено!',
    rs: 'Корисник није откривен!',
};
exports.NO_LINK_PROVIDED = {
    en: 'Access denied! No link provided!',
    ru: 'Доступ запрещен! Ссылка не предоставлена!',
    ua: 'Доступ заборонено! Посилання не надано!',
    rs: 'Приступ забрањен! Није наведена веза!',
};
exports.INVALID_REQUEST = {
    en: 'User is not authorized, invalid request!',
    ru: 'Пользователь не авторизован, неверный запрос!',
    ua: 'Користувач не авторизований, недійсний запит!',
    rs: 'Корисник није овлашћен, неважећи захтев!',
};
exports.NO_RIGHT = {
    en: 'Access denied! You don`t have right to access this!',
    ru: 'Доступ запрещен! У вас нет прав доступа к этому!',
    ua: 'Доступ заборонено! Ви не маєте права доступу до цього!',
    rs: 'Приступ забрањен! Немате право да приступите овоме!',
};


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const jwt_1 = __webpack_require__(16);
const signup_dto_1 = __webpack_require__(17);
const express_1 = __webpack_require__(20);
const mail_service_1 = __webpack_require__(21);
const admin_service_1 = __webpack_require__(24);
const owner_service_1 = __webpack_require__(52);
const jwt_refresh_service_1 = __webpack_require__(54);
const users_service_1 = __webpack_require__(44);
const jwt_refresh_service_2 = __webpack_require__(60);
const jwt_refresh_service_3 = __webpack_require__(61);
const user_model_1 = __webpack_require__(33);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(27);
const user_constants_1 = __webpack_require__(46);
const change_password_dto_1 = __webpack_require__(62);
const uuid_1 = __webpack_require__(53);
const scedule_service_1 = __webpack_require__(55);
const api_exception_1 = __webpack_require__(47);
const jwt_refresh_constants_1 = __webpack_require__(49);
let AuthService = class AuthService {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, ownerService, adminService, userService, mailService, sheduleService, jwtService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.jwtService = jwtService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
    }
    login(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                if (!authHeader) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.authenticateUser(userDto, userAgent, false);
                const tokens = yield this.generateTokens(user, userAgent, true);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    signup(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                if (!authHeader || bearer !== 'Bearer') {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.authenticateUser(userDto, userAgent, true);
                const tokens = yield this.generateTokens(user, userAgent, true);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(response, request, next, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                if (!authHeader || bearer !== 'Bearer') {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const refreshToken = request === null || request === void 0 ? void 0 : request.cookies['refreshToken'];
                const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
                response.clearCookie('refreshToken');
                let logout;
                if (type && type === 'OWNER') {
                    response.clearCookie('user-id');
                    logout = yield this.ownerJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                if (type && type === 'ADMIN') {
                    response.clearCookie('user-id');
                    logout = yield this.adminJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                logout = yield this.userJwtRefreshTokenService.removeToken(decodedToken);
                return response.json({ logout });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    refresh(response, request, next, type, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = request === null || request === void 0 ? void 0 : request.cookies['refreshToken'];
                if (!refreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const user = yield this.validateRefreshToken(refreshToken, type);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                yield this.activateUser(user, response);
                const tokens = yield this.generateTokens(user, userAgent, false);
                response.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    expires: tokens.expireDate,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    activate(request, response, next, activationLink, code, type, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.setIsActivated(type, code, activationLink, request);
                response.redirect(process.env.CLIENT_URL.toString());
                yield this.activateUser(user, response);
                const tokens = yield this.generateTokens(user, userAgent, false);
                if (user instanceof admin_model_1.Admin || user instanceof admin_model_1.Admin) {
                    user.activationLink = (0, uuid_1.v4)();
                    yield user.save();
                }
                response.cookie('refreshToken', tokens.refreshToken, {
                    expires: tokens.expireDate,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                });
                return response.json(Object.assign({}, this.setResponse(tokens, user)));
            }
            catch (error) {
                return next(error);
            }
        });
    }
    setCode(codeDto, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!locale) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.LANGUAGE_NOT_PROVIDED);
            }
            const code = this.generateConfirmCode();
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'OWNER') {
                const email = yield this.ownerService.setConfirmCode(codeDto, code);
                yield this.mailService.sendCode(email, code, locale);
                return email;
            }
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'ADMIN') {
                const email = yield this.adminService.setConfirmCode(codeDto, code);
                yield this.mailService.sendCode(email, code, locale);
                return email;
            }
            const email = yield this.userService.setConfirmCode(codeDto, code);
            yield this.mailService.sendCode(email, code, locale);
            return email;
        });
    }
    resetPassword(resetDto, codeDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'OWNER') {
                return this.ownerService.resetPassword(resetDto);
            }
            if ((codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) && (codeDto === null || codeDto === void 0 ? void 0 : codeDto.type) === 'ADMIN') {
                return this.adminService.resetPassword(resetDto);
            }
            return this.userService.resetPassword(resetDto);
        });
    }
    changePassword(response, request, next, changeDto, userId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type && type === 'OWNER') {
                yield this.ownerService.changePassword(userId, changeDto.password);
            }
            if (type && type === 'ADMIN') {
                yield this.adminService.changePassword(userId, changeDto.password);
            }
            if (!type) {
                yield this.userService.changePassword(userId, changeDto.password);
            }
            return this.logout(response, request, next, type);
        });
    }
    validateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = this.jwtService.verify(token);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateConfirmCode() {
        const confirmCode = Number(('' + Math.random()).substring(2, 10));
        return confirmCode;
    }
    generateAccessToken(payload) {
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }
    setResponse(tokens, user) {
        if (user instanceof owner_model_1.Owner) {
            return {
                accessToken: tokens.accessToken,
                owner: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                type: 'OWNER',
            };
        }
        if (user instanceof admin_model_1.Admin) {
            return {
                accessToken: tokens.accessToken,
                admin: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                },
                type: 'ADMIN',
            };
        }
        return {
            accessToken: tokens.accessToken,
            user: {
                id: user.id,
                name: user.getName(),
                surname: user.getSurname(),
                phoneNumber: user.phoneNumber,
                email: user.email,
                country: user.getCountry(),
                city: user.getCity(),
                postOffice: user.getPostOffice(),
            },
        };
    }
    generateTokens(user, userAgent, setTimeouts) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken;
            let refreshToken;
            let dbToken;
            if (user instanceof user_model_1.User) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken = yield this.userJwtRefreshTokenService.generateRefreshToken({
                    userId: user.id,
                    isActivated: user.getIsActivated(),
                    email: user.email,
                    roles: user.roles,
                });
                dbToken = yield this.userJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)));
            }
            if (user instanceof admin_model_1.Admin) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    userActivationLink: user.activationLink,
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken =
                    yield this.adminJwtRefreshTokenService.generateRefreshToken({
                        isActivated: user.getIsActivated(),
                        email: user.email,
                        adminId: user.id,
                        adminAgent: userAgent,
                        roles: user.roles,
                    });
                dbToken = yield this.adminJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)));
            }
            if (user instanceof owner_model_1.Owner) {
                accessToken = this.generateAccessToken({
                    userId: user.id,
                    isUserActivated: user.getIsActivated(),
                    userActivationLink: user.activationLink,
                    email: user.email,
                    roles: user.roles,
                });
                refreshToken =
                    yield this.ownerJwtRefreshTokenService.generateRefreshToken({
                        isActivated: user.getIsActivated(),
                        email: user.email,
                        ownerId: user.id,
                        ownerAgent: userAgent,
                        roles: user.roles,
                    });
                dbToken = yield this.ownerJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)));
            }
            if (setTimeouts) {
                this.setTimeouts(user, refreshToken);
            }
            const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString('base64');
            const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString('base64');
            return {
                expireDate: dbToken.getExpireDate(),
                refreshToken: encodedRefreshToken,
                accessToken: encodedAccessToken,
            };
        });
    }
    authenticateUser(userDto, userAgent, isNew) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerService.validateOwner({
                email: userDto.email,
                password: userDto.password,
            });
            if (owner instanceof owner_model_1.Owner && !owner.getOwnerAgent()) {
                owner.setOwnerAgent(userAgent);
                yield owner.save();
            }
            if (owner && owner instanceof owner_model_1.Owner) {
                return owner;
            }
            const admin = yield this.adminService.validateAdmin({
                email: userDto.email,
                password: userDto.password,
            });
            if (admin instanceof admin_model_1.Admin && !admin.getAdminAgent()) {
                admin.setAdminAgent(userAgent);
                yield admin.save();
            }
            if (admin && admin instanceof admin_model_1.Admin) {
                return admin;
            }
            if (isNew &&
                'name' in userDto &&
                'surname' in userDto &&
                'phoneNumber' in userDto &&
                'email' in userDto &&
                'password' in userDto &&
                'confirmPassword' in userDto) {
                const user = yield this.userService.initializeUser(userDto);
                return user;
            }
            const user = yield this.userService.validateUser(userDto);
            console.log('done!');
            if (user instanceof user_model_1.User) {
                return user;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
        });
    }
    validateRefreshToken(refreshToken, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            if (type && type === 'OWNER') {
                const ownerData = yield this.ownerJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!ownerData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                const owner = yield this.ownerService.getOwnerById(ownerData.ownerId);
                return owner;
            }
            if (type && type === 'ADMIN') {
                const adminData = yield this.adminJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const admin = yield this.adminService.getAdminById(adminData.adminId);
                return admin;
            }
            const userData = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedToken);
            if (!userData) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const user = yield this.userService.getUserById(userData.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return user;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()]).toString('base64');
        });
    }
    activateUser(user, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                return;
            }
            if (user instanceof owner_model_1.Owner) {
                user.activationLink = (0, uuid_1.v4)();
                yield user.save();
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
            }
            if (user instanceof admin_model_1.Admin) {
                user.activationLink = (0, uuid_1.v4)();
                yield user.save();
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
            }
            if (user instanceof owner_model_1.Owner && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('OWNER', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link);
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/kaze_shop/auth/activate/${link}?code=${code}`);
            }
            if (user instanceof admin_model_1.Admin && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('ADMIN', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link);
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMail(user.email, `${process.env.API_URL}/kaze_shop/auth/activate/${link}?code=${code}`);
            }
            return;
        });
    }
    setIsActivated(type, code, activationLink, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (type && type === 'OWNER') {
                user = yield this.ownerService.findByActivationLink(request['activationLink']);
            }
            if (type && type === 'ADMIN') {
                user = yield this.adminService.findByActivationLink(request['activationLink']);
            }
            if (!user || activationLink !== user.resetToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            if (Number(Date.now()) >= user.getResetTokenExpiration() &&
                code !== user.getActivationCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ACTIVATION_EXPIRED);
            }
            user.setIsActivated(true);
            return user.save();
        });
    }
    setTimeouts(user, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                const refreshData = yield this.userJwtRefreshTokenService.findToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-user-refresh-token,: ${(0, uuid_1.v4)()}`, Number(process.env.USER_DELAY), refreshData.id, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof admin_model_1.Admin) {
                const refreshData = yield this.adminJwtRefreshTokenService.findTokenByToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-admin-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.ADMIN_DELAY), refreshData.id, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof owner_model_1.Owner) {
                const refreshData = yield this.ownerJwtRefreshTokenService.findTokenByToken(refreshToken);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.sheduleService.addTimeoutForTokens(`delete-owner-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.OWNER_DELAY), refreshData.id, this.ownerJwtRefreshTokenService.removeTokenInTime);
            }
        });
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _k : Object, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object, typeof (_o = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _o : Object, String]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], AuthService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object, typeof (_r = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _r : Object, typeof (_s = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _s : Object, String]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _u : Object, typeof (_v = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _v : Object, typeof (_w = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _w : Object, String, String]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], AuthService.prototype, "refresh", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _y : Object, typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object, typeof (_0 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _0 : Object, String, Number, String, String]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], AuthService.prototype, "activate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _2 : Object, typeof (_3 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _3 : Object, typeof (_4 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _4 : Object, typeof (_5 = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _5 : Object, Number, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "changePassword", null);
AuthService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_2.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_2.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_3.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_3.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _c : Object, typeof (_d = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _d : Object, typeof (_e = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _e : Object, typeof (_f = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _f : Object, typeof (_g = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _g : Object, typeof (_h = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _h : Object, typeof (_j = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _j : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 14 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 15 */
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),
/* 16 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/jwt");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignupDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const match_decorator_1 = __webpack_require__(19);
const auth_constants_1 = __webpack_require__(12);
class SignupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'user`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: auth_constants_1.USERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'user`s surname' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: auth_constants_1.SURNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+381056733', description: 'user phone number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: auth_constants_1.PHONE_NUMRER_VALIDATION,
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: auth_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], SignupDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s confirm password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], SignupDto.prototype, "confirmPassword", void 0);
exports.SignupDto = SignupDto;


/***/ }),
/* 18 */
/***/ ((module) => {

"use strict";
module.exports = require("class-validator");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchConstraint = exports.Match = void 0;
const class_validator_1 = __webpack_require__(18);
function Match(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}
exports.Match = Match;
let MatchConstraint = class MatchConstraint {
    validate(value, args) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = args.object[relatedPropertyName];
        return value === relatedValue;
    }
};
MatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'Match' })
], MatchConstraint);
exports.MatchConstraint = MatchConstraint;


/***/ }),
/* 20 */
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const common_1 = __webpack_require__(7);
const mailer_1 = __webpack_require__(22);
const mail_constants_1 = __webpack_require__(23);
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    sendActivationMail(toMail, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.mailerService.sendMail({
                    from: process.env.MAILER_USER,
                    to: toMail,
                    subject: 'Activation of account on ' + process.env.API_URL,
                    text: 'KAZE_SPORT',
                    html: `
        <div style="display:flex; flex-direction:column; justify-content: center; align-items: center;">
        <h1 style="font-style: normal;
                    font-weight: 400;
                    font-size: 22px;
                  line-height: 30px;
                    color: #0B0B0B;">Click the button below to activate admin rights</h1>
        <a href="${link}" style=" display: block;
                 padding: 18px 50px;
                gap: 30px;
          width: 260px;
        height: 60px;
        background: #0B0B0B;
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 30px;
        color: #FFFFFF;
        text-align: center;">ACTIVATE</a>
    </div>
        `,
                });
                console.log('Message sent: %s', info.messageId);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(mail_constants_1.ERORR_WHILE_SENDING_EMAIL);
            }
        });
    }
    sendCode(toMail, code, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const info = yield this.mailerService.sendMail({
                    from: process.env.MAILER_USER,
                    to: toMail,
                    subject: 'Reset password on ' + process.env.CLIENT_URL,
                    text: 'Resetting password',
                    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Новий лист</title><!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if !mso]><!-- --><link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><!--<![endif]--><style type="text/css">#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:15px 25px 15px 25px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }</style></head>
<body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F4F4F4"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f4f4f4"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F4F4F4"><tr class="gmail-fix" height="0" style="border-collapse:collapse"><td style="padding:0;Margin:0"><table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"><tr style="border-collapse:collapse"><td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td>
</tr></table></td>
</tr><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;width:282px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><br></p>
</td></tr></table></td></tr></table><!--[if mso]></td><td style="width:20px"></td>
<td style="width:278px" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;width:278px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="https://viewstripo.email" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif"><br>r</a></p>
</td></tr></table></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></td>
</tr></table><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#7C72DC;background-repeat:repeat;background-position:center top"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;background-color:#151525" bgcolor="#151525" align="center"><table class="es-header-body" cellspacing="0" cellpadding="0" align="center" bgcolor="#121216" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#121216;width:600px"><tr style="border-collapse:collapse"><td align="left" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:580px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;background-color:#f7f7fd" bgcolor="#f7f7fd" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:58px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111">${mail_constants_1.TROUBLE_SIGNING[locale]}</h1>
</td></tr><tr style="border-collapse:collapse"><td bgcolor="#ffffff" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation"><tr style="border-collapse:collapse"><td class="es-m-txt-l" bgcolor="#ffffff" align="left" style="Margin:0;padding-bottom:15px;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">${mail_constants_1.RESETTING[locale]}</p>
</td></tr></table></td></tr></table></td></tr><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:30px;padding-right:30px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:540px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:33px;color:#090909;font-size:22px">${code}</p></td></tr></table></td>
</tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><svg width="130" height="22" viewBox="0 0 130 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.76 17H0.44V0.199999H4.76V6.8H6.92L10.664 0.199999H15.224L10.52 8.48L15.2 17H10.64L6.92 10.16H4.76V17ZM21.4588 13.88C22.3068 13.88 23.2668 13.72 24.3388 13.4V11.96H20.8588C20.6188 11.96 20.4188 12.04 20.2588 12.2C20.0988 12.36 20.0188 12.56 20.0188 12.8V13.04C20.0188 13.28 20.0988 13.48 20.2588 13.64C20.4188 13.8 20.6188 13.88 20.8588 13.88H21.4588ZM17.0188 4.52C19.9468 4.2 22.5868 4.04 24.9388 4.04C26.0268 4.04 26.8988 4.368 27.5547 5.024C28.2108 5.68 28.5388 6.552 28.5388 7.64V17H24.8188L24.5788 15.8C23.8268 16.296 23.0508 16.664 22.2508 16.904C21.4668 17.128 20.8028 17.24 20.2588 17.24H19.4188C18.3308 17.24 17.4588 16.912 16.8027 16.256C16.1468 15.6 15.8188 14.728 15.8188 13.64V12.56C15.8188 11.472 16.1468 10.6 16.8027 9.944C17.4588 9.288 18.3308 8.96 19.4188 8.96H24.3388V8C24.3388 7.76 24.2588 7.56 24.0988 7.4C23.9388 7.24 23.7388 7.16 23.4988 7.16C22.4588 7.16 21.3068 7.208 20.0428 7.304C18.7948 7.4 17.7868 7.472 17.0188 7.52V4.52ZM41.8522 7.52L35.2522 13.76H41.8522V17H29.9722V13.76L36.5722 7.52H29.9722V4.28H41.8522V7.52ZM48.4559 7.04C47.8159 7.04 47.4959 7.36 47.4959 8V9.32H51.5759V8C51.5759 7.36 51.2559 7.04 50.6159 7.04H48.4559ZM55.2959 16.76C52.2079 17.08 49.4079 17.24 46.8959 17.24C45.8079 17.24 44.9359 16.912 44.2799 16.256C43.6239 15.6 43.2959 14.728 43.2959 13.64V7.88C43.2959 6.68 43.6319 5.744 44.3039 5.072C44.9919 4.384 45.9359 4.04 47.1359 4.04H51.9359C53.1359 4.04 54.0719 4.384 54.7439 5.072C55.4319 5.744 55.7759 6.68 55.7759 7.88V12.32H47.4959V13.28C47.4959 13.52 47.5759 13.72 47.7359 13.88C47.8959 14.04 48.0959 14.12 48.3359 14.12C49.9199 14.12 52.2399 14 55.2959 13.76V16.76ZM64.6419 13.64C67.8899 13.88 70.4499 14 72.3219 14C72.5619 14 72.7619 13.92 72.9219 13.76C73.0819 13.6 73.1619 13.4 73.1619 13.16V12.32H68.0019C66.9139 12.32 66.0419 11.992 65.3859 11.336C64.7299 10.68 64.4019 9.808 64.4019 8.72V7.88C64.4019 6.792 64.7299 5.92 65.3859 5.264C66.0419 4.608 66.9139 4.28 68.0019 4.28H76.1619V7.4H69.4419C69.2019 7.4 69.0019 7.48 68.8419 7.64C68.6819 7.8 68.6019 8 68.6019 8.24C68.6019 8.48 68.6819 8.68 68.8419 8.84C69.0019 9 69.2019 9.08 69.4419 9.08H73.7619C74.8499 9.08 75.7219 9.408 76.3779 10.064C77.0339 10.72 77.3619 11.592 77.3619 12.68V13.64C77.3619 14.728 77.0339 15.6 76.3779 16.256C75.7219 16.912 74.8499 17.24 73.7619 17.24C70.9299 17.24 67.8899 17.08 64.6419 16.76V13.64ZM86.1238 7.52C85.2758 7.52 84.3158 7.68 83.2438 8V13.76H86.8438C87.4838 13.76 87.8038 13.44 87.8038 12.8V8.36C87.8038 8.12 87.7238 7.92 87.5638 7.76C87.4038 7.6 87.2038 7.52 86.9638 7.52H86.1238ZM83.2438 17V21.08H79.0438V4.28H82.7638L83.0038 5.48C83.7558 4.984 84.5238 4.624 85.3078 4.4C86.1078 4.16 86.7798 4.04 87.3238 4.04H88.4038C89.4918 4.04 90.3638 4.368 91.0198 5.024C91.6758 5.68 92.0038 6.552 92.0038 7.64V13.16C92.0038 14.36 91.6598 15.304 90.9718 15.992C90.2998 16.664 89.3637 17 88.1638 17H83.2438ZM107.121 13.4C107.121 14.6 106.777 15.544 106.089 16.232C105.417 16.904 104.481 17.24 103.281 17.24H97.7609C96.5609 17.24 95.6169 16.904 94.9289 16.232C94.2569 15.544 93.9209 14.6 93.9209 13.4V7.88C93.9209 6.68 94.2569 5.744 94.9289 5.072C95.6169 4.384 96.5609 4.04 97.7609 4.04H103.281C104.481 4.04 105.417 4.384 106.089 5.072C106.777 5.744 107.121 6.68 107.121 7.88V13.4ZM102.921 8.24C102.921 7.6 102.601 7.28 101.961 7.28H99.0809C98.4409 7.28 98.1209 7.6 98.1209 8.24V13.04C98.1209 13.68 98.4409 14 99.0809 14H101.961C102.601 14 102.921 13.68 102.921 13.04V8.24ZM116.598 7.76C115.59 7.76 114.55 8 113.478 8.48V17H109.278V4.28H112.998L113.238 5.84C114.614 4.64 116.054 4.04 117.558 4.04H118.638V7.76H116.598ZM129.197 17C127.645 17.16 126.125 17.24 124.637 17.24C123.549 17.24 122.677 16.912 122.021 16.256C121.365 15.6 121.037 14.728 121.037 13.64V7.52H119.597V4.28H121.037L121.517 1.4H125.237V4.28H128.237V7.52H125.237V13.04C125.237 13.28 125.317 13.48 125.477 13.64C125.637 13.8 125.837 13.88 126.077 13.88H129.197V17Z" fill="#0B0B0B"/>
</svg>
 </tr></table></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>`,
                });
                console.log('Message sent: %s', info.messageId);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(mail_constants_1.ERORR_WHILE_SENDING_EMAIL);
            }
        });
    }
};
MailService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], MailService);
exports.MailService = MailService;


/***/ }),
/* 22 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RESETTING = exports.TROUBLE_SIGNING = exports.ERORR_WHILE_SENDING_EMAIL = exports.USER_WITH_EMAIL_NOT_FOUND = exports.USER_WITH_THIS_EMAIL_NOT_EXIST = void 0;
exports.USER_WITH_THIS_EMAIL_NOT_EXIST = 'User with this email doesn`t exist';
exports.USER_WITH_EMAIL_NOT_FOUND = 'User with this email not found!';
exports.ERORR_WHILE_SENDING_EMAIL = 'Unexcpected error occur while sending emails';
exports.TROUBLE_SIGNING = {
    en: 'Trouble signing in?',
    ru: 'Проблемы со входом?',
    ua: 'Проблеми з входом?',
    rs: 'Проблеми са пријављивањем?'
};
exports.RESETTING = {
    en: `Resetting your password is easy. Just  enter the code below to reset your password. We'll have you up and running in no time.`,
    ua: `Скинути пароль легко. Просто введіть код нижче, щоб скинути пароль. Ми підготуємо вас до роботи в найкоротші терміни.`,
    ru: `Сбросить пароль легко. Просто введите код ниже, чтобы сбросить пароль. Мы подготовим вас в кратчайшие сроки.`,
    rs: `Ресетовање лозинке је једноставно. Само унесите код испод да бисте ресетовали лозинку. Оспособићемо вас за кратко време.`
};


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const bcrypt = __importStar(__webpack_require__(25));
const admin_constants_1 = __webpack_require__(26);
const admin_model_1 = __webpack_require__(27);
const users_service_1 = __webpack_require__(44);
const roles_service_1 = __webpack_require__(45);
const api_exception_1 = __webpack_require__(47);
let AdminService = class AdminService {
    constructor(adminRepository, userService, roleService) {
        this.adminRepository = adminRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    findAdmin(v, page, adminPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = v.map((param) => {
                return param.toLowerCase();
            });
            const dbAdmins = yield this.adminRepository.findAll({
                include: { all: true },
                offset: (page - 1) * adminPerPage,
                limit: adminPerPage,
                attributes: [
                    'id',
                    'name',
                    'surname',
                    'email',
                    'phoneNumber',
                    'userId',
                    'addContent',
                    'editContent',
                    'editWebsite',
                ],
            });
            if (dbAdmins.length === 0) {
                return [];
            }
            const admins = [];
            dbAdmins.forEach((admin) => {
                const dbArray = [];
                for (const key in admin) {
                    dbArray.push(admin[key]);
                }
                const isContained = params.some((param) => dbArray.indexOf(param) >= 0);
                if (isContained) {
                    admins.push(admin);
                }
            });
            return admins;
        });
    }
    createAdmin(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(dto.email);
            if (!dto.isAdmin) {
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                return JSON.parse(JSON.stringify(user));
            }
            if (user.getIsAdmin()) {
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                const admin = yield this.getAdminByEmail(dto.email);
                admin.setAddContent(dto.addContent);
                admin.setEditContent(dto.editWebSite);
                admin.setEditWebsite(dto.editWebSite);
                yield admin.save();
                return JSON.parse(JSON.stringify(admin));
            }
            const [phoneNumber, email] = yield Promise.all([
                yield this.getAdminByPhoneNumber(dto.phoneNumber),
                yield this.getAdminByEmail(dto.email),
            ]);
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_PHONENUMBER_EXIST);
            }
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_EXIST);
            }
            const [admin] = yield Promise.all([yield this.adminRepository.create(dto)]);
            const role = yield this.roleService.getRoleByValue('ADMIN');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'ADMIN',
                    description: 'User with rights',
                });
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                admin.setIsActivated(user.getIsActivated());
                admin.userId = user.id;
                yield admin.$set('roles', userRole.id);
                admin.roles = [role];
                yield admin.save();
                return JSON.parse(JSON.stringify(admin));
            }
            user.setIsAdmin(dto.isAdmin);
            user.setAddContent(dto.addContent);
            user.setEditContent(dto.editContent);
            user.setEditWebsite(dto.editWebSite);
            yield user.save();
            admin.setIsActivated(user.getIsActivated());
            yield admin.$set('roles', role.id);
            admin.roles = [role];
            admin.userId = user.id;
            yield admin.save();
            return JSON.parse(JSON.stringify(admin));
        });
    }
    updateAdmin(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [admin, user] = yield Promise.all([
                yield this.getAdminByEmail(dto.email),
                yield this.userService.getUserByEmail(dto.email),
            ]);
            if (dto.isAdmin) {
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                admin.userId = user.id;
                admin.setAddContent(dto.addContent);
                admin.setEditContent(dto.editContent);
                admin.setEditWebsite(dto.editWebSite);
                yield Promise.all([yield user.save(), yield admin.save()]);
                return JSON.parse(JSON.stringify(admin));
            }
            user.setIsAdmin(dto.isAdmin);
            user.setAddContent(dto.addContent);
            user.setEditContent(dto.editContent);
            user.setEditWebsite(dto.editWebSite);
            const [deletedAdmin] = yield Promise.all([
                yield this.adminRepository.destroy({
                    where: {
                        userId: user.id,
                        email: dto.email,
                        phoneNumber: dto.phoneNumber,
                    },
                }),
                yield user.save(),
            ]);
            return deletedAdmin;
        });
    }
    findByActivationLink(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = this.adminRepository.findOne({
                where: { activationLink: activationLink },
            });
            if (!admin) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_LINK);
            }
            return admin;
        });
    }
    getAllAdmins(page, adminPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield this.adminRepository.findAll({
                include: { all: true },
                offset: (page - 1) * adminPerPage,
                limit: adminPerPage,
            });
            if (admins.length === 0) {
                return [];
            }
            return admins.map((admin) => {
                return {
                    id: admin.id,
                    name: admin.getName(),
                    surname: admin.getSurname(),
                    email: admin.email,
                    phoneNumber: admin.phoneNumber,
                    userId: admin.userId,
                    addContent: admin.getAddContent(),
                    editContent: admin.getEditContent(),
                    editWebsite: admin.getEditWebSite(),
                };
            });
        });
    }
    getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findByPk(id, {
                include: { all: true },
            });
            if (!admin) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_NOT_FOUND);
            }
            return admin;
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return admin;
        });
    }
    checkAdmin(payload, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!activationLink) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ADMIN_ID_NOT_PROVIDED);
            }
            const admin = yield this.getAdminById(payload.userId);
            if (!admin.getIsActivated()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', admin_constants_1.NOT_ACTIVATED);
            }
            if (admin.activationLink === activationLink &&
                payload.userActivationLink === activationLink) {
                return true;
            }
            return false;
        });
    }
    getAdminByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return admin;
        });
    }
    validateAdmin(adminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(adminDto.email);
            if (!admin) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(adminDto.password, admin.getPassword());
            if (passwordEquals) {
                return admin;
            }
            return false;
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(codeDto.email);
            admin.setConfirmCode(code);
            admin.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield admin.save();
            return admin.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(resetDto.email);
            if (resetDto.email !== admin.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= admin.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== admin.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_CODE);
            }
            yield this.userService.rewritePassword(admin.userId, resetDto.password);
            yield this.rewritePassword(admin, resetDto.password);
            return admin.email;
        });
    }
    changePassword(adminId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminById(adminId);
            yield this.userService.rewritePassword(admin.userId, password);
            return this.rewritePassword(admin, password);
        });
    }
    rewritePassword(admin, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            admin.setNewPasssword(hashedPassword);
            return admin.save();
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _b : Object])
], AdminService);
exports.AdminService = AdminService;


/***/ }),
/* 25 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PHONENUMBER_VALIDATION = exports.INVALID_PHONE_NUMBER = exports.INVALID_LINK = exports.ADMIN_NOT_FOUND = exports.INVALID_EMAIL_OR_PASSWORD = exports.ADMIN_WITH_EMAIL_NOT_FOUND = exports.ADMIN_WITH_EMAIL_DOESNT_EXIST = exports.ADMIN_WITH_PHONENUMBER_EXIST = exports.ADMIN_WITH_EMAIL_EXIST = exports.INVALID_EMAIL = exports.RESET_TIME_EXPIRED = exports.INVALID_CODE = exports.ADMIN_OR_ROLE_NOT_FOUND = exports.ADMIN_ID_NOT_PROVIDED = exports.NOT_ACTIVATED = exports.ACCESS_DENIED = exports.ADMINNAME_VALIDATION = exports.EMAIL_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = void 0;
exports.PASSWORD_VALIDATION = 'Password must be between 6 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.ADMINNAME_VALIDATION = 'ADMIN name must be valid. Invalid ADMINname. Please try again.';
exports.ACCESS_DENIED = {
    en: 'Access denied!',
    ua: 'Доступ заборонено!',
    ru: 'Доступ запрещен!',
    rs: 'Приступ забрањен!'
};
exports.NOT_ACTIVATED = {
    en: 'Access denied, because you are not activated!',
    ua: 'Доступ заборонено, тому що ви не активовані!',
    ru: 'Доступ запрещен, так как вы не активированы!',
    rs: 'Приступ одбијен, јер нисте активирани!'
};
exports.ADMIN_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!'
};
exports.ADMIN_OR_ROLE_NOT_FOUND = {
    en: 'ADMIN or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!'
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!'
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!'
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!'
};
exports.ADMIN_WITH_EMAIL_EXIST = {
    en: 'ADMIN with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог'
};
exports.ADMIN_WITH_PHONENUMBER_EXIST = {
    en: 'ADMIN with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.'
};
exports.ADMIN_WITH_EMAIL_DOESNT_EXIST = {
    en: 'ADMIN with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.'
};
exports.ADMIN_WITH_EMAIL_NOT_FOUND = {
    en: 'ADMIN with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!'
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка'
};
exports.ADMIN_NOT_FOUND = {
    en: 'ADMIN not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! ADMIN doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.PHONENUMBER_VALIDATION = 'Provided phoneNumber is incorrect!';


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Admin = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const class_transformer_1 = __webpack_require__(29);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const user_model_1 = __webpack_require__(33);
const admin_refresh_token_model_1 = __webpack_require__(43);
const product_model_1 = __webpack_require__(35);
let Admin = class Admin extends sequelize_typescript_1.Model {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    getProducts() {
        return this.products;
    }
    setSurname(surname) {
        this.surname = surname;
        return this.surname;
    }
    getPassword() {
        return this.password;
    }
    setNewPasssword(password) {
        this.password = password;
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getIsActivated() {
        return this.isActivated;
    }
    setIsActivated(isActivated) {
        this.isActivated = isActivated;
        return this.isActivated;
    }
    getConfirmCode() {
        return this.confirmCode;
    }
    setConfirmCode(confirnCode) {
        this.confirmCode = confirnCode;
        return this.confirmCode;
    }
    getResetToken() {
        return this.resetToken;
    }
    setResetToken(resetToken) {
        this.resetToken = resetToken;
        return this.resetToken;
    }
    getResetTokenExpiration() {
        return this.resetTokenExpiration;
    }
    setResetTokenExpiration(resetTokenExpiration) {
        this.resetTokenExpiration = resetTokenExpiration;
        return this.resetTokenExpiration;
    }
    getEditWebSite() {
        return this.editWebSite;
    }
    setEditWebsite(editWebSite) {
        this.editWebSite = editWebSite;
        return editWebSite;
    }
    getAddContent() {
        return this.addContent;
    }
    setAddContent(addContent) {
        this.addContent = addContent;
        return this.addContent;
    }
    getEditContent() {
        return this.editContent;
    }
    setEditContent(editContent) {
        this.editContent = editContent;
        return this.editContent;
    }
    getAdminAgent() {
        return this.adminAgent;
    }
    setAdminAgent(adminAgent) {
        this.adminAgent = adminAgent;
        return this.adminAgent;
    }
    getActivationCode() {
        return this.activationCode;
    }
    setActivationCode(activationCode) {
        this.activationCode = activationCode;
        return this.activationCode;
    }
    getAdminRefreshTken() {
        return this.adminRefreshToken;
    }
    getUser() {
        return this.user;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', description: 'admin`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'admin`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], Admin.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'admin`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], Admin.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'admin`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], Admin.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], Admin.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'resetTokenExpiration',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetTokenExpiration',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'admin`s password',
    }),
    (0, class_transformer_1.Exclude)(),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is admin activated',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isActivated',
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'activationLink',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'activationLink',
    }),
    __metadata("design:type", String)
], Admin.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'confirmCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'confirmCode',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "confirmCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'activationCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'activationCode',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "activationCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit website',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editWebSite',
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "editWebSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to add content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'addContent',
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "addContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editContent',
    }),
    __metadata("design:type", Boolean)
], Admin.prototype, "editContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'userId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Admin.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'admin`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: false,
        allowNull: true,
        field: 'userAgent',
    }),
    __metadata("design:type", String)
], Admin.prototype, "adminAgent", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Admin.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => admin_refresh_token_model_1.AdminRefreshToken),
    __metadata("design:type", typeof (_a = typeof admin_refresh_token_model_1.AdminRefreshToken !== "undefined" && admin_refresh_token_model_1.AdminRefreshToken) === "function" ? _a : Object)
], Admin.prototype, "adminRefreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Admin.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_model_1.User),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], Admin.prototype, "user", void 0);
Admin = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'admins' })
], Admin);
exports.Admin = Admin;


/***/ }),
/* 28 */
/***/ ((module) => {

"use strict";
module.exports = require("sequelize-typescript");

/***/ }),
/* 29 */
/***/ ((module) => {

"use strict";
module.exports = require("class-transformer");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Role = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const admin_model_1 = __webpack_require__(27);
const owner_model_1 = __webpack_require__(31);
const user_model_1 = __webpack_require__(33);
const user_roles_model_1 = __webpack_require__(32);
let Role = class Role extends sequelize_typescript_1.Model {
    getUsers() {
        return this.users;
    }
    getAdmins() {
        return this.admins;
    }
    getOwners() {
        return this.owners;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN', description: 'User`s role' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'value',
    }),
    __metadata("design:type", String)
], Role.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin', description: 'Role`s description' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'description',
    }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => admin_model_1.Admin, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Role.prototype, "admins", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => owner_model_1.Owner, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Role.prototype, "owners", void 0);
Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'roles' })
], Role);
exports.Role = Role;


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Owner = void 0;
const swagger_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(29);
const sequelize_typescript_1 = __webpack_require__(28);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const product_model_1 = __webpack_require__(35);
const owner_refresh_token_model_1 = __webpack_require__(42);
let Owner = class Owner extends sequelize_typescript_1.Model {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    setSurname(surname) {
        this.surname = surname;
        return this.surname;
    }
    getPassword() {
        return this.password;
    }
    setNewPasssword(password) {
        this.password = password;
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getIsActivated() {
        return this.isActivated;
    }
    setIsActivated(isActivated) {
        this.isActivated = isActivated;
        return this.isActivated;
    }
    getConfirmCode() {
        return this.confirmCode;
    }
    setConfirmCode(confirnCode) {
        this.confirmCode = confirnCode;
        return this.confirmCode;
    }
    getResetToken() {
        return this.resetToken;
    }
    setResetToken(resetToken) {
        this.resetToken = resetToken;
        return this.resetToken;
    }
    getResetTokenExpiration() {
        return this.resetTokenExpiration;
    }
    setResetTokenExpiration(resetTokenExpiration) {
        this.resetTokenExpiration = resetTokenExpiration;
        return this.resetTokenExpiration;
    }
    getOwnerAgent() {
        return this.ownerAgent;
    }
    setOwnerAgent(ownerAgent) {
        this.ownerAgent = ownerAgent;
        return this.ownerAgent;
    }
    getActivationCode() {
        return this.activationCode;
    }
    setActivationCode(activationCode) {
        this.activationCode = activationCode;
        return this.activationCode;
    }
    getProducts() {
        return this.products;
    }
    getOwnerRefreshToken() {
        return this.ownerRefreshToken;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'owner@gmail.com', description: 'owner`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], Owner.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'owner`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], Owner.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'owner`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], Owner.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'owner`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], Owner.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], Owner.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'resetTokenExpiration',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetTokenExpiration',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'owner`s password',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Owner.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is admin activated',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isActivated',
    }),
    __metadata("design:type", Boolean)
], Owner.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://sdgdgsgsfhd_rh;eh',
        description: 'activationLink',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'activationLink',
    }),
    __metadata("design:type", String)
], Owner.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'confirmCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'confirmCode',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "confirmCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'owner`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: true,
        allowNull: true,
        field: 'ownerAgent',
    }),
    __metadata("design:type", String)
], Owner.prototype, "ownerAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'activationCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'activationCode',
    }),
    __metadata("design:type", Number)
], Owner.prototype, "activationCode", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Owner.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Owner.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => owner_refresh_token_model_1.OwnerRefreshToken),
    __metadata("design:type", typeof (_a = typeof owner_refresh_token_model_1.OwnerRefreshToken !== "undefined" && owner_refresh_token_model_1.OwnerRefreshToken) === "function" ? _a : Object)
], Owner.prototype, "ownerRefreshToken", void 0);
Owner = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'OWNER' })
], Owner);
exports.Owner = Owner;


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRoles = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(27);
const user_model_1 = __webpack_require__(33);
const roles_model_1 = __webpack_require__(30);
let UserRoles = class UserRoles extends sequelize_typescript_1.Model {
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], UserRoles.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'roleId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => roles_model_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'roleId',
    }),
    __metadata("design:type", Number)
], UserRoles.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'userId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], UserRoles.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'adminId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], UserRoles.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'ownerId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'ownerId',
    }),
    __metadata("design:type", Number)
], UserRoles.prototype, "ownerId", void 0);
UserRoles = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user_roles', createdAt: false, updatedAt: false })
], UserRoles);
exports.UserRoles = UserRoles;


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const cart_model_1 = __webpack_require__(34);
const admin_model_1 = __webpack_require__(27);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const user_refresh_token_model_1 = __webpack_require__(41);
let User = class User extends sequelize_typescript_1.Model {
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    setSurname(surname) {
        this.surname = surname;
        return this.surname;
    }
    getPassword() {
        return this.password;
    }
    setNewPasssword(password) {
        this.password = password;
        return this.password;
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getIsActivated() {
        return this.isActivated;
    }
    setIsActivated(isActivated) {
        this.isActivated = isActivated;
        return this.isActivated;
    }
    getConfirmCode() {
        return this.confirmCode;
    }
    setConfirmCode(confirnCode) {
        this.confirmCode = confirnCode;
        return this.confirmCode;
    }
    getResetToken() {
        return this.resetToken;
    }
    setResetToken(resetToken) {
        this.resetToken = resetToken;
        return this.resetToken;
    }
    getResetTokenExpiration() {
        return this.resetTokenExpiration;
    }
    setResetTokenExpiration(resetTokenExpiration) {
        this.resetTokenExpiration = resetTokenExpiration;
        return this.resetTokenExpiration;
    }
    getCity() {
        return this.city;
    }
    setCity(city) {
        this.city = city;
        return this.city;
    }
    getCountry() {
        return this.country;
    }
    setCountry(country) {
        this.country = country;
        return this.country;
    }
    getPostOffice() {
        return this.postOffice;
    }
    setPostOffice(postOffice) {
        this.postOffice = postOffice;
        return this.postOffice;
    }
    getIsAdmin() {
        return this.isAdmin;
    }
    setIsAdmin(isAdmin) {
        this.isAdmin = isAdmin;
        return this.isAdmin;
    }
    getEditWebSite() {
        return this.editWebSite;
    }
    setEditWebsite(editWebSite) {
        this.editWebSite = editWebSite;
        return editWebSite;
    }
    getAddContent() {
        return this.addContent;
    }
    setAddContent(addContent) {
        this.addContent = addContent;
        return this.addContent;
    }
    getEditContent() {
        return this.editContent;
    }
    setEditContent(editContent) {
        this.editContent = editContent;
        return this.editContent;
    }
    getCarts() {
        return this.carts;
    }
    getUserRefreshToken() {
        return this.userRefreshToken;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'user`s Name' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'user`s surname' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], User.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'user`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'etrhg45ty5yeewt4t4665y', description: 'resetToken' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetToken',
    }),
    __metadata("design:type", String)
], User.prototype, "resetToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'resetTokenExpiration',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'resetTokenExpiration',
    }),
    __metadata("design:type", Number)
], User.prototype, "resetTokenExpiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'password',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'true',
        description: 'Is user banned or not?',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        defaultValue: 'false',
        field: 'banned',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Bad behaviour',
        description: 'Reason of banning a user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'banReason',
    }),
    __metadata("design:type", String)
], User.prototype, "banReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '56733423',
        description: 'confirmCode',
    }),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'confirmCode',
    }),
    __metadata("design:type", Number)
], User.prototype, "confirmCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is user activated',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isActivated',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ukraine',
        description: 'country',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'country',
    }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'city',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'city',
    }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'postOffice',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'postOffice',
    }),
    __metadata("design:type", String)
], User.prototype, "postOffice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Is user Admin',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'isAdmin',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit website',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editWebSite',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "editWebSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to add content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'addContent',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "addContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'True',
        description: 'Right to edit content',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        unique: false,
        allowNull: true,
        field: 'editContent',
    }),
    __metadata("design:type", Boolean)
], User.prototype, "editContent", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: true,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], User.prototype, "adminId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_refresh_token_model_1.UserRefreshToken),
    __metadata("design:type", typeof (_a = typeof user_refresh_token_model_1.UserRefreshToken !== "undefined" && user_refresh_token_model_1.UserRefreshToken) === "function" ? _a : Object)
], User.prototype, "userRefreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], User.prototype, "carts", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], User);
exports.User = User;


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cart = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const user_model_1 = __webpack_require__(33);
const cart_item_model_1 = __webpack_require__(36);
let Cart = class Cart extends sequelize_typescript_1.Model {
    getCartStatus() {
        return this.cartStatus;
    }
    setCartStatus(cartStatus) {
        this.cartStatus = cartStatus;
        return this.cartStatus;
    }
    getProducts() {
        return this.products;
    }
    getCartProducts() {
        return this.cartProducts;
    }
    getUser() {
        return this.user;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Open', 'CheckedOut'),
        unique: false,
        field: 'cartStatus',
    }),
    __metadata("design:type", String)
], Cart.prototype, "cartStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Cart.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => cart_item_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_item_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "cartProducts", void 0);
Cart = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'carts' })
], Cart);
exports.Cart = Cart;


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(27);
let Product = class Product extends sequelize_typescript_1.Model {
    getCategories() {
        return this.categories;
    }
    setCategories(categories) {
        this.categories = categories;
        return this.categories;
    }
    getCarts() {
        return this.carts;
    }
    getAuthor() {
        return this.owner;
    }
    getOwnerId() {
        return this.ownerId;
    }
    setOwnerId(ownerId) {
        this.ownerId = ownerId;
        return this.ownerId;
    }
    getAdminId() {
        return this.adminId;
    }
    setAdminId(adminId) {
        this.adminId = adminId;
        return adminId;
    }
    getOrders() {
        return this.orders;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'title',
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'description',
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'price',
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        unique: false,
        allowNull: false,
        field: 'images',
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'sizeChart',
    }),
    __metadata("design:type", String)
], Product.prototype, "sizeChartImage", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL')),
        unique: false,
        allowNull: true,
        field: 'sizes',
    }),
    __metadata("design:type", Array)
], Product.prototype, "sizes", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        unique: false,
        allowNull: true,
        field: 'colours',
    }),
    __metadata("design:type", Array)
], Product.prototype, "colours", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'quantity',
    }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "adminId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: true, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", typeof (_a = typeof owner_model_1.Owner !== "undefined" && owner_model_1.Owner) === "function" ? _a : Object)
], Product.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", typeof (_b = typeof admin_model_1.Admin !== "undefined" && admin_model_1.Admin) === "function" ? _b : Object)
], Product.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_model_1.Category, () => product_categories_model_1.ProductCategories),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => cart_model_1.Cart, () => cart_item_model_1.CartProduct),
    __metadata("design:type", Array)
], Product.prototype, "carts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => order_model_1.Order, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'products' })
], Product);
exports.Product = Product;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartProduct = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const cart_model_1 = __webpack_require__(34);
let CartProduct = class CartProduct extends sequelize_typescript_1.Model {
    getProduct() {
        return this.product;
    }
    getCart() {
        return this.cart;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "productId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => cart_model_1.Cart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'cartId',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "cartId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'quantity',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_model_1.Cart),
    __metadata("design:type", typeof (_a = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _a : Object)
], CartProduct.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], CartProduct.prototype, "product", void 0);
CartProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'cartproduct' })
], CartProduct);
exports.CartProduct = CartProduct;


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const user_model_1 = __webpack_require__(33);
const order_product_model_1 = __webpack_require__(38);
let Order = class Order extends sequelize_typescript_1.Model {
    getUser() {
        return this.user;
    }
    getOrderStatus() {
        return this.orderStatus;
    }
    setOrderStatus(orderStatus) {
        this.orderStatus = orderStatus;
        return this.orderStatus;
    }
    getOrderProducts() {
        return this.orderProducts;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Canceled', 'Submitted', 'Completed', 'Processing'),
        unique: false,
        field: 'orderStatus',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'totalPrice',
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "orderProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'orders' })
], Order);
exports.Order = Order;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderProduct = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const order_model_1 = __webpack_require__(37);
let OrderProduct = class OrderProduct extends sequelize_typescript_1.Model {
    getProduct() {
        return this.product;
    }
    getOrder() {
        return this.order;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'price',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "price", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        allowNull: false,
        field: 'orderId',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "orderId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'quantity',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => order_model_1.Order),
    __metadata("design:type", typeof (_a = typeof order_model_1.Order !== "undefined" && order_model_1.Order) === "function" ? _a : Object)
], OrderProduct.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", typeof (_b = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _b : Object)
], OrderProduct.prototype, "product", void 0);
OrderProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'orderproduct' })
], OrderProduct);
exports.OrderProduct = OrderProduct;


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const product_categories_model_1 = __webpack_require__(40);
let Category = class Category extends sequelize_typescript_1.Model {
    getProducts() {
        return this.products;
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        field: 'id',
    }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: false, allowNull: false }),
    __metadata("design:type", String)
], Category.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'description',
    }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => product_categories_model_1.ProductCategories),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'categories' })
], Category);
exports.Category = Category;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductCategories = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const product_model_1 = __webpack_require__(35);
const category_model_1 = __webpack_require__(39);
let ProductCategories = class ProductCategories extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], ProductCategories.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_model_1.Category),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'categoryId',
    }),
    __metadata("design:type", Number)
], ProductCategories.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], ProductCategories.prototype, "productId", void 0);
ProductCategories = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'product_categories', createdAt: false, updatedAt: false })
], ProductCategories);
exports.ProductCategories = ProductCategories;


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRefreshToken = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const user_model_1 = __webpack_require__(33);
let UserRefreshToken = class UserRefreshToken extends sequelize_typescript_1.Model {
    getExpireDate() {
        return this.expireDate;
    }
    setExpireDate(expireDate) {
        this.expireDate = expireDate;
        return this.expireDate;
    }
    getuserId() {
        return this.userId;
    }
    setuserId(userId) {
        this.userId = userId;
        return this.userId;
    }
    getUser() {
        return this.user;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], UserRefreshToken.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJuilbgghbGciOiJIUzihnuohlI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
        description: 'user`s refresh token',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2500),
        unique: true,
        allowNull: false,
        field: 'userRefreshToken',
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "userRefreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'userId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], UserRefreshToken.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '86400000', description: 'expireDate' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'expireDate',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserRefreshToken.prototype, "expireDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], UserRefreshToken.prototype, "user", void 0);
UserRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'user refresh tokens' })
], UserRefreshToken);
exports.UserRefreshToken = UserRefreshToken;


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerRefreshToken = void 0;
const sequelize_typescript_1 = __webpack_require__(28);
const swagger_1 = __webpack_require__(5);
const owner_model_1 = __webpack_require__(31);
let OwnerRefreshToken = class OwnerRefreshToken extends sequelize_typescript_1.Model {
    getExpireDate() {
        return this.expireDate;
    }
    setExpireDate(expireDate) {
        this.expireDate = expireDate;
        return this.expireDate;
    }
    getownerId() {
        return this.ownerId;
    }
    setownerId(ownerId) {
        this.ownerId = ownerId;
        return this.ownerId;
    }
    getownerAgent() {
        return this.ownerAgent;
    }
    setownerAgent(ownerAgent) {
        this.ownerAgent = ownerAgent;
        return this.ownerAgent;
    }
    getOwner() {
        return this.owner;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], OwnerRefreshToken.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+06614568945', description: 'owner`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], OwnerRefreshToken.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'owner@gmail.com', description: 'owner`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], OwnerRefreshToken.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJIUjpzI1NiIsInR5cCI6IdfuthojpkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
        description: 'owner`s refresh token',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2500),
        unique: true,
        allowNull: false,
        field: 'ownerRefreshToken',
    }),
    __metadata("design:type", String)
], OwnerRefreshToken.prototype, "ownerRefreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'ownerId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'ownerId',
    }),
    __metadata("design:type", Number)
], OwnerRefreshToken.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'owner`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: true,
        allowNull: false,
        field: 'ownerAgent',
    }),
    __metadata("design:type", String)
], OwnerRefreshToken.prototype, "ownerAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '86400000', description: 'expireDate' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'expireDate',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], OwnerRefreshToken.prototype, "expireDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", typeof (_b = typeof owner_model_1.Owner !== "undefined" && owner_model_1.Owner) === "function" ? _b : Object)
], OwnerRefreshToken.prototype, "owner", void 0);
OwnerRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'owner refresh token' })
], OwnerRefreshToken);
exports.OwnerRefreshToken = OwnerRefreshToken;


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminRefreshToken = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(28);
const admin_model_1 = __webpack_require__(27);
let AdminRefreshToken = class AdminRefreshToken extends sequelize_typescript_1.Model {
    getExpireDate() {
        return this.expireDate;
    }
    setExpireDate(expireDate) {
        this.expireDate = expireDate;
        return this.expireDate;
    }
    getAdminAgent() {
        return this.adminAgent;
    }
    setAdminAgent(adminAgent) {
        this.adminAgent = adminAgent;
        return this.adminAgent;
    }
    getAdmin() {
        return this.admin;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id',
    }),
    __metadata("design:type", Number)
], AdminRefreshToken.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@gmail.com', description: 'admin`s email' }),
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+251912345678', description: 'admin`s phoneNumber' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'phoneNumber',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'eyJhbGciOiJrdyIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWN0aXZhdGVkIjpmYWxzZSwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiJzaW1wbGUgdXNlciIsInJpZ2h0MSI6ZmFsc2UsInJpZ2h0MiI6ZmFsc2UsImNyZWF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsInVwZGF0ZWRBdCI6IjIwMjMtMDEtMTZUMTA6NDE6MjguOTY5WiIsIlVzZXJSb2xlcyI6eyJpZCI6MSwicm9sZUlkIjoxLCJ1c2VySWQiOjEsImFkbWluSWQiOm51bGx9fV0sImlhdCI6MTY3Mzg2NTcxNiwiZXhwIjoxNjczODY5MzE2fQ.cx0YqrXwrvrL8wNMsnTiitL632ORCOxYUJuNQ-g4lOc',
        description: 'admin`s refresh token',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(2500),
        unique: true,
        allowNull: false,
        field: 'adminRefreshToken',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "adminRefreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'adminId' }),
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], AdminRefreshToken.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
        description: 'admin`s agent',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.CHAR(350),
        unique: false,
        allowNull: false,
        field: 'userAgent',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "adminAgent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '86400000', description: 'expireDate' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        field: 'expireDate',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AdminRefreshToken.prototype, "expireDate", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", typeof (_b = typeof admin_model_1.Admin !== "undefined" && admin_model_1.Admin) === "function" ? _b : Object)
], AdminRefreshToken.prototype, "admin", void 0);
AdminRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Admin refresh tokens' })
], AdminRefreshToken);
exports.AdminRefreshToken = AdminRefreshToken;


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const roles_service_1 = __webpack_require__(45);
const user_constants_1 = __webpack_require__(46);
const user_model_1 = __webpack_require__(33);
const bcrypt = __importStar(__webpack_require__(25));
const api_exception_1 = __webpack_require__(47);
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    findUser(v, page, userPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = v.map((param) => {
                return param.toLowerCase();
            });
            const dbUsers = yield this.userRepository.findAll({
                include: { all: true },
                offset: (page - 1) * userPerPage,
                limit: userPerPage,
                attributes: [
                    'id',
                    'name',
                    'surname',
                    'email',
                    'phoneNumber',
                    'isAdmin',
                    'addContent',
                    'editContent',
                    'editWebsite',
                ],
            });
            if (dbUsers.length === 0) {
                return [];
            }
            const users = [];
            dbUsers.forEach((user) => {
                const dbArray = [];
                for (const key in user) {
                    dbArray.push(user[key]);
                }
                const isContained = params.some((param) => dbArray.indexOf(param) >= 0);
                if (isContained) {
                    users.push(user);
                }
            });
            return users;
        });
    }
    initializeUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [email, phoneNumber] = yield Promise.all([
                yield this.getUserByEmail(userDto.email),
                yield this.getUserByPhoneNumber(userDto.phoneNumber),
            ]);
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_EXIST);
            }
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_PHONENUMBER_EXIST);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(userDto.password, salt);
            const user = yield this.createUser(Object.assign(Object.assign({}, userDto), { password: hashedPassword }));
            return user.save();
        });
    }
    updateUser(userDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            user.setName(userDto.name);
            user.setSurname(userDto.surname);
            user.setCity(userDto.city);
            user.setCountry(userDto.country);
            user.setPostOffice(userDto.postOffice);
            return user.save();
        });
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create(dto);
            user.setIsActivated(false);
            user.setIsAdmin(false);
            user.setAddContent(false);
            user.setEditWebsite(false);
            user.setEditContent(false);
            const role = yield this.roleService.getRoleByValue('USER');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'USER',
                    description: 'simple user',
                });
                yield user.$set('roles', userRole.id);
                user.roles = [role];
                yield user.save();
                return user;
            }
            yield user.$set('roles', role.id);
            user.roles = [role];
            yield user.save();
            return user;
        });
    }
    getAllUsers(page, userPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll({
                include: { all: true },
                offset: (page - 1) * userPerPage,
                limit: userPerPage,
            });
            if (users.length === 0) {
                return [];
            }
            return users.map((user) => {
                return {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    isAdmin: user.getIsAdmin(),
                    addContent: user.getAddContent(),
                    editContent: user.getEditContent(),
                    editWebsite: user.getEditWebSite(),
                };
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(id, {
                include: { all: true },
            });
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return user;
        });
    }
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return user;
        });
    }
    addRole(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user, role] = yield Promise.all([
                yield this.userRepository.findByPk(dto.userId),
                yield this.roleService.getRoleByValue(dto.value),
            ]);
            if (role && user) {
                yield user.$add('role', role.id);
                return dto;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_OR_ROLE_NOT_FOUND);
        });
    }
    banUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(dto.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            user.banned = true;
            user.banReason = dto.banReason;
            yield user.save();
            return user;
        });
    }
    validateUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(userDto.email);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
            }
            console.log('not done');
            const passwordEquals = yield bcrypt.compare(userDto.password, user.getPassword());
            console.log('done');
            if (passwordEquals) {
                return user;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(codeDto.email);
            user.setConfirmCode(code);
            user.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield user.save();
            return user.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(resetDto.email);
            if (resetDto.email !== user.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= user.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== user.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_CODE);
            }
            yield this.rewritePassword(user.id, resetDto.password);
            return user.email;
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return this.rewritePassword(user.id, password);
        });
    }
    rewritePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            user.setNewPasssword(hashedPassword);
            return user.save();
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const roles_model_1 = __webpack_require__(30);
let RolesService = class RolesService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    createRole(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.create(dto);
            return role;
        });
    }
    getRoleByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield this.roleRepository.findOne({ where: { value: value } });
            return role;
        });
    }
};
RolesService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(roles_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], RolesService);
exports.RolesService = RolesService;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INVALID_PHONE_NUMBER = exports.INVALID_LINK = exports.USER_NOT_FOUND = exports.INVALID_EMAIL_OR_PASSWORD = exports.USER_WITH_EMAIL_NOT_FOUND = exports.USER_WITH_EMAIL_DOESNT_EXIST = exports.USER_WITH_PHONENUMBER_EXIST = exports.USER_WITH_EMAIL_EXIST = exports.INVALID_EMAIL = exports.RESET_TIME_EXPIRED = exports.INVALID_CODE = exports.USER_OR_ROLE_NOT_FOUND = exports.SURNAME_VALIDATION = exports.USERNAME_VALIDATION = exports.EMAIL_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = void 0;
exports.PASSWORD_VALIDATION = 'Password must be between 6 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.USERNAME_VALIDATION = 'User name must be valid. Invalid username. Please try again.';
exports.SURNAME_VALIDATION = 'User surname must be valid. Invalid username. Please try again.';
exports.USER_OR_ROLE_NOT_FOUND = {
    en: 'User or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!'
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!'
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!'
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!'
};
exports.USER_WITH_EMAIL_EXIST = {
    en: 'User with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог'
};
exports.USER_WITH_PHONENUMBER_EXIST = {
    en: 'User with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.'
};
exports.USER_WITH_EMAIL_DOESNT_EXIST = {
    en: 'User with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.'
};
exports.USER_WITH_EMAIL_NOT_FOUND = {
    en: 'User with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!'
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка'
};
exports.USER_NOT_FOUND = {
    en: 'User not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! User doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiException = void 0;
const common_1 = __webpack_require__(7);
const admin_constants_1 = __webpack_require__(26);
const owner_constants_1 = __webpack_require__(48);
const jwt_refresh_constants_1 = __webpack_require__(49);
const jwt_refresh_constants_2 = __webpack_require__(50);
const jwt_refresh_constants_3 = __webpack_require__(51);
const user_constants_1 = __webpack_require__(46);
class ApiException extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = [
            { locale: 'ua', error: errors.ua },
            { locale: 'ru', error: errors.ru },
            { locale: 'en', error: errors.en },
            { locale: 'rs', error: errors.rs },
        ];
    }
    static BadRequest(type) {
        if (type = 'USER_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_EXIST);
        }
        if (type = 'USER_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'USER_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'ADMIN_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_EXIST);
        }
        if (type = 'ADMIN_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'ADMIN_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'OWNER_WITH_EMAIL_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_EXIST);
        }
        if (type = 'OWNER_WITH_PHONENUMBER_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_PHONENUMBER_EXIST);
        }
        if (type = 'OWNER_WITH_EMAIL_DOESNT_EXIST') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_DOESNT_EXIST);
        }
        if (type = 'INVALID_EMAIL') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_EMAIL);
        }
        if (type = 'RESET_TIME_EXPIRED') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.RESET_TIME_EXPIRED);
        }
        if (type = 'INVALID_CODE') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_CODE);
        }
        if (type = 'TOKEN_INVALID') {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_3.TOKEN_INVALID);
        }
    }
    static UserNotFound(type) {
        if (type = 'USER_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
        }
        if (type = 'USER_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_OR_ROLE_NOT_FOUND);
        }
        if (type = 'TOKEN_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_3.TOKEN_NOT_FOUND);
        }
        if (type = 'OWNER_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_2.OWNER_NOT_FOUND);
        }
        if (type = 'ADMIN_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
        }
        if (type = 'OWNER_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_OR_ROLE_NOT_FOUND);
        }
        if (type = 'ADMIN_OR_ROLE_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_OR_ROLE_NOT_FOUND);
        }
    }
    static UnauthorizedError(type) {
        if (type = 'INVALID_EMAIL_OR_PASSWORD') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
        }
        if (type = 'OWNER_ID_NOT_PROVIDED') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', owner_constants_1.OWNER_ID_NOT_PROVIDED);
        }
        if (type = 'ADMIN_ID_NOT_FOUND') {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ADMIN_ID_NOT_PROVIDED);
        }
    }
    static InternalServerError(type) {
        if (type = 'ERROR_WHILE_SIGNING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SIGNING_TOKEN);
        }
        if (type = 'ERROR_WHILE_VALIDATING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_VALIDATING_TOKEN);
        }
        if (type = 'ERROR_WHILE_SAVING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SAVING_TOKEN);
        }
        if (type = 'ERROR_WHILE_REMOVING_TOKEN') {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_REMOVING_TOKEN);
        }
    }
    static ForbiddenException(type) {
        if (type = 'NOT_ACTIVATED') {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.NOT_ACTIVATED);
        }
        if (type = 'ACCESS_DENIED') {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.ACCESS_DENIED);
        }
    }
}
exports.ApiException = ApiException;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.INVALID_PHONE_NUMBER = exports.INVALID_LINK = exports.OWNER_NOT_FOUND = exports.INVALID_EMAIL_OR_PASSWORD = exports.OWNER_WITH_EMAIL_NOT_FOUND = exports.OWNER_WITH_EMAIL_DOESNT_EXIST = exports.OWNER_WITH_PHONENUMBER_EXIST = exports.OWNER_WITH_EMAIL_EXIST = exports.INVALID_EMAIL = exports.RESET_TIME_EXPIRED = exports.INVALID_CODE = exports.OWNER_OR_ROLE_NOT_FOUND = exports.OWNER_ID_NOT_PROVIDED = exports.NOT_ACTIVATED = exports.ACCESS_DENIED = exports.OWNERNAME_VALIDATION = exports.PHONE_NUMRER_VALIDATION = exports.PASSWORD_VALIDATION = exports.PHONENUMBER_VALIDATION = exports.EMAIL_VALIDATION = void 0;
exports.EMAIL_VALIDATION = 'Email must be valid. Invalid email address. Please try again.';
exports.PHONENUMBER_VALIDATION = 'Phone number must be valid. Invalid Phone number. Please try again.';
exports.PASSWORD_VALIDATION = 'Password must be between 6 and 64 characters long with 1 special character and capital character each';
exports.PHONE_NUMRER_VALIDATION = 'Phone number must be 13 characters long. Invalid phone number. Please try again.';
exports.OWNERNAME_VALIDATION = 'OWNER name must be valid. Invalid OWNERname. Please try again.';
exports.ACCESS_DENIED = {
    en: 'Access denied!',
    ua: 'Доступ заборонено!',
    ru: 'Доступ запрещен!',
    rs: 'Приступ забрањен!'
};
exports.NOT_ACTIVATED = {
    en: 'Access denied, because you are not activated!',
    ua: 'Доступ заборонено, тому що ви не активовані!',
    ru: 'Доступ запрещен, так как вы не активированы!',
    rs: 'Приступ одбијен, јер нисте активирани!'
};
exports.OWNER_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!'
};
exports.OWNER_OR_ROLE_NOT_FOUND = {
    en: 'OWNER or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!'
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!'
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!'
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!'
};
exports.OWNER_WITH_EMAIL_EXIST = {
    en: 'OWNER with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог'
};
exports.OWNER_WITH_PHONENUMBER_EXIST = {
    en: 'OWNER with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.'
};
exports.OWNER_WITH_EMAIL_DOESNT_EXIST = {
    en: 'OWNER with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.'
};
exports.OWNER_WITH_EMAIL_NOT_FOUND = {
    en: 'OWNER with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!'
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка'
};
exports.OWNER_NOT_FOUND = {
    en: 'OWNER not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! OWNER doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.ADMIN_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!'
};
exports.ADMIN_NOT_FOUND = {
    en: 'Admin not found!',
    ua: 'Адміністратора не знайдено!',
    ru: 'Админ не найден!',
    rs: 'Администратор није пронађен!'
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!'
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!'
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!'
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!'
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!'
};


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.OWNER_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!'
};
exports.OWNER_NOT_FOUND = {
    en: 'Owner not found!',
    ua: 'Власника не знайдено!',
    ru: 'Хозяин не найден!',
    rs: 'Власник није пронађен!'
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!'
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!'
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!'
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!'
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!'
};


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.USER_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!'
};
exports.USER_NOT_FOUND = {
    en: 'User not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!'
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!'
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!'
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!'
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!'
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!'
};


/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const owner_constants_1 = __webpack_require__(48);
const owner_model_1 = __webpack_require__(31);
const roles_service_1 = __webpack_require__(45);
const bcrypt = __importStar(__webpack_require__(25));
const uuid_1 = __webpack_require__(53);
const roles_model_1 = __webpack_require__(30);
const api_exception_1 = __webpack_require__(47);
let OwnerService = class OwnerService {
    constructor(ownerRepository, roleService) {
        this.ownerRepository = ownerRepository;
        this.roleService = roleService;
    }
    static creatingOwner(OWNER) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOwners = yield owner_model_1.Owner.findAll();
            console.log(existingOwners);
            if (existingOwners.length > 0) {
                return;
            }
            console.log('Creating');
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS || 10);
            const hashedPassword = yield bcrypt.hash(OWNER[4], salt);
            const ownerDto = {
                name: OWNER[0],
                surname: OWNER[1],
                phoneNumber: OWNER[2],
                email: OWNER[3],
                password: hashedPassword,
                activationLink: (0, uuid_1.v4)(),
            };
            const owner = yield owner_model_1.Owner.create(ownerDto);
            owner.setIsActivated(false);
            const role = yield roles_model_1.Role.findOne({ where: { value: 'OWNER' } });
            if (!role) {
                const ownerRole = yield roles_model_1.Role.create({
                    value: 'OWNER',
                    description: 'Owner owns website',
                });
                yield owner.$set('roles', ownerRole.id);
                owner.roles = [ownerRole];
                yield owner.save();
                return owner;
            }
            yield owner.$set('roles', role.id);
            owner.roles = [role];
            yield owner.save();
            return owner;
        });
    }
    createOwner(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [phoneNumber, email] = yield Promise.all([
                yield this.getOwnerByPhoneNumber(dto.phoneNumber),
                yield this.getOwnerByEmail(dto.email),
            ]);
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_PHONENUMBER_EXIST);
            }
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_EXIST);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(dto.password, salt);
            const owner = yield this.create(Object.assign(Object.assign({}, dto), { password: hashedPassword, activationLink: (0, uuid_1.v4)() }));
            return owner.save();
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.create(dto);
            owner.setIsActivated(false);
            const role = yield this.roleService.getRoleByValue('OWNER');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'OWNER',
                    description: 'Owner owns website',
                });
                yield owner.$set('roles', userRole.id);
                owner.roles = [userRole];
                yield owner.save();
                return owner;
            }
            yield owner.$set('roles', role.id);
            owner.roles = [role];
            yield owner.save();
            return owner;
        });
    }
    findByActivationLink(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = this.ownerRepository.findOne({
                where: { activationLink: activationLink },
            });
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_LINK);
            }
            return owner;
        });
    }
    getOwnerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findByPk(id, {
                include: { all: true },
            });
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
            }
            return owner;
        });
    }
    getOwnerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return owner;
        });
    }
    getOwnerByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return owner;
        });
    }
    validateOwner(ownerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(ownerDto.email);
            if (!owner) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(ownerDto.password, owner.getPassword());
            if (passwordEquals) {
                return owner;
            }
            return false;
        });
    }
    checkOwner(payload, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!activationLink) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', owner_constants_1.OWNER_ID_NOT_PROVIDED);
            }
            const owner = yield this.getOwnerById(payload.userId);
            if (owner instanceof owner_model_1.Owner && !owner.getIsActivated()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.NOT_ACTIVATED);
            }
            if (owner instanceof owner_model_1.Owner && owner.activationLink === activationLink) {
                return true;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.ACCESS_DENIED);
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(codeDto.email);
            owner.setConfirmCode(code);
            owner.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield owner.save();
            return owner.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(resetDto.email);
            if (resetDto.email !== owner.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= owner.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== owner.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_CODE);
            }
            yield this.rewritePassword(owner, resetDto.password);
            return owner.email;
        });
    }
    changePassword(ownerId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerById(ownerId);
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
            }
            return this.rewritePassword(owner, password);
        });
    }
    rewritePassword(owner, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            owner.setNewPasssword(hashedPassword);
            return owner.save();
        });
    }
};
OwnerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _a : Object])
], OwnerService);
exports.OwnerService = OwnerService;


/***/ }),
/* 53 */
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserJwtRefreshTokenService = void 0;
const common_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(16);
const jwt_refresh_constants_1 = __webpack_require__(51);
const user_refresh_token_model_1 = __webpack_require__(41);
const users_service_1 = __webpack_require__(44);
const sequelize_1 = __webpack_require__(8);
const scedule_service_1 = __webpack_require__(55);
const api_exception_1 = __webpack_require__(47);
let UserJwtRefreshTokenService = class UserJwtRefreshTokenService {
    constructor(jwtService, userService, sheduleService, userRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.sheduleService = sheduleService;
        this.userRefreshTokenRepository = userRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRefreshToken = this.jwtService.sign(payload);
                return userRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = this.jwtService.verify(userRefreshToken);
                if (!userData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return userData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(userId, userRefreshToken, email, userAgent, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.USER_NOT_FOUND);
                }
                const tokenData = yield this.userRefreshTokenRepository.findOne({
                    where: { userId: userId },
                });
                if (tokenData) {
                    tokenData.userRefreshToken = userRefreshToken;
                    return tokenData.save();
                }
                const token = yield this.userRefreshTokenRepository.create({
                    userRefreshToken: userRefreshToken,
                    userId: userId,
                    email: email,
                    userAgent: userAgent ||
                        'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
                });
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    removeToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(userRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.userRefreshTokenRepository.destroy({
                    where: { userRefreshToken: userRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield user_refresh_token_model_1.UserRefreshToken.findOne({
                where: { userRefreshToken: userRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    removeTokenInTime(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.userRefreshTokenRepository.findOne({
                where: {
                    userRefreshToken: userRefreshToken,
                },
            });
            if (!token) {
                return false;
            }
            return this.userRefreshTokenRepository.destroy({
                where: { userRefreshToken: userRefreshToken },
            });
        });
    }
};
UserJwtRefreshTokenService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(3, (0, sequelize_1.InjectModel)(user_refresh_token_model_1.UserRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _c : Object, Object])
], UserJwtRefreshTokenService);
exports.UserJwtRefreshTokenService = UserJwtRefreshTokenService;


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const common_1 = __webpack_require__(7);
const event_emitter_1 = __webpack_require__(56);
const schedule_1 = __webpack_require__(57);
const cron_1 = __webpack_require__(58);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(59);
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
    __metadata("design:returntype", typeof (_c = typeof Map !== "undefined" && Map) === "function" ? _c : Object)
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
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object])
], TasksService);
exports.TasksService = TasksService;


/***/ }),
/* 56 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 57 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/schedule");

/***/ }),
/* 58 */
/***/ ((module) => {

"use strict";
module.exports = require("cron");

/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtRefreshTokenDeletedEvent = void 0;
class JwtRefreshTokenDeletedEvent {
    contructor(name, userId, description) {
        this.name = name;
        this.userId = userId;
        this.description = description;
    }
}
exports.JwtRefreshTokenDeletedEvent = JwtRefreshTokenDeletedEvent;


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerJwtRefreshService = void 0;
const common_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(16);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(47);
const scedule_service_1 = __webpack_require__(55);
const mail_service_1 = __webpack_require__(21);
const jwt_refresh_constants_1 = __webpack_require__(50);
const owner_constants_1 = __webpack_require__(48);
const owner_refresh_token_model_1 = __webpack_require__(42);
const owner_service_1 = __webpack_require__(52);
let OwnerJwtRefreshService = class OwnerJwtRefreshService {
    constructor(jwtService, ownerService, mailService, sheduleService, ownerRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.ownerService = ownerService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.ownerRefreshTokenRepository = ownerRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerRefreshToken = this.jwtService.sign(payload);
                return ownerRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerData = this.jwtService.verify(ownerRefreshToken);
                if (!ownerData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return ownerData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.findOne({
                    where: { ownerId: ownerId },
                });
                if (tokenData) {
                    tokenData.ownerRefreshToken = ownerRefreshToken;
                    if (owner.getOwnerAgent() && owner.getOwnerAgent() !== ownerAgent) {
                        owner.setIsActivated(false);
                    }
                    return tokenData.save();
                }
                const token = yield this.ownerRefreshTokenRepository.create({
                    ownerRefreshToken: ownerRefreshToken,
                    ownerId: ownerId,
                    email: email,
                    ownerAgent: ownerAgent,
                    phoneNumber: phoneNumber,
                });
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    removeToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(ownerRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.destroy({
                    where: { ownerRefreshToken: ownerRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findTokenByToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { ownerRefreshToken: ownerRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findToken(ownerRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { ownerRefreshToken: ownerRefreshToken },
            });
            if (!token) {
                return false;
            }
            return token;
        });
    }
    findTokenByParams(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(ownerRefreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield owner_refresh_token_model_1.OwnerRefreshToken.findByPk(ownerRefreshTokenId);
            if (!token) {
                return false;
            }
            return owner_refresh_token_model_1.OwnerRefreshToken.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                },
            });
        });
    }
};
OwnerJwtRefreshService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(owner_refresh_token_model_1.OwnerRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _b : Object, typeof (_c = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _c : Object, typeof (_d = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _d : Object, Object])
], OwnerJwtRefreshService);
exports.OwnerJwtRefreshService = OwnerJwtRefreshService;


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminJwtRefreshService = void 0;
const common_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(16);
const jwt_refresh_constants_1 = __webpack_require__(49);
const admin_refresh_token_model_1 = __webpack_require__(43);
const admin_service_1 = __webpack_require__(24);
const mail_service_1 = __webpack_require__(21);
const sequelize_1 = __webpack_require__(8);
const scedule_service_1 = __webpack_require__(55);
const api_exception_1 = __webpack_require__(47);
let AdminJwtRefreshService = class AdminJwtRefreshService {
    constructor(jwtService, adminService, sheduleService, mailService, adminRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.sheduleService = sheduleService;
        this.mailService = mailService;
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
    }
    generateRefreshToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminRefreshToken = this.jwtService.sign(payload);
                return adminRefreshToken;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SIGNING_TOKEN);
            }
        });
    }
    validateRefreshToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminData = this.jwtService.verify(adminRefreshToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
                }
                return adminData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_VALIDATING_TOKEN);
            }
        });
    }
    saveToken(adminId, adminRefreshToken, email, adminAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.getAdminById(adminId);
                if (!admin) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
                }
                const tokenData = yield this.adminRefreshTokenRepository.findOne({
                    where: { adminId: adminId },
                });
                if (tokenData) {
                    tokenData.adminRefreshToken = adminRefreshToken;
                    if (admin.getAdminAgent() && admin.getAdminAgent() !== adminAgent) {
                        admin.setIsActivated(false);
                    }
                    return tokenData.save();
                }
                const token = yield this.adminRefreshTokenRepository.create({
                    adminRefreshToken: adminRefreshToken,
                    adminId: adminId,
                    email: email,
                    adminAgent: adminAgent,
                    phoneNumber: phoneNumber,
                });
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    removeToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.findToken(adminRefreshToken);
                if (!token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                const tokenData = yield this.adminRefreshTokenRepository.destroy({
                    where: { adminRefreshToken: adminRefreshToken },
                });
                return tokenData;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_REMOVING_TOKEN);
            }
        });
    }
    findToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { adminRefreshToken: adminRefreshToken },
            });
            if (!token) {
                return false;
            }
            return token;
        });
    }
    findTokenByToken(adminRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { adminRefreshToken: adminRefreshToken },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findTokenByParams(email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(adminRefreshTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield admin_refresh_token_model_1.AdminRefreshToken.findByPk(adminRefreshTokenId);
            if (!token) {
                return false;
            }
            return this.adminRefreshTokenRepository.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                },
            });
        });
    }
};
AdminJwtRefreshService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(admin_refresh_token_model_1.AdminRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _b : Object, typeof (_c = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _c : Object, typeof (_d = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _d : Object, Object])
], AdminJwtRefreshService);
exports.AdminJwtRefreshService = AdminJwtRefreshService;


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangeDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const match_decorator_1 = __webpack_require__(19);
const auth_constants_1 = __webpack_require__(12);
class ChangeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], ChangeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s confirm password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], ChangeDto.prototype, "confirmPassword", void 0);
exports.ChangeDto = ChangeDto;


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAdminDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const admin_constants_1 = __webpack_require__(26);
class CreateAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'admin`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: admin_constants_1.ADMINNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Casler', description: 'admin`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9_-]{2,20}/, {
        message: admin_constants_1.ADMINNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '+251912345678',
        description: 'admin`s phone number',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: admin_constants_1.PHONENUMBER_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'admin`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^[a-z0-9]+@[a-z]+\.[a-z]{2,64}$/, {
        message: admin_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'admin`s password',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665yупвіяпвкірніп',
        description: 'admin`s activation link',
    }),
    (0, class_validator_1.IsUUID)(4),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "activationLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to edit website',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "editWebSite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to add content',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "addContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'Right to edit content',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "editContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'False',
        description: 'is user Admin',
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAdminDto.prototype, "isAdmin", void 0);
exports.CreateAdminDto = CreateAdminDto;


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateDto = void 0;
const common_1 = __webpack_require__(7);
const class_transformer_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(18);
const validation_excetion_1 = __webpack_require__(65);
let ValidateDto = class ValidateDto {
    transform(value, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = (0, class_transformer_1.plainToClass)(metadata.metatype, value);
            const errors = yield (0, class_validator_1.validate)(obj);
            if (errors.length) {
                const messages = errors.map((err) => {
                    return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
                });
                throw new validation_excetion_1.ValidationException(messages);
            }
            return value;
        });
    }
};
ValidateDto = __decorate([
    (0, common_1.Injectable)()
], ValidateDto);
exports.ValidateDto = ValidateDto;


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationException = void 0;
const common_1 = __webpack_require__(7);
class ValidationException extends common_1.HttpException {
    constructor(response) {
        super(response, common_1.HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}
exports.ValidationException = ValidationException;


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThrottlerBehindProxyGuard = void 0;
const throttler_1 = __webpack_require__(67);
const common_1 = __webpack_require__(7);
let ThrottlerBehindProxyGuard = class ThrottlerBehindProxyGuard extends throttler_1.ThrottlerGuard {
    getTracker(req) {
        return req.ips.length ? req.ips[0] : req.ip;
    }
};
ThrottlerBehindProxyGuard = __decorate([
    (0, common_1.Injectable)()
], ThrottlerBehindProxyGuard);
exports.ThrottlerBehindProxyGuard = ThrottlerBehindProxyGuard;


/***/ }),
/* 67 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/throttler");

/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(7);
exports.ROLES_KEY = 'tdshgre4h6k7{=}weg34lhbthbtgn';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(4);
const auth_service_1 = __webpack_require__(13);
const roles_auth_decorator_1 = __webpack_require__(68);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(47);
let RolesGuard = class RolesGuard {
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
                if (!requiredRoles) {
                    return true;
                }
                const req = context.switchToHttp().getRequest();
                const authHeader = req.headers.authorization;
                const bearer = authHeader.split(' ')[0];
                const token = authHeader.split(' ')[1];
                if (bearer !== 'Bearer' || !token) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const decodedToken = Buffer.from(token, 'base64').toString('ascii');
                let payload;
                try {
                    payload = yield this.authService.validateAccessToken(decodedToken);
                }
                catch (err) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                if (!payload) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                req.payload = payload;
                return payload.roles.some((role) => requiredRoles.includes(role.value));
            }
            catch (err) {
                throw new common_1.HttpException(auth_constants_1.ACCESS_DENIED, common_1.HttpStatus.FORBIDDEN);
            }
        }))();
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerAdminGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const jwt_refresh_service_1 = __webpack_require__(60);
const owner_refresh_token_model_1 = __webpack_require__(42);
const roles_auth_decorator_1 = __webpack_require__(68);
const core_1 = __webpack_require__(4);
const jwt_refresh_service_2 = __webpack_require__(61);
const admin_refresh_token_model_1 = __webpack_require__(43);
const auth_service_1 = __webpack_require__(13);
const api_exception_1 = __webpack_require__(47);
let OwnerAdminGuard = class OwnerAdminGuard {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, reflector, authService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.reflector = reflector;
        this.authService = authService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const accessToken = req === null || req === void 0 ? void 0 : req.cookies['accessToken'];
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            const decodedAccessToken = Buffer.from(accessToken, 'base64').toString('ascii');
            if (process.env.NODE_ENV === 'production') {
                const accessPayload = yield this.authService.validateAccessToken(decodedAccessToken);
                if (!accessPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
            }
            const type = req['type'];
            if (type === undefined) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_DETECTED);
            }
            if (type && type === 'OWNER') {
                const userRefreshToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                if (!userRefreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                const payload = req === null || req === void 0 ? void 0 : req.payload;
                if (!payload) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                if (userRefreshToken instanceof owner_refresh_token_model_1.OwnerRefreshToken &&
                    payload.userId !== userRefreshToken.ownerId) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                const refreshPayload = yield this.ownerJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!refreshPayload) {
                    return false;
                }
                return refreshPayload.roles.some((role) => requiredRoles.includes(role.value));
            }
            if (type && type === 'ADMIN') {
                const userRefreshToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                if (!userRefreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const payload = req === null || req === void 0 ? void 0 : req.payload;
                if (!payload) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                if (userRefreshToken instanceof admin_refresh_token_model_1.AdminRefreshToken &&
                    payload.userId !== userRefreshToken.adminId) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const refreshPayload = yield this.adminJwtRefreshTokenService.validateRefreshToken(decodedToken);
                return refreshPayload.roles.some((role) => requiredRoles.includes(role.value));
            }
            throw new common_1.HttpException(auth_constants_1.ACCESS_DENIED, common_1.HttpStatus.FORBIDDEN);
        }))();
    }
};
OwnerAdminGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_1.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_2.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_2.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _c : Object, typeof (_d = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _d : Object])
], OwnerAdminGuard);
exports.OwnerAdminGuard = OwnerAdminGuard;


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthFerfershGuard = void 0;
const common_1 = __webpack_require__(7);
const admin_service_1 = __webpack_require__(24);
const owner_service_1 = __webpack_require__(52);
const users_service_1 = __webpack_require__(44);
const user_constants_1 = __webpack_require__(46);
const api_exception_1 = __webpack_require__(47);
const auth_constants_1 = __webpack_require__(12);
let AuthFerfershGuard = class AuthFerfershGuard {
    constructor(ownerService, adminService, userService) {
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const payload = req === null || req === void 0 ? void 0 : req.payload;
            const type = req['type'];
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.INVALID_REQUEST);
            }
            if (type === undefined) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_DETECTED);
            }
            if (type && type === 'OWNER') {
                const activationLink = req === null || req === void 0 ? void 0 : req.signedCookies['user-id'];
                if (!activationLink) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_LINK_PROVIDED);
                }
                return this.ownerService.checkOwner(payload, activationLink);
            }
            if (type && type === 'ADMIN') {
                const activationLink = req === null || req === void 0 ? void 0 : req.signedCookies['user-id'];
                if (!activationLink) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_LINK_PROVIDED);
                }
                return this.adminService.checkAdmin(payload, activationLink);
            }
            const user = yield this.userService.getUserById(payload.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return true;
        }))();
    }
};
AuthFerfershGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object, typeof (_b = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], AuthFerfershGuard);
exports.AuthFerfershGuard = AuthFerfershGuard;


/***/ }),
/* 72 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/pipes");

/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiErrorExceptionFilter = void 0;
const validate_dto_exception_error_1 = __webpack_require__(74);
const common_1 = __webpack_require__(7);
let ApiErrorExceptionFilter = class ApiErrorExceptionFilter {
    catch(exception, host) {
        var _a;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.statusCode || 500;
        response.status(status).send({
            success: false,
            message: exception.message,
            rawErrors: (_a = exception.rawErrors) !== null && _a !== void 0 ? _a : [],
            stack: exception.stack.toString().split(' ')[0] +
                exception.stack.toString().split(' ')[1],
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
ApiErrorExceptionFilter = __decorate([
    (0, common_1.Catch)(validate_dto_exception_error_1.BadRequestError)
], ApiErrorExceptionFilter);
exports.ApiErrorExceptionFilter = ApiErrorExceptionFilter;


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BadRequestError = exports.NotFoundError = exports.ApiError = void 0;
const common_1 = __webpack_require__(7);
class ApiError extends Error {
    constructor(statusCode, message, rawErrors) {
        super(message);
        this.rawErrors = [];
        this.statusCode = statusCode;
        if (rawErrors) {
            this.rawErrors = rawErrors;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class NotFoundError extends ApiError {
    constructor(path) {
        super(common_1.HttpStatus.NOT_FOUND, `The requested path ${path} not found!`);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ApiError {
    constructor(message, errors) {
        super(common_1.HttpStatus.BAD_REQUEST, message, errors);
    }
}
exports.BadRequestError = BadRequestError;


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiExceptionFilter = void 0;
const common_1 = __webpack_require__(7);
const api_exception_1 = __webpack_require__(47);
let ApiExceptionFilter = class ApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.status || 500;
        response.status(status).send({
            success: false,
            message: exception.message,
            rawErrors: exception.errors,
            stack: exception.stack.toString().split(' ')[0] +
                exception.stack.toString().split(' ')[1],
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
ApiExceptionFilter = __decorate([
    (0, common_1.Catch)(api_exception_1.ApiException)
], ApiExceptionFilter);
exports.ApiExceptionFilter = ApiExceptionFilter;


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(7);
const auth_service_1 = __webpack_require__(13);
const auth_controller_1 = __webpack_require__(77);
const admin_module_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(16);
const mail_service_1 = __webpack_require__(21);
const core_1 = __webpack_require__(4);
const http_exception_filter_1 = __webpack_require__(88);
const auth_middleware_1 = __webpack_require__(89);
const throttler_1 = __webpack_require__(67);
const owner_module_1 = __webpack_require__(90);
const jwt_refresh_service_1 = __webpack_require__(61);
const jwt_refresh_service_2 = __webpack_require__(60);
const users_module_1 = __webpack_require__(108);
const initialize_user_middleware_1 = __webpack_require__(114);
const initialize_email_middleware_1 = __webpack_require__(135);
const activate_middleware_1 = __webpack_require__(136);
const body_validator_pipe_1 = __importDefault(__webpack_require__(115));
const login_dto_1 = __webpack_require__(79);
const signup_dto_1 = __webpack_require__(17);
const reset_password_dto_1 = __webpack_require__(80);
const change_password_dto_1 = __webpack_require__(62);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const config_1 = __webpack_require__(95);
const scedule_service_1 = __webpack_require__(55);
const core_module_1 = __webpack_require__(96);
const events_service_1 = __webpack_require__(86);
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'auth/signup', method: common_1.RequestMethod.POST }, { path: 'auth/refresh', method: common_1.RequestMethod.PATCH }, { path: 'auth/change', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'auth/logout', method: common_1.RequestMethod.POST }, { path: 'auth/refresh', method: common_1.RequestMethod.PATCH }, { path: 'auth/change', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(initialize_email_middleware_1.InitializeEmailMiddleware)
            .forRoutes({ path: 'auth/code', method: common_1.RequestMethod.POST }, { path: 'auth/reset', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(activate_middleware_1.ActivateMiddleware)
            .forRoutes({ path: 'auth/activate/:link', method: common_1.RequestMethod.GET });
        consumer
            .apply(body_validator_pipe_1.default.validate(login_dto_1.LoginDto))
            .forRoutes({ path: 'auth/login', method: common_1.RequestMethod.POST });
        consumer
            .apply(body_validator_pipe_1.default.validate(signup_dto_1.SignupDto))
            .forRoutes({ path: 'auth/signup', method: common_1.RequestMethod.PUT });
        consumer
            .apply(body_validator_pipe_1.default.validate(reset_password_dto_1.ResetDto))
            .forRoutes({ path: 'auth/reset', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(body_validator_pipe_1.default.validate(change_password_dto_1.ChangeDto))
            .forRoutes({ path: 'auth/change', method: common_1.RequestMethod.PATCH });
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [
            events_service_1.AppListener,
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            jwt_refresh_service_1.AdminJwtRefreshService,
            jwt_refresh_service_2.OwnerJwtRefreshService,
            mail_service_1.MailService,
            scedule_service_1.TasksService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
        controllers: [auth_controller_1.AuthController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                owner_refresh_token_model_1.OwnerRefreshToken,
            ]),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET.toString().trim() ||
                    'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglki',
                signOptions: {
                    expiresIn: 3600000,
                },
            }),
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            jwt_refresh_service_1.AdminJwtRefreshService,
            jwt_refresh_service_2.OwnerJwtRefreshService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(7);
const decorators_1 = __webpack_require__(78);
const auth_service_1 = __webpack_require__(13);
const login_dto_1 = __webpack_require__(79);
const reset_password_dto_1 = __webpack_require__(80);
const signup_dto_1 = __webpack_require__(17);
const swagger_1 = __webpack_require__(5);
const express_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(11);
const throttler_1 = __webpack_require__(67);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const user_type_decorator_1 = __webpack_require__(81);
const user_agent_decorator_1 = __webpack_require__(82);
const validation_pipe_1 = __webpack_require__(64);
const refresh_guard_1 = __webpack_require__(83);
const auth_interfaces_1 = __webpack_require__(84);
const jw_refresh_guard_1 = __webpack_require__(71);
const change_password_dto_1 = __webpack_require__(62);
const user_id_decorator_1 = __webpack_require__(85);
const error_handler_filter_1 = __webpack_require__(73);
const events_service_1 = __webpack_require__(86);
const api_exception_filter_1 = __webpack_require__(75);
let AuthController = class AuthController {
    constructor(authService, appListener) {
        this.authService = authService;
        this.appListener = appListener;
    }
    signup(userDto, response, request, next, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.signup(userDto, response, request, next, userAgent);
        }))();
    }
    login(userDto, response, request, next, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.login(userDto, response, request, next, userAgent);
        }))();
    }
    refresh(response, request, next, type, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.refresh(response, request, next, type, userAgent);
        }))();
    }
    logout(response, request, next, type) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.logout(response, request, next, type);
        }))();
    }
    fetchRenewalCode(codeDto, locale) {
        try {
            return this.authService.setCode(codeDto, locale);
        }
        catch (error) {
            throw error;
        }
    }
    resetPassword(resetDto, codeDto) {
        try {
            return this.authService.resetPassword(resetDto, codeDto);
        }
        catch (error) {
            throw error;
        }
    }
    changePassword(response, request, next, changeDto, userId, type) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.changePassword(response, request, next, changeDto, userId, type);
        }))();
    }
    activate(activationLink, code, request, response, next, type, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.activate(request, response, next, activationLink, code, type, userAgent);
        }))();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Signing up users' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, throttler_1.Throttle)(50, 600),
    (0, common_1.Post)('signup'),
    (0, decorators_1.HttpCode)(201),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _f : Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logging in users' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, decorators_1.UseFilters)(api_exception_filter_1.ApiExceptionFilter),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _k : Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refreshing users' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.UseGuards)(refresh_guard_1.RefreshAuthGuard),
    (0, decorators_1.HttpCode)(202),
    (0, decorators_1.Patch)('refresh'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object, typeof (_o = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _o : Object, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Loggigng out users' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, decorators_1.HttpCode)(202),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, typeof (_q = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _q : Object, typeof (_r = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _r : Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting code' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, common_1.Post)('code'),
    (0, decorators_1.HttpCode)(202),
    __param(0, (0, user_type_decorator_1.Type)('CODEDTO')),
    __param(1, (0, decorators_1.Query)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _s : Object, String]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], AuthController.prototype, "fetchRenewalCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Resetting password' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, throttler_1.Throttle)(45, 450),
    (0, decorators_1.Patch)('reset'),
    (0, decorators_1.HttpCode)(201),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, user_type_decorator_1.Type)('CODEDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_u = typeof reset_password_dto_1.ResetDto !== "undefined" && reset_password_dto_1.ResetDto) === "function" ? _u : Object, typeof (_v = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Changing password' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(70, 700),
    (0, decorators_1.Patch)('change'),
    (0, decorators_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, decorators_1.HttpCode)(202),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(5, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object, typeof (_y = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _y : Object, typeof (_z = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _z : Object, typeof (_0 = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _0 : Object, Number, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activating users' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, throttler_1.Throttle)(70, 700),
    (0, decorators_1.Get)('activate/:link'),
    (0, decorators_1.HttpCode)(204),
    __param(0, (0, decorators_1.Param)('link')),
    __param(1, (0, decorators_1.Query)('code', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Next)()),
    __param(5, (0, user_type_decorator_1.Type)('ACTIVATE')),
    __param(6, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, typeof (_1 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _1 : Object, typeof (_2 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _2 : Object, typeof (_3 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _3 : Object, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
AuthController = __decorate([
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, decorators_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, decorators_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof events_service_1.AppListener !== "undefined" && events_service_1.AppListener) === "function" ? _b : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 78 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/decorators");

/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const auth_constants_1 = __webpack_require__(12);
class LoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: auth_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
exports.LoginDto = LoginDto;


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const match_decorator_1 = __webpack_require__(19);
const auth_constants_1 = __webpack_require__(12);
class ResetDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@gmail.com', description: 'user`s email' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: auth_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], ResetDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '46756868', description: 'user`s code' }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResetDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    __metadata("design:type", String)
], ResetDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'etrhg45ty5yeewt4t4665y',
        description: 'user`s confirm password',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: auth_constants_1.PASSWORD_VALIDATION,
    }),
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], ResetDto.prototype, "confirmPassword", void 0);
exports.ResetDto = ResetDto;


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Type = void 0;
const common_1 = __webpack_require__(7);
exports.Type = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    if (data === 'REFRESHTOKEN') {
        const type = request['type'];
        return data ? type : request['type'];
    }
    if (data === 'CODEDTO') {
        const email = request['codeDto'];
        return data ? email : request['codeDto'];
    }
    if (data === 'ACTIVATE') {
        const type = request['type'];
        return data ? type : request['type'];
    }
});


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAgent = void 0;
const common_1 = __webpack_require__(7);
exports.UserAgent = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request['userAgent'];
    return data ? userAgent : request['userAgent'];
});


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshAuthGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const auth_service_1 = __webpack_require__(13);
const api_exception_1 = __webpack_require__(47);
let RefreshAuthGuard = class RefreshAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_HEADER);
        }
        const bearer = authHeader.split(' ')[0];
        const accessToken = authHeader.split(' ')[1];
        if (bearer !== 'Bearer' || !accessToken) {
            throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ACCESS_TOKEN_NOT_PROVIDED);
        }
        return true;
    }
};
RefreshAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], RefreshAuthGuard);
exports.RefreshAuthGuard = RefreshAuthGuard;


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserId = void 0;
const common_1 = __webpack_require__(7);
exports.UserId = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a, _b;
    const request = ctx.switchToHttp().getRequest();
    const userId = (_a = request === null || request === void 0 ? void 0 : request.payload) === null || _a === void 0 ? void 0 : _a.userId;
    return data ? userId : (_b = request === null || request === void 0 ? void 0 : request.payload) === null || _b === void 0 ? void 0 : _b.userId;
});


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppListener = void 0;
const common_1 = __webpack_require__(7);
const interfaces_1 = __webpack_require__(87);
const event_emitter_1 = __webpack_require__(56);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(59);
let AppListener = class AppListener {
    handleTokenDeletedEvent(event) {
        return event;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('refreshtoken.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_token_deleted_evet_1.JwtRefreshTokenDeletedEvent !== "undefined" && jwt_refresh_token_deleted_evet_1.JwtRefreshTokenDeletedEvent) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], AppListener.prototype, "handleTokenDeletedEvent", null);
AppListener = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.DEFAULT })
], AppListener);
exports.AppListener = AppListener;


/***/ }),
/* 87 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/interfaces");

/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const common_1 = __webpack_require__(7);
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const message = exception.message;
        response.status(status).json({
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ }),
/* 89 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        try {
            const userAgent = req.headers['user-agent'];
            res.setHeader('Access-Control-Request-Headers', 'Authorization');
            res.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, PATCH');
            res.setHeader('Timing-Allow-Origin', `${process.env.ACCESS_ALLOW}`);
            req['userAgent'] = userAgent;
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthMiddleware.prototype, "use", null);
AuthMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OwnerModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerModule = void 0;
const common_1 = __webpack_require__(7);
const owner_service_1 = __webpack_require__(52);
const jwt_1 = __webpack_require__(16);
const sequelize_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(76);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const jwt_refresh_service_1 = __webpack_require__(60);
const admin_module_1 = __webpack_require__(9);
const mail_service_1 = __webpack_require__(21);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const config_1 = __webpack_require__(95);
const core_module_1 = __webpack_require__(96);
const scedule_service_1 = __webpack_require__(55);
let OwnerModule = OwnerModule_1 = class OwnerModule {
};
OwnerModule = OwnerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([owner_model_1.Owner, owner_refresh_token_model_1.OwnerRefreshToken, roles_model_1.Role, user_roles_model_1.UserRoles]),
            roles_module_1.RolesModule,
            (0, common_1.forwardRef)(() => OwnerModule_1),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_OWNER_SECRET.toString().trim() ||
                    'knfdljhtop6hohjlyjgfhmhnhgnljjukfty6yujhjbjlvcglkidrtujhdgsgdsagdfsdhQQQtrfujuj',
                signOptions: {
                    expiresIn: 86400000,
                },
            }),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
        ],
        providers: [owner_service_1.OwnerService, jwt_refresh_service_1.OwnerJwtRefreshService, mail_service_1.MailService, scedule_service_1.TasksService],
        exports: [owner_service_1.OwnerService, jwt_refresh_service_1.OwnerJwtRefreshService],
    })
], OwnerModule);
exports.OwnerModule = OwnerModule;


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RolesModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesModule = void 0;
const common_1 = __webpack_require__(7);
const roles_controller_1 = __webpack_require__(92);
const roles_service_1 = __webpack_require__(45);
const sequelize_1 = __webpack_require__(8);
const roles_model_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(33);
const user_roles_model_1 = __webpack_require__(32);
const config_1 = __webpack_require__(95);
const order_product_model_1 = __webpack_require__(38);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const order_model_1 = __webpack_require__(37);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const product_model_1 = __webpack_require__(35);
const user_refresh_token_model_1 = __webpack_require__(41);
const auth_service_1 = __webpack_require__(13);
const admin_module_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(76);
const core_module_1 = __webpack_require__(96);
const mail_module_1 = __webpack_require__(107);
const owner_module_1 = __webpack_require__(90);
const product_module_1 = __webpack_require__(116);
const users_service_1 = __webpack_require__(44);
const scedule_service_1 = __webpack_require__(55);
const jwt_refresh_service_1 = __webpack_require__(54);
const initialize_user_middleware_1 = __webpack_require__(114);
let RolesModule = RolesModule_1 = class RolesModule {
    configure(consumer) {
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'roles/create_role', method: common_1.RequestMethod.PUT }, { path: 'roles/get', method: common_1.RequestMethod.GET });
    }
};
RolesModule = RolesModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [roles_controller_1.RolesController],
        providers: [
            roles_service_1.RolesService,
            auth_service_1.AuthService,
            users_service_1.UsersService,
            scedule_service_1.TasksService,
            jwt_refresh_service_1.UserJwtRefreshTokenService,
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_item_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => RolesModule_1),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
        ],
        exports: [roles_service_1.RolesService],
    })
], RolesModule);
exports.RolesModule = RolesModule;


/***/ }),
/* 92 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const roles_auth_decorator_1 = __webpack_require__(68);
const add_content_guard_1 = __webpack_require__(93);
const jw_refresh_guard_1 = __webpack_require__(71);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(70);
const roles_guard_1 = __webpack_require__(69);
const error_handler_filter_1 = __webpack_require__(73);
const create_role_dto_1 = __webpack_require__(94);
const roles_model_1 = __webpack_require__(30);
const roles_service_1 = __webpack_require__(45);
const throttler_1 = __webpack_require__(67);
const api_exception_filter_1 = __webpack_require__(75);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    createRole(roleDto) {
        try {
            return this.roleService.createRole(roleDto);
        }
        catch (error) {
            throw error;
        }
    }
    getRoleByValue(value) {
        try {
            return this.roleService.getRoleByValue(value);
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating Roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: roles_model_1.Role }),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Put)('/create_role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_role_dto_1.CreateRoleDto !== "undefined" && create_role_dto_1.CreateRoleDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], RolesController.prototype, "createRole", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Getting Roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: roles_model_1.Role }),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Get)('get/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], RolesController.prototype, "getRoleByValue", null);
RolesController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, swagger_1.ApiTags)('roles'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Controller)('/roles'),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [typeof (_a = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _a : Object])
], RolesController);
exports.RolesController = RolesController;


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddContentGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const admin_service_1 = __webpack_require__(24);
const api_exception_1 = __webpack_require__(47);
let AddContentGuard = class AddContentGuard {
    constructor(adminService) {
        this.adminService = adminService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const req = context.switchToHttp().getRequest();
            const payload = req === null || req === void 0 ? void 0 : req.payload;
            const type = req['type'];
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.INVALID_REQUEST);
            }
            if (type === undefined) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_DETECTED);
            }
            if (type && type === 'OWNER') {
                return true;
            }
            const admin = yield this.adminService.getAdminById(payload.userId);
            if (type && type === 'ADMIN' && admin.getAddContent()) {
                return true;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_RIGHT);
        }))();
    }
};
AddContentGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AddContentGuard);
exports.AddContentGuard = AddContentGuard;


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateRoleDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
class CreateRoleDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ADMIN', description: 'user`s role' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin', description: 'Role`s description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
exports.CreateRoleDto = CreateRoleDto;


/***/ }),
/* 95 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(4);
const all_exceptions_filter_1 = __webpack_require__(97);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const global_interceptor_1 = __webpack_require__(98);
const cluster_service_1 = __webpack_require__(101);
const file_service_1 = __webpack_require__(104);
const config_1 = __webpack_require__(95);
const schedule_1 = __webpack_require__(57);
const scedule_service_1 = __webpack_require__(55);
const event_emitter_1 = __webpack_require__(56);
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


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(4);
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const message = exception.message;
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            message: message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.HttpAdapterHost !== "undefined" && core_1.HttpAdapterHost) === "function" ? _a : Object])
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;


/***/ }),
/* 98 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GlobalInterceptor = void 0;
const common_1 = __webpack_require__(7);
const rxjs_1 = __webpack_require__(99);
const operators_1 = __webpack_require__(100);
let GlobalInterceptor = class GlobalInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.timeout)(5000), (0, operators_1.catchError)((err) => {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(() => new common_1.RequestTimeoutException());
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
GlobalInterceptor = __decorate([
    (0, common_1.Injectable)()
], GlobalInterceptor);
exports.GlobalInterceptor = GlobalInterceptor;


/***/ }),
/* 99 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 100 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs/operators");

/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppClusterService = void 0;
const cluster_1 = __importDefault(__webpack_require__(102));
const os_1 = __webpack_require__(103);
const common_1 = __webpack_require__(7);
const numCPUs = (0, os_1.cpus)().length;
let AppClusterService = class AppClusterService {
    static clusterize(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cluster_1.default.isPrimary) {
                console.log(`Number of CPUs is ${numCPUs}`);
                console.log(`Master server started on ${process.pid}`);
                for (let i = 0; i < numCPUs; i++) {
                    const worker = cluster_1.default.fork();
                }
                cluster_1.default.on('exit', (worker, code, signal) => {
                    console.log(`Worker ${worker.process.pid} died. Restarting`, signal || code);
                    cluster_1.default.fork();
                });
            }
            else {
                console.log(`Cluster server started on ${process.pid}`);
                const app = yield callback();
                process.on('SIGINT', () => app.close());
                process.on('SIGTERM', () => app.close());
                process.on('SIGUSR2', () => __awaiter(this, void 0, void 0, function* () { return app.close(); }));
                process.on('message', (msg) => {
                    if (msg === 'shutdown') {
                        app.close();
                    }
                });
            }
        });
    }
    static trackOfhttpRequests() {
        let numReqs = 0;
        for (const id in cluster_1.default.workers) {
            cluster_1.default.workers[id].on('message', messageHandler);
        }
        setInterval(() => {
            console.log(`numReqs = ${numReqs}`);
        }, 1000);
        function messageHandler(msg) {
            if (msg.cmd && msg.cmd === 'notifyRequest') {
                numReqs = numReqs + 1;
            }
        }
    }
    static setTimeouts(worker) {
        let timeout;
        worker.on('listening', (address) => {
            worker.send('shutdown');
            worker.disconnect();
            timeout = setTimeout(() => {
                worker.kill();
            }, 2000);
        });
        worker.on('disconnect', () => {
            clearTimeout(timeout);
        });
    }
};
AppClusterService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], AppClusterService);
exports.AppClusterService = AppClusterService;


/***/ }),
/* 102 */
/***/ ((module) => {

"use strict";
module.exports = require("cluster");

/***/ }),
/* 103 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(7);
const path = __importStar(__webpack_require__(105));
const fs = __importStar(__webpack_require__(106));
const uuid = __importStar(__webpack_require__(53));
let FilesService = class FilesService {
    createFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = uuid.v4() + '.jpg';
                const filePath = path.resolve(__dirname, '..', 'static');
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path.join(filePath, fileName), file.buffer);
                return { fileName: fileName, filePath: filePath };
            }
            catch (e) {
                throw new common_1.HttpException('Error occured while writing file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    unlinkFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            filePath = path.join(__dirname, '..', filePath);
            fs.unlink(filePath, (err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        });
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], FilesService);
exports.FilesService = FilesService;


/***/ }),
/* 105 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 106 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const common_1 = __webpack_require__(7);
const mail_service_1 = __webpack_require__(21);
const mailer_1 = __webpack_require__(22);
const admin_module_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(76);
const owner_module_1 = __webpack_require__(90);
const roles_module_1 = __webpack_require__(91);
const users_module_1 = __webpack_require__(108);
const config_1 = __webpack_require__(95);
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Module)({
        providers: [mail_service_1.MailService],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: ((_a = process.env.MAILER_HOST) === null || _a === void 0 ? void 0 : _a.toString().trim()) || 'smtp.gmail.com',
                    port: Number((_b = process.env.MAILER_PORT) === null || _b === void 0 ? void 0 : _b.trim()) || 465,
                    secure: Boolean((_c = process.env.MAILER_SECURITY) === null || _c === void 0 ? void 0 : _c.trim()) || true,
                    auth: {
                        user: ((_d = process.env.MAILER_USER) === null || _d === void 0 ? void 0 : _d.toString().trim()) ||
                            'kazesport2022@gmail.com',
                        pass: ((_e = process.env.MAILER_PASS) === null || _e === void 0 ? void 0 : _e.toString().trim()) || 'flbwyzikawirfudk',
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
            }),
        ],
        exports: [mail_service_1.MailService],
    })
], MailModule);
exports.MailModule = MailModule;


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var UsersModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(7);
const users_controller_1 = __webpack_require__(109);
const users_service_1 = __webpack_require__(44);
const sequelize_1 = __webpack_require__(8);
const user_model_1 = __webpack_require__(33);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const auth_module_1 = __webpack_require__(76);
const user_refresh_token_model_1 = __webpack_require__(41);
const jwt_1 = __webpack_require__(16);
const jwt_refresh_service_1 = __webpack_require__(54);
const user_middleware_1 = __webpack_require__(113);
const initialize_user_middleware_1 = __webpack_require__(114);
const admin_refresh_token_model_1 = __webpack_require__(43);
const admin_model_1 = __webpack_require__(27);
const admin_module_1 = __webpack_require__(9);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const owner_module_1 = __webpack_require__(90);
const body_validator_pipe_1 = __importDefault(__webpack_require__(115));
const update_user_dto_1 = __webpack_require__(111);
const config_1 = __webpack_require__(95);
const scedule_service_1 = __webpack_require__(55);
const core_module_1 = __webpack_require__(96);
const product_module_1 = __webpack_require__(116);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
const product_model_1 = __webpack_require__(35);
const auth_service_1 = __webpack_require__(13);
const mail_module_1 = __webpack_require__(107);
let UsersModule = UsersModule_1 = class UsersModule {
    configure(consumer) {
        consumer
            .apply(user_middleware_1.UserMiddleware)
            .forRoutes({ path: 'users/update', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(body_validator_pipe_1.default.validate(update_user_dto_1.UpdateUserDto))
            .forRoutes({ path: 'users/update', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'user/get_users', method: common_1.RequestMethod.GET }, { path: 'user/find_users', method: common_1.RequestMethod.GET });
    }
};
UsersModule = UsersModule_1 = __decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UsersController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_item_model_1.CartProduct,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_USER_SECRET.toString().trim() ||
                    'knfdgfhRRljhtop6hfdghshfdshfohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
                signOptions: {
                    expiresIn: 604800000,
                },
            }),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => UsersModule_1),
        ],
        providers: [
            users_service_1.UsersService,
            jwt_refresh_service_1.UserJwtRefreshTokenService,
            scedule_service_1.TasksService,
            auth_service_1.AuthService,
        ],
        exports: [users_service_1.UsersService, jwt_refresh_service_1.UserJwtRefreshTokenService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const roles_auth_decorator_1 = __webpack_require__(68);
const jwt_auth_guard_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(33);
const users_service_1 = __webpack_require__(44);
const roles_guard_1 = __webpack_require__(69);
const ban_user_dto_1 = __webpack_require__(110);
const throttler_1 = __webpack_require__(67);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const auth_service_1 = __webpack_require__(13);
const update_user_dto_1 = __webpack_require__(111);
const express_1 = __webpack_require__(20);
const user_agent_decorator_1 = __webpack_require__(82);
const user_id_decorator_1 = __webpack_require__(85);
const user_guard_1 = __webpack_require__(112);
const owner_admin_guard_1 = __webpack_require__(70);
const jw_refresh_guard_1 = __webpack_require__(71);
const error_handler_filter_1 = __webpack_require__(73);
const api_exception_filter_1 = __webpack_require__(75);
let UsersController = class UsersController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    getAllUsers(page, pageSize) {
        return this.userService.getAllUsers(page, pageSize);
    }
    findUser(v, page, pageSize) {
        return this.userService.findUser(v, page, pageSize);
    }
    banUser(dto) {
        return this.userService.banUser(dto);
    }
    update(response, request, next, userId, userDto, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.updateUser(userDto, userId);
            return this.authService.refresh(response, request, next, null, userAgent);
        }))();
    }
};
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, swagger_1.ApiOperation)({ summary: 'Getting Users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_model_1.User] }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('/get_users'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, throttler_1.Throttle)(60, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Getting User' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('/find_users'),
    __param(0, (0, common_1.Query)('v', common_1.ParseArrayPipe)),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, swagger_1.ApiOperation)({ summary: 'Ban a user' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Post)('/ban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof ban_user_dto_1.BanUserDto !== "undefined" && ban_user_dto_1.BanUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(4, (0, common_1.Body)()),
    __param(5, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object, Number, typeof (_h = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _h : Object, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
UsersController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BanUserDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
class BanUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'unique identifier' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BanUserDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'User is not valid!', description: 'some reason' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BanUserDto.prototype, "banReason", void 0);
exports.BanUserDto = BanUserDto;


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const user_constants_1 = __webpack_require__(46);
class UpdateUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Alex', description: 'user`s name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: user_constants_1.USERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cusler', description: 'user`s surname' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: user_constants_1.SURNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'city',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Ukraine',
        description: 'country',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lviv',
        description: 'postOffice',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "postOffice", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserGuard = void 0;
const common_1 = __webpack_require__(7);
const jwt_refresh_service_1 = __webpack_require__(54);
const auth_constants_1 = __webpack_require__(12);
const core_1 = __webpack_require__(4);
const roles_auth_decorator_1 = __webpack_require__(68);
const auth_service_1 = __webpack_require__(13);
const api_exception_1 = __webpack_require__(47);
let UserGuard = class UserGuard {
    constructor(userJwtRefreshTokenService, reflector, authService) {
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.reflector = reflector;
        this.authService = authService;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const accessToken = req === null || req === void 0 ? void 0 : req.cookies['accessToken'];
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedRefreshToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            if (process.env.NODE_ENV === 'production') {
                const decodedAccessToken = Buffer.from(accessToken, 'base64').toString('ascii');
                const accessPayload = yield this.authService.validateAccessToken(decodedAccessToken);
                if (!accessPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
            }
            const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedRefreshToken);
            if (!userRefreshToken) {
                return false;
            }
            const payload = req === null || req === void 0 ? void 0 : req.payload;
            if (!payload) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            if (payload.userId !== userRefreshToken.userId) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const refreshPayload = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedRefreshToken.trim());
            return refreshPayload.roles.some((role) => requiredRoles.includes(role.value));
        }))();
    }
};
UserGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object, typeof (_c = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _c : Object])
], UserGuard);
exports.UserGuard = UserGuard;


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
let UserMiddleware = class UserMiddleware {
    use(req, res, next) {
        try {
            const userAgent = req.headers['user-agent'];
            res.setHeader('Access-Control-Request-Headers', 'Authorization');
            res.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, PATCH');
            res.setHeader('Timing-Allow-Origin', `${process.env.CLIENT_URL.trim()}`);
            res.setHeader('X-Content-Type-Options', 'nosniff');
            req['userAgent'] = userAgent;
            return next();
        }
        catch (err) {
            return next(err);
        }
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UserMiddleware.prototype, "use", null);
UserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], UserMiddleware);
exports.UserMiddleware = UserMiddleware;


/***/ }),
/* 114 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InitializeUserMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const jwt_refresh_service_1 = __webpack_require__(60);
const jwt_refresh_service_2 = __webpack_require__(61);
const jwt_refresh_service_3 = __webpack_require__(54);
const decorators_1 = __webpack_require__(78);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(47);
let InitializeUserMiddleware = class InitializeUserMiddleware {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
            try {
                res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
                const ownerRefreshToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                if (ownerRefreshToken) {
                    req['type'] = 'OWNER';
                    return next();
                }
                const adminRefreshToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                if (adminRefreshToken) {
                    req['type'] = 'ADMIN';
                    return next();
                }
                const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
                if (!userRefreshToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_REFRESH_TOKEN);
                }
                req['type'] = null;
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, decorators_1.Res)()),
    __param(2, (0, decorators_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], InitializeUserMiddleware.prototype, "use", null);
InitializeUserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_1.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_2.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_2.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof jwt_refresh_service_3.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_3.UserJwtRefreshTokenService) === "function" ? _c : Object])
], InitializeUserMiddleware);
exports.InitializeUserMiddleware = InitializeUserMiddleware;


/***/ }),
/* 115 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const class_transformer_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(18);
const validate_dto_exception_error_1 = __webpack_require__(74);
class RequestValidator {
}
exports["default"] = RequestValidator;
_a = RequestValidator;
RequestValidator.validate = (classInstance) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const convertedObject = (0, class_transformer_1.plainToInstance)(classInstance, req.body);
        yield (0, class_validator_1.validate)(convertedObject).then((errors) => {
            var _b;
            if (errors.length > 0) {
                let rawErrors = [];
                for (const errorItem of errors) {
                    rawErrors = rawErrors.concat(...rawErrors, Object.values((_b = errorItem.constraints) !== null && _b !== void 0 ? _b : []));
                }
                const validationErrorText = 'Request validation failed!';
                console.log('error found!', rawErrors);
                throw new validate_dto_exception_error_1.BadRequestError(validationErrorText, rawErrors);
            }
        });
        res.setHeader('Passed-validation', 'true');
        next();
    });
};


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const common_1 = __webpack_require__(7);
const product_service_1 = __webpack_require__(117);
const product_controller_1 = __webpack_require__(120);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const auth_module_1 = __webpack_require__(76);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const owner_module_1 = __webpack_require__(90);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const users_module_1 = __webpack_require__(108);
const config_1 = __webpack_require__(95);
const product_model_1 = __webpack_require__(35);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const categories_module_1 = __webpack_require__(126);
const cart_module_1 = __webpack_require__(129);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
const orders_module_1 = __webpack_require__(132);
const categories_service_1 = __webpack_require__(119);
let ProductModule = class ProductModule {
    configure(consumer) {
    }
};
ProductModule = __decorate([
    (0, common_1.Module)({
        providers: [product_service_1.ProductService, categories_service_1.CategoriesService],
        controllers: [product_controller_1.ProductController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_item_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], ProductModule);
exports.ProductModule = ProductModule;


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const common_1 = __webpack_require__(7);
const exceptions_1 = __webpack_require__(118);
const sequelize_1 = __webpack_require__(8);
const categories_service_1 = __webpack_require__(119);
const owner_service_1 = __webpack_require__(52);
const product_model_1 = __webpack_require__(35);
let ProductService = class ProductService {
    constructor(productRepository, ownerService, categoriesService) {
        this.productRepository = productRepository;
        this.ownerService = ownerService;
        this.categoriesService = categoriesService;
    }
    createProduct(createProductDto, userId, type, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!type) {
                throw new exceptions_1.UnauthorizedException('User is not authorized to create product!');
            }
            const imagesPaths = images.map((image) => {
                return image.path.split('\\')
                    .slice(image.path.split('\\')
                    .indexOf('static')).join('/');
            });
            const sizeChartImagePath = sizeChartImage[0].path
                .split('\\').slice(sizeChartImage[0]
                .path.split('\\').indexOf('static')).join('/');
            const productDto = Object.assign(Object.assign({}, createProductDto), { colours: new Array(JSON.parse(createProductDto.colours)), sizes: new Array(JSON.parse(createProductDto.sizes)), categories: new Array(JSON.parse(createProductDto.categories)) });
            const product = yield this.productRepository.create(Object.assign(Object.assign({}, productDto), { images: imagesPaths, sizeChartImage: sizeChartImagePath }));
            return product;
        });
    }
    updateProduct(updateProductDto, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const imagesPaths = images.map((image) => {
                return image.path.split('\\')
                    .slice(image.path.split('\\')
                    .indexOf('static')).join('/');
            });
            const sizeChartImagePath = sizeChartImage[0].path
                .split('\\').slice(sizeChartImage[0].path
                .split('\\').indexOf('static')).join('/');
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object, typeof (_b = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _b : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),
/* 118 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/exceptions");

/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesService = void 0;
const common_1 = __webpack_require__(7);
const interfaces_1 = __webpack_require__(87);
const sequelize_1 = __webpack_require__(8);
const category_model_1 = __webpack_require__(39);
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    getCategoryByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne({ where: { value: value } });
            return category;
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.findAll();
            return categories.map((category) => {
                return {
                    title: category.title,
                    description: category.description,
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
            });
        });
    }
    createCategory(categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findOne({
                where: {
                    title: categoryDto.title,
                    description: categoryDto.description,
                },
            });
            if (isExist) {
                throw new common_1.BadRequestException('Category already exist!');
            }
            const category = yield this.categoryRepository.create(Object.assign({}, categoryDto));
            return {
                title: category.title,
                description: category.description,
            };
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findByPk(categoryId);
            if (!isExist) {
                throw new common_1.NotFoundException('Category not found!');
            }
            const deleted = yield this.categoryRepository.destroy({
                where: {
                    title: isExist.title,
                    description: isExist.description,
                },
            });
            return deleted;
        });
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
exports.CategoriesService = CategoriesService;


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(7);
const platform_express_1 = __webpack_require__(121);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const error_handler_filter_1 = __webpack_require__(73);
const create_product_dto_1 = __webpack_require__(122);
const throttler_1 = __webpack_require__(67);
const product_service_1 = __webpack_require__(117);
const multer_1 = __webpack_require__(123);
const file_upload_config_1 = __webpack_require__(124);
const update_product_dto_1 = __webpack_require__(125);
const user_type_decorator_1 = __webpack_require__(81);
const user_id_decorator_1 = __webpack_require__(85);
const api_exception_filter_1 = __webpack_require__(75);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(createProductDto, files, userId, type) {
        try {
            return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
        }
        catch (error) {
            throw error;
        }
    }
    updateProduct(updateProductDto, files) {
        try {
            return this.productService.updateProduct(updateProductDto, files.images, files.sizeChartImage);
        }
        catch (err) {
            throw err;
        }
    }
    deleteProduct(productId) {
        try {
            return this.productService.deleteProduct(productId);
        }
        catch (err) {
            throw err;
        }
    }
    deleteFile(filePath) {
        try {
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Post)('create_product'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: file_upload_config_1.destination,
            filename: file_upload_config_1.fileName,
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _b : Object, Object, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Patch)('update_product'),
    (0, common_1.HttpCode)(202),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: file_upload_config_1.fileFilter,
        storage: (0, multer_1.diskStorage)({
            destination: file_upload_config_1.destination,
            filename: file_upload_config_1.fileName,
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            new common_1.FileTypeValidator({ fileType: /\.(jpg|jpeg|png|gif)$/ }),
        ],
    }), new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /\.(jpg|jpeg|png|gif)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 4,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_product/:productId'),
    (0, common_1.HttpCode)(202),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_file/:filePath'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteFile", null);
ProductController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),
/* 121 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProductDto = void 0;
const class_validator_1 = __webpack_require__(18);
class CreateProductDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "colours", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categories", void 0);
exports.CreateProductDto = CreateProductDto;


/***/ }),
/* 123 */
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destination = exports.fileFilter = exports.fileName = void 0;
const path_1 = __importStar(__webpack_require__(105));
const fs_1 = __webpack_require__(106);
const uuid_1 = __webpack_require__(53);
const fileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const ext = (0, path_1.extname)(file.originalname);
    const randomName = (0, uuid_1.v4)();
    callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
};
exports.fileName = fileName;
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    const filetypes = /\.(jpg|jpeg|png|gif)$/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return callback(null, true);
    }
    return callback(new Error('Only image files are allowed!'), false);
};
exports.fileFilter = fileFilter;
const destination = (req, file, callback) => {
    try {
        const destination = path_1.default.join(__dirname, 'static', 'products', `${req.body.title}`);
        const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${req.body.title}`, file.fieldname);
        if (!(0, fs_1.existsSync)(destination)) {
            (0, fs_1.mkdirSync)(destination);
        }
        if (!(0, fs_1.existsSync)(imagesPath)) {
            (0, fs_1.mkdirSync)(imagesPath);
        }
        callback(null, imagesPath);
    }
    catch (err) {
        throw err;
    }
};
exports.destination = destination;


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProductDto = void 0;
const class_validator_1 = __webpack_require__(18);
class UpdateProductDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "colours", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "categories", void 0);
exports.UpdateProductDto = UpdateProductDto;


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesModule = void 0;
const common_1 = __webpack_require__(7);
const categories_service_1 = __webpack_require__(119);
const categories_controller_1 = __webpack_require__(127);
const config_1 = __webpack_require__(95);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const auth_module_1 = __webpack_require__(76);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const owner_module_1 = __webpack_require__(90);
const product_model_1 = __webpack_require__(35);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const users_module_1 = __webpack_require__(108);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const product_module_1 = __webpack_require__(116);
const initialize_user_middleware_1 = __webpack_require__(114);
let CategoriesModule = class CategoriesModule {
    configure(consumer) {
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'categories/create_category', method: common_1.RequestMethod.PUT }, { path: 'categories/delete_category', method: common_1.RequestMethod.DELETE });
    }
};
CategoriesModule = __decorate([
    (0, common_1.Module)({
        providers: [categories_service_1.CategoriesService],
        controllers: [categories_controller_1.CategoriesController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], CategoriesModule);
exports.CategoriesModule = CategoriesModule;


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const throttler_1 = __webpack_require__(67);
const roles_auth_decorator_1 = __webpack_require__(68);
const add_content_guard_1 = __webpack_require__(93);
const jw_refresh_guard_1 = __webpack_require__(71);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(70);
const roles_guard_1 = __webpack_require__(69);
const throttler_behind_proxy_guard_1 = __webpack_require__(66);
const error_handler_filter_1 = __webpack_require__(73);
const categories_service_1 = __webpack_require__(119);
const create_category_dto_1 = __webpack_require__(128);
const category_model_1 = __webpack_require__(39);
const api_exception_filter_1 = __webpack_require__(75);
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getCategories() {
        return this.categoriesService.getCategories();
    }
    createCategory(categoryDto) {
        return this.categoriesService.createCategory(categoryDto);
    }
    deleteCategory(categoryId) {
        return this.categoriesService.deleteCategory(categoryId);
    }
};
__decorate([
    (0, throttler_1.Throttle)(700, 7000),
    (0, common_1.CacheTTL)(200),
    (0, common_1.Get)('get_categoties'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating Categories' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: category_model_1.Category }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Put)('create_category'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_category_dto_1.CreateCategoryDto !== "undefined" && create_category_dto_1.CreateCategoryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.HttpCode)(200),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Delete)('delete_category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "deleteCategory", null);
CategoriesController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [typeof (_a = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _a : Object])
], CategoriesController);
exports.CategoriesController = CategoriesController;


/***/ }),
/* 128 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCategoryDto = void 0;
const class_validator_1 = __webpack_require__(18);
class CreateCategoryDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "description", void 0);
exports.CreateCategoryDto = CreateCategoryDto;


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartModule = void 0;
const common_1 = __webpack_require__(7);
const cart_service_1 = __webpack_require__(130);
const cart_controller_1 = __webpack_require__(131);
const config_1 = __webpack_require__(95);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const cart_model_1 = __webpack_require__(34);
const auth_module_1 = __webpack_require__(76);
const product_module_1 = __webpack_require__(116);
const users_module_1 = __webpack_require__(108);
const cart_item_model_1 = __webpack_require__(36);
const categories_module_1 = __webpack_require__(126);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
const product_model_1 = __webpack_require__(35);
const orders_module_1 = __webpack_require__(132);
let CartModule = class CartModule {
};
CartModule = __decorate([
    (0, common_1.Module)({
        providers: [cart_service_1.CardService],
        controllers: [cart_controller_1.CardController],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_item_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], CartModule);
exports.CartModule = CartModule;


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardService = void 0;
const common_1 = __webpack_require__(7);
let CardService = class CardService {
};
CardService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
], CardService);
exports.CardService = CardService;


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CardController = void 0;
const common_1 = __webpack_require__(7);
const api_exception_filter_1 = __webpack_require__(75);
const error_handler_filter_1 = __webpack_require__(73);
let CardController = class CardController {
};
CardController = __decorate([
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Controller)('card')
], CardController);
exports.CardController = CardController;


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersModule = void 0;
const common_1 = __webpack_require__(7);
const orders_service_1 = __webpack_require__(133);
const orders_controller_1 = __webpack_require__(134);
const sequelize_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(76);
const roles_model_1 = __webpack_require__(30);
const user_roles_model_1 = __webpack_require__(32);
const roles_module_1 = __webpack_require__(91);
const user_model_1 = __webpack_require__(33);
const user_refresh_token_model_1 = __webpack_require__(41);
const users_module_1 = __webpack_require__(108);
const categories_module_1 = __webpack_require__(126);
const config_1 = __webpack_require__(95);
const admin_model_1 = __webpack_require__(27);
const admin_refresh_token_model_1 = __webpack_require__(43);
const cart_module_1 = __webpack_require__(129);
const cart_item_model_1 = __webpack_require__(36);
const cart_model_1 = __webpack_require__(34);
const category_model_1 = __webpack_require__(39);
const product_categories_model_1 = __webpack_require__(40);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(42);
const product_model_1 = __webpack_require__(35);
const order_model_1 = __webpack_require__(37);
const order_product_model_1 = __webpack_require__(38);
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    (0, common_1.Module)({
        providers: [orders_service_1.OrdersService],
        controllers: [orders_controller_1.OrdersController],
        imports: [
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                category_model_1.Category,
                product_categories_model_1.ProductCategories,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_item_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(7);
let OrdersService = class OrdersService {
};
OrdersService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(7);
const api_exception_filter_1 = __webpack_require__(75);
const error_handler_filter_1 = __webpack_require__(73);
let OrdersController = class OrdersController {
};
OrdersController = __decorate([
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Controller)('orders')
], OrdersController);
exports.OrdersController = OrdersController;


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InitializeEmailMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const decorators_1 = __webpack_require__(78);
const admin_service_1 = __webpack_require__(24);
const owner_service_1 = __webpack_require__(52);
const users_service_1 = __webpack_require__(44);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(47);
let InitializeEmailMiddleware = class InitializeEmailMiddleware {
    constructor(ownerService, adminService, userService) {
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
    }
    use(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const email = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email;
            try {
                if (!email) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', auth_constants_1.EMAIL_NOT_PROVIDED);
                }
                const owner = yield this.ownerService.getOwnerByEmail(email);
                if (owner) {
                    req['codeDto'] = { email: owner.email, type: 'OWNER' };
                    return next();
                }
                const admin = yield this.adminService.getAdminByEmail(email);
                if (admin) {
                    req['codeDto'] = { email: admin.email, type: 'ADMIN' };
                    return next();
                }
                const user = yield this.userService.getUserByEmail(email);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', auth_constants_1.USER_WITH_EMAIL_NOT_FOUND);
                }
                res.setHeader('X-Content-Type-Options', 'nosniff');
                req['codeDto'] = { email: user.email, type: null };
                return next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, decorators_1.Res)()),
    __param(2, (0, decorators_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], InitializeEmailMiddleware.prototype, "use", null);
InitializeEmailMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object, typeof (_b = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _b : Object, typeof (_c = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _c : Object])
], InitializeEmailMiddleware);
exports.InitializeEmailMiddleware = InitializeEmailMiddleware;


/***/ }),
/* 136 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivateMiddleware = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const express_1 = __webpack_require__(20);
const auth_constants_1 = __webpack_require__(12);
const admin_model_1 = __webpack_require__(27);
const owner_model_1 = __webpack_require__(31);
const api_exception_1 = __webpack_require__(47);
let ActivateMiddleware = class ActivateMiddleware {
    constructor(adminRepository, ownerRepository) {
        this.adminRepository = adminRepository;
        this.ownerRepository = ownerRepository;
    }
    use(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activationLink = (_a = req.params) === null || _a === void 0 ? void 0 : _a.link;
                const code = Number((_b = req.query) === null || _b === void 0 ? void 0 : _b.code);
                if (!activationLink || !code) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.ACTIVTING_PARAMS_NOT_PROVIDED);
                }
                res.setHeader('X-Content-Type-Options', 'nosniff');
                const owner = yield this.ownerRepository.findOne({
                    where: {
                        resetToken: activationLink,
                    },
                });
                if (owner &&
                    !owner.getIsActivated() &&
                    Number(Date.now()) < owner.getResetTokenExpiration() &&
                    code === owner.getActivationCode()) {
                    req['activationLink'] = owner.activationLink;
                    req['type'] = 'OWNER';
                    return next();
                }
                const admin = yield this.adminRepository.findOne({
                    where: {
                        resetToken: activationLink,
                    },
                });
                if (admin &&
                    !admin.getIsActivated() &&
                    Number(Date.now()) < admin.getResetTokenExpiration() &&
                    code === admin.getActivationCode()) {
                    req['type'] = 'ADMIN';
                    req['activationLink'] = admin.activationLink;
                    return next();
                }
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_PARAMS);
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ActivateMiddleware.prototype, "use", null);
ActivateMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __param(1, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, Object])
], ActivateMiddleware);
exports.ActivateMiddleware = ActivateMiddleware;


/***/ }),
/* 137 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAdminMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const auth_constants_1 = __webpack_require__(12);
const user_constants_1 = __webpack_require__(46);
const uuid_1 = __webpack_require__(53);
const users_service_1 = __webpack_require__(44);
const api_exception_1 = __webpack_require__(47);
let UserAdminMiddleware = class UserAdminMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    use(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name;
                const surname = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.surname;
                const email = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email;
                const phoneNumber = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.phoneNumber;
                const isAdmin = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.isAdmin;
                const addContent = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.addContent;
                const editContent = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.editContent;
                const editWebSite = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.editWebSite;
                if (!name ||
                    !surname ||
                    !phoneNumber ||
                    !email ||
                    !isAdmin.toString() ||
                    !addContent.toString() ||
                    !editContent.toString() ||
                    !editWebSite.toString()) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_PARAMS);
                }
                const user = yield this.userService.getUserByEmail(email);
                if (user.phoneNumber === phoneNumber) {
                    req.body.password = user.getPassword();
                    req.body.activationLink = (0, uuid_1.v4)();
                    return next();
                }
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UserAdminMiddleware.prototype, "use", null);
UserAdminMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UserAdminMiddleware);
exports.UserAdminMiddleware = UserAdminMiddleware;


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminUserMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const admin_constants_1 = __webpack_require__(26);
const auth_constants_1 = __webpack_require__(12);
const admin_service_1 = __webpack_require__(24);
const api_exception_1 = __webpack_require__(47);
let AdminUserMiddleware = class AdminUserMiddleware {
    constructor(adminService) {
        this.adminService = adminService;
    }
    use(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const name = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.name;
                const surname = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.surname;
                const email = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.email;
                const phoneNumber = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.phoneNumber;
                const isAdmin = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.isAdmin;
                const addContent = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.addContent;
                const editContent = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.editContent;
                const editWebSite = (_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.editWebSite;
                if (!name ||
                    !surname ||
                    !phoneNumber ||
                    !email ||
                    !isAdmin.toString() ||
                    !addContent.toString() ||
                    !editContent.toString() ||
                    !editWebSite.toString()) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_PARAMS);
                }
                const admin = yield this.adminService.getAdminByEmail(email);
                if (admin.phoneNumber === phoneNumber) {
                    req.body.password = admin.getPassword();
                    req.body.activationLink = admin.activationLink;
                    return next();
                }
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_NOT_FOUND);
            }
            catch (err) {
                return next(err);
            }
        });
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AdminUserMiddleware.prototype, "use", null);
AdminUserMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], AdminUserMiddleware);
exports.AdminUserMiddleware = AdminUserMiddleware;


/***/ }),
/* 139 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/serve-static");

/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const geoip_lite_1 = __importDefault(__webpack_require__(141));
const ip_1 = __importDefault(__webpack_require__(142));
let CorsMiddleware = class CorsMiddleware {
    use(req, res, next) {
        const headers = JSON.parse(JSON.stringify(req.headers));
        const isEmpty = this.isEmpty(headers);
        const ipAddress = ip_1.default.address();
        const geo = geoip_lite_1.default.lookup(ipAddress);
        console.log(geo, ipAddress);
        const requesAPI = req.ip;
        req['region'] = 'ua';
        if (isEmpty) {
            throw new common_1.BadRequestException({
                message: 'No request headers were provided!',
            });
        }
        res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL.toString().trim()}`);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.setHeader('Content-Security-Policy', 'default-src \'self\'; font-src \'self\'; img-src \'self\'; script-src \'self\'; style-src \'self\'; frame-src \'self\'');
        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }
        return next();
    }
    isEmpty(object) {
        for (const prop in object) {
            if (Object.prototype.hasOwnProperty.call(object, prop)) {
                return false;
            }
        }
        return JSON.stringify(object) === JSON.stringify({});
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CorsMiddleware.prototype, "use", null);
CorsMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;


/***/ }),
/* 141 */
/***/ ((module) => {

"use strict";
module.exports = require("geoip-lite");

/***/ }),
/* 142 */
/***/ ((module) => {

"use strict";
module.exports = require("ip");

/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const path_1 = __importDefault(__webpack_require__(105));
const rxjs_1 = __webpack_require__(99);
const express_1 = __webpack_require__(20);
let AppController = class AppController {
    serveStatic(response) {
        const directoryPath = path_1.default.join(__dirname, 'static');
    }
    sse() {
        return (0, rxjs_1.timeout)(1000).apply((0, rxjs_1.map)((_) => ({ data: { hello: 'world' } })));
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "serveStatic", null);
__decorate([
    (0, common_1.Sse)('sse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _b : Object)
], AppController.prototype, "sse", null);
AppController = __decorate([
    (0, swagger_1.ApiTags)('/'),
    (0, common_1.Controller)('/:path')
], AppController);
exports.AppController = AppController;


/***/ }),
/* 144 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var TelegramModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramModule = void 0;
const common_1 = __webpack_require__(7);
const telegram_constants_1 = __webpack_require__(145);
const telegram_service_1 = __webpack_require__(146);
let TelegramModule = TelegramModule_1 = class TelegramModule {
    static forRootAsync(options) {
        const asyncOptions = TelegramModule_1.createAsyncOptionsProvider(options);
        return {
            module: TelegramModule_1,
            imports: options.imports,
            providers: [telegram_service_1.TelegramService, asyncOptions],
            exports: [telegram_service_1.TelegramService],
        };
    }
    static createAsyncOptionsProvider(options) {
        return {
            provide: telegram_constants_1.TELEGRAM_MODULE_OPTIONS,
            useFactory: (...args) => __awaiter(this, void 0, void 0, function* () {
                const config = yield options.useFactory(...args);
                return config;
            }),
            inject: options.inject || [],
        };
    }
};
TelegramModule = TelegramModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], TelegramModule);
exports.TelegramModule = TelegramModule;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TELEGRAM_MODULE_OPTIONS = void 0;
exports.TELEGRAM_MODULE_OPTIONS = 'TELEGRAM_MODULE_OPTIONS';


/***/ }),
/* 146 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TelegramService = void 0;
const common_1 = __webpack_require__(7);
const telegraf_1 = __webpack_require__(147);
const telegram_constants_1 = __webpack_require__(145);
const telegram_interface_1 = __webpack_require__(148);
let TelegramService = class TelegramService {
    constructor(options) {
        this.bot = new telegraf_1.Telegraf(options.token);
        this.options = options;
    }
    sendMessage(message, chatId = this.options.chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bot.telegram.sendMessage(chatId, message);
        });
    }
};
TelegramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(telegram_constants_1.TELEGRAM_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [typeof (_a = typeof telegram_interface_1.ITelegramOptions !== "undefined" && telegram_interface_1.ITelegramOptions) === "function" ? _a : Object])
], TelegramService);
exports.TelegramService = TelegramService;


/***/ }),
/* 147 */
/***/ ((module) => {

"use strict";
module.exports = require("telegraf");

/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTelegramConfig = void 0;
const getTelegramConfig = () => {
    var _a;
    const token = process.env.TG_TOKEN.trim();
    if (!token) {
        throw new Error('TELEGRAM_TOKEN not provided!');
    }
    return {
        token,
        chatId: (_a = process.env.TG_CHAT_ID.trim()) !== null && _a !== void 0 ? _a : '',
    };
};
exports.getTelegramConfig = getTelegramConfig;


/***/ }),
/* 150 */
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),
/* 151 */
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),
/* 152 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("7710c97f997b8246fdb0")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			0: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no chunk install function needed
/******/ 		
/******/ 		// no chunk loading
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	__webpack_require__(0);
/******/ 	var __webpack_exports__ = __webpack_require__(3);
/******/ 	
/******/ })()
;