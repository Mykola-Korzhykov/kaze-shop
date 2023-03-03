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
const helmet_1 = __importDefault(__webpack_require__(192));
const compression_1 = __importDefault(__webpack_require__(193));
const cookie_parser_1 = __importDefault(__webpack_require__(194));
const serve_favicon_1 = __importDefault(__webpack_require__(195));
const cluster_service_1 = __webpack_require__(113);
const common_1 = __webpack_require__(7);
const all_exceptions_filter_1 = __webpack_require__(110);
const error_handler_filter_1 = __webpack_require__(88);
const api_exception_filter_1 = __webpack_require__(90);
const path_1 = __webpack_require__(73);
const body_parser_1 = __importDefault(__webpack_require__(196));
const PORT = Number(process.env.PORT) || 2222;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            bodyParser: true,
            bufferLogs: true,
            autoFlushLogs: true,
            forceCloseConnections: true,
            rawBody: true,
        });
        app.flushLogs();
        const httpAdapter = app.get(core_1.HttpAdapterHost);
        app.enableShutdownHooks();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }));
        app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter(httpAdapter), new error_handler_filter_1.ApiErrorExceptionFilter(), new api_exception_filter_1.ApiExceptionFilter());
        app.set('trust proxy', true);
        app.use((0, serve_favicon_1.default)((0, path_1.join)(__dirname, 'static', 'favicon', 'favicon.ico')));
        app.useStaticAssets((0, path_1.join)(__dirname, 'static'), {
            prefix: '/public',
            lastModified: true,
            immutable: true,
            etag: true,
            redirect: true,
            fallthrough: true,
            maxAge: 30 * 24 * 60,
            setHeaders(res, path, stat) {
                res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL.toString().trim()}`);
                res.setHeader('Content-size', `${stat.size}`);
                res.setHeader('Content-Type', `image/${(0, path_1.extname)(path).replace('.', '')}`);
                res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.setHeader('Access-Control-Allow-Headers', 'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
                res.setHeader('Content-Security-Policy', `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'`);
            },
        });
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, helmet_1.default)());
        app.use(helmet_1.default.xssFilter());
        app.use(helmet_1.default.hsts({
            maxAge: 2629746000,
        }));
        app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
        app.use(helmet_1.default.referrerPolicy({ policy: 'same-origin' }));
        app.use((0, cookie_parser_1.default)(process.env.SECRET_KEY.toString().trim()));
        app.enableCors({
            origin: `${process.env.CLIENT_URL.toString().trim()}`,
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
            console.log(reason);
            console.log('UNHANDLED REJECTION! Shutting down...');
            return process.exit(1), reason;
        });
        process.on('uncaughtException', (err) => {
            console.log(err.name, err.message);
            console.log('UNCAUGHT EXCEPTION! Shutting down...');
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
const config_1 = __webpack_require__(108);
const admin_model_1 = __webpack_require__(28);
const auth_module_1 = __webpack_require__(91);
const cluster_service_1 = __webpack_require__(113);
const throttler_1 = __webpack_require__(82);
const path_1 = __importDefault(__webpack_require__(73));
const admin_refresh_token_model_1 = __webpack_require__(49);
const mail_module_1 = __webpack_require__(121);
const cors_middleware_1 = __webpack_require__(180);
const core_1 = __webpack_require__(4);
const all_exceptions_filter_1 = __webpack_require__(110);
const global_interceptor_1 = __webpack_require__(111);
const core_module_1 = __webpack_require__(109);
const product_module_1 = __webpack_require__(130);
const users_module_1 = __webpack_require__(122);
const owner_module_1 = __webpack_require__(103);
const orders_module_1 = __webpack_require__(158);
const cart_module_1 = __webpack_require__(153);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const app_controller_1 = __webpack_require__(183);
const telegram_module_1 = __webpack_require__(185);
const telegram_config_1 = __webpack_require__(186);
const categories_colours_module_1 = __webpack_require__(147);
const product_model_1 = __webpack_require__(32);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const platform_express_1 = __webpack_require__(138);
const bull_1 = __webpack_require__(170);
const reviews_module_1 = __webpack_require__(187);
const review_model_1 = __webpack_require__(45);
const product_reviews_model_1 = __webpack_require__(46);
const bookmark_products_1 = __webpack_require__(40);
const watched_products_model_1 = __webpack_require__(41);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const location_middleware_1 = __webpack_require__(191);
const scedule_service_1 = __webpack_require__(69);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const file_service_1 = __webpack_require__(116);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(cors_middleware_1.CorsMiddleware, location_middleware_1.LocationMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [
            file_service_1.FilesService,
            scedule_service_1.TasksService,
            axios_1.HttpModule,
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
            axios_1.HttpModule.register({
                withCredentials: true,
                responseEncoding: 'utf8',
                responseType: 'json',
            }),
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
            bull_1.BullModule.forRoot({
                limiter: {
                    max: 5,
                    duration: 10000,
                    bounceBack: true,
                },
                redis: {
                    host: process.env.REDIS_HOST.toString(),
                    port: Number(process.env.REDIS_PORT),
                    db: 1,
                    password: process.env.REDIS_PASSWORD.toString(),
                    lazyConnect: false,
                },
                settings: {
                    lockDuration: 30000,
                    lockRenewTime: 15000,
                    stalledInterval: 30000,
                    maxStalledCount: 1,
                    guardInterval: 5000,
                    retryProcessDelay: 5000,
                    drainDelay: 5,
                },
            }),
            platform_express_1.MulterModule.register({
                dest: './static',
                fileFilter(req, file, callback) {
                    const filetypes = /\.(jpg|jpeg|png|gif)$/;
                    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
                    const mimetype = filetypes.test(file.mimetype);
                    if (mimetype && extname) {
                        return callback(null, true);
                    }
                    return callback(new Error('Only image files are allowed!'), false);
                },
                preservePath: true,
                limits: {
                    fileSize: 12282810,
                },
            }),
            sequelize_1.SequelizeModule.forFeature([product_model_1.Product]),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.PGHOST.toString(),
                port: Number(process.env.PGPORT),
                username: process.env.PGUSER.toString(),
                password: process.env.PGPASSWORD.toString(),
                database: process.env.PGDATABASE.toString(),
                models: [
                    product_reviews_model_1.ProductReviews,
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
                    cart_product_model_1.CartProduct,
                    review_model_1.Review,
                    bookmark_products_1.BookmarksProducts,
                    watched_products_model_1.WatchedProducts,
                    currencies_model_1.Currencies,
                    colours_model_1.Colour,
                    product_colour_model_1.ProductColours,
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
            categories_colours_module_1.CategoriesColoursModule,
            reviews_module_1.ReviewsModule,
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
const admin_service_1 = __webpack_require__(60);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(28);
const auth_module_1 = __webpack_require__(91);
const jwt_1 = __webpack_require__(16);
const admin_refresh_token_model_1 = __webpack_require__(49);
const jwt_refresh_service_1 = __webpack_require__(76);
const owner_module_1 = __webpack_require__(103);
const mail_service_1 = __webpack_require__(21);
const initialize_user_middleware_1 = __webpack_require__(128);
const owner_service_1 = __webpack_require__(61);
const owner_model_1 = __webpack_require__(31);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const owner_refresh_token_model_1 = __webpack_require__(47);
const users_module_1 = __webpack_require__(122);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const user_admin_middleware_1 = __webpack_require__(178);
const body_validator_pipe_1 = __importDefault(__webpack_require__(129));
const create_admin_dto_1 = __webpack_require__(78);
const config_1 = __webpack_require__(108);
const admin_user_middleware_1 = __webpack_require__(179);
const core_module_1 = __webpack_require__(109);
const scedule_service_1 = __webpack_require__(69);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const product_model_1 = __webpack_require__(32);
const users_service_1 = __webpack_require__(24);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const currency_service_1 = __webpack_require__(63);
const cart_module_1 = __webpack_require__(153);
const cart_service_1 = __webpack_require__(154);
const mail_module_1 = __webpack_require__(121);
const product_module_1 = __webpack_require__(130);
const categories_colours_module_1 = __webpack_require__(147);
const product_service_1 = __webpack_require__(131);
const file_service_1 = __webpack_require__(116);
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
            axios_1.HttpModule,
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
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_ADMIN_SECRET.toString().trim() ||
                    'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
                signOptions: {
                    expiresIn: 172800000,
                },
            }),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => AdminModule_1),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
        ],
        providers: [
            file_service_1.FilesService,
            cart_service_1.CartService,
            scedule_service_1.TasksService,
            admin_service_1.AdminService,
            jwt_refresh_service_1.AdminJwtRefreshService,
            mail_service_1.MailService,
            owner_service_1.OwnerService,
            admin_service_1.AdminService,
            users_service_1.UsersService,
            currency_service_1.CurrencyService,
            product_service_1.ProductService,
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
const create_admin_dto_1 = __webpack_require__(78);
const admin_model_1 = __webpack_require__(28);
const admin_service_1 = __webpack_require__(60);
const validation_pipe_1 = __webpack_require__(79);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const roles_auth_decorator_1 = __webpack_require__(83);
const roles_guard_1 = __webpack_require__(84);
const owner_admin_guard_1 = __webpack_require__(85);
const jw_refresh_guard_1 = __webpack_require__(86);
const throttler_1 = __webpack_require__(82);
const pipes_1 = __webpack_require__(87);
const error_handler_filter_1 = __webpack_require__(88);
const api_exception_filter_1 = __webpack_require__(90);
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
const api_exception_1 = __webpack_require__(52);
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
    ua: 'Термін активації минув!',
};
exports.LANGUAGE_NOT_PROVIDED = {
    en: 'No language provided!',
    ua: 'Немає мови!',
    ru: 'Язык не указан!',
    rs: 'Није наведен језик!',
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
    rs: 'Параметри за активирање нису обезбеђени!',
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
var AuthService_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
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
const admin_service_1 = __webpack_require__(60);
const owner_service_1 = __webpack_require__(61);
const jwt_refresh_service_1 = __webpack_require__(68);
const users_service_1 = __webpack_require__(24);
const jwt_refresh_service_2 = __webpack_require__(75);
const jwt_refresh_service_3 = __webpack_require__(76);
const user_model_1 = __webpack_require__(38);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(28);
const user_constants_1 = __webpack_require__(50);
const change_password_dto_1 = __webpack_require__(77);
const uuid_1 = __webpack_require__(59);
const api_exception_1 = __webpack_require__(52);
const jwt_refresh_constants_1 = __webpack_require__(55);
const event_emitter_1 = __webpack_require__(70);
const schedule_1 = __webpack_require__(62);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(72);
let AuthService = AuthService_1 = class AuthService {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, ownerService, adminService, userService, mailService, schedulerRegistry, eventEmitter, jwtService, userJwtRefreshTokenService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.userService = userService;
        this.mailService = mailService;
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
        this.jwtService = jwtService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.Logger = new common_1.Logger(AuthService_1.name);
    }
    login(userDto, response, request, next, userAgent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = request.headers.authorization;
                if (!authHeader) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
                }
                const cartIdentifier = request.signedCookies['_id'];
                const user = yield this.authenticateUser(userDto, userAgent, false, cartIdentifier);
                const tokens = yield this.generateTokens(user, userAgent);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
                    sameSite: 'strict',
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
                const identifier = request.signedCookies['_id'];
                const user = yield this.authenticateUser(userDto, userAgent, true, identifier);
                const tokens = yield this.generateTokens(user, userAgent);
                yield this.activateUser(user, response);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
                    sameSite: 'strict',
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
                let logout;
                if (type && type === 'OWNER') {
                    response.clearCookie('user-id');
                    response.clearCookie('refreshToken');
                    logout = yield this.ownerJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                if (type && type === 'ADMIN') {
                    response.clearCookie('user-id');
                    response.clearCookie('refreshToken');
                    logout = yield this.adminJwtRefreshTokenService.removeToken(decodedToken);
                    return response.json({ logout });
                }
                logout = yield this.userJwtRefreshTokenService.removeToken(decodedToken);
                response.clearCookie('refreshToken');
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
                const dto = yield this.validateRefreshToken(refreshToken, type);
                if (!dto.user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const tokens = yield this.refreshTokens(dto.user, userAgent, dto.identifier);
                response.cookie('refreshToken', tokens.refreshToken, {
                    maxAge: Number(tokens.expireDate),
                    path: '/',
                    httpOnly: true,
                    expires: tokens.expireDate,
                    sameSite: 'strict',
                });
                yield this.activateUser(dto.user, response);
                return response.json(Object.assign({}, this.setResponse(tokens, dto.user)));
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
                yield this.activateUser(user, response);
                return response.redirect(process.env.CLIENT_URL.toString());
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
                user: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    type: 'OWNER',
                },
            };
        }
        if (user instanceof admin_model_1.Admin) {
            return {
                accessToken: tokens.accessToken,
                user: {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    type: 'ADMIN',
                },
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
                type: 'USER',
            },
        };
    }
    generateTokens(user, userAgent) {
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
                dbToken = yield this.userJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)));
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
                dbToken = yield this.adminJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)));
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
                dbToken = yield this.ownerJwtRefreshTokenService.insertToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)));
            }
            const encodedRefreshToken = Buffer.from(refreshToken, 'utf8').toString('base64');
            const encodedAccessToken = Buffer.from(accessToken, 'utf8').toString('base64');
            this.setTimeouts(user, refreshToken, dbToken.identifier);
            return {
                expireDate: dbToken.getExpireDate(),
                refreshToken: encodedRefreshToken,
                accessToken: encodedAccessToken,
            };
        });
    }
    refreshTokens(user, userAgent, identifier) {
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
                dbToken = yield this.userJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, new Date(new Date().setDate(new Date().getDate() + 7)), identifier);
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
                dbToken = yield this.adminJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 2)), identifier);
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
                dbToken = yield this.ownerJwtRefreshTokenService.saveToken(user.id, refreshToken, user.email, userAgent, user.phoneNumber, new Date(new Date().setDate(new Date().getDate() + 1)), identifier);
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
    authenticateUser(userDto, userAgent, isNew, cartIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerService.validateOwner({
                email: userDto.email,
                password: userDto.password,
            }, cartIdentifier);
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
            }, cartIdentifier);
            if (admin instanceof admin_model_1.Admin && !admin.getAdminAgent()) {
                admin.setAdminAgent(userAgent);
                yield admin.save();
            }
            if (admin && admin instanceof admin_model_1.Admin) {
                return admin;
            }
            if (isNew &&
                cartIdentifier &&
                'name' in userDto &&
                'surname' in userDto &&
                'phoneNumber' in userDto &&
                'email' in userDto &&
                'password' in userDto &&
                'confirmPassword' in userDto) {
                const user = yield this.userService.initializeUser(userDto, cartIdentifier);
                return user;
            }
            const user = yield this.userService.validateUser(userDto, cartIdentifier);
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
                const dbToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                if (!dbToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                return {
                    user: owner,
                    identifier: dbToken.token.getIdentifier(),
                };
            }
            if (type && type === 'ADMIN') {
                const adminData = yield this.adminJwtRefreshTokenService.validateRefreshToken(decodedToken);
                if (!adminData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.ADMIN_NOT_AUTHORIZIED);
                }
                const admin = yield this.adminService.getAdminById(adminData.adminId);
                const dbToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                if (!dbToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
                }
                return {
                    user: admin,
                    identifier: dbToken.token.getIdentifier(),
                };
            }
            const userData = yield this.userJwtRefreshTokenService.validateRefreshToken(decodedToken);
            if (!userData) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.USER_NOT_AUTHORIZIED);
            }
            const user = yield this.userService.getUserById(userData.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const dbToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
            if (!dbToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', auth_constants_1.OWNER_NOT_AUTHORIZIED);
            }
            return {
                user: user,
                identifier: dbToken.token.getIdentifier(),
            };
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
            if (user instanceof admin_model_1.Admin) {
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                });
            }
            if (user instanceof admin_model_1.Admin && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('ADMIN', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                return this.mailService.sendActivationMailToAdmin(user.email, `${process.env.API_URL}/auth/activate/${user
                    .getResetToken()
                    .trim()}?code=${code}`);
            }
            if (user instanceof owner_model_1.Owner) {
                response.cookie('user-id', user.activationLink, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    signed: true,
                    httpOnly: true,
                    sameSite: 'strict',
                    path: '/',
                });
            }
            if (user instanceof owner_model_1.Owner && !user.getIsActivated()) {
                const link = yield this.generateEncryptedValue('OWNER', 16);
                const code = this.generateConfirmCode();
                user.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                user.setActivationCode(code);
                user.setResetTokenExpiration(Number(Date.now() + 3600000));
                yield user.save();
                this.Logger.log(`activating owner with email ${user.email}`);
                return this.mailService.sendActivationMailToOwner(user.email, `${process.env.API_URL}/auth/activate/${user
                    .getResetToken()
                    .trim()}?code=${code}`);
            }
            return;
        });
    }
    setIsActivated(type, code, activationLink, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (type && type === 'OWNER') {
                user = yield this.ownerService.findByActivationLink(request['activationLink']);
                user.setOwnerAgent(null);
                yield user.save();
            }
            if (type && type === 'ADMIN') {
                user = yield this.adminService.findByActivationLink(request['activationLink']);
                user.setAdminAgent(null);
                yield user.save();
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
    setTimeouts(user, refreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user instanceof user_model_1.User) {
                const refreshData = yield this.userJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-user-refresh-token,: ${(0, uuid_1.v4)()}`, Number(process.env.USER_DELAY), refreshData.id, identifier, this.userJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof admin_model_1.Admin) {
                const refreshData = yield this.adminJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-admin-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.ADMIN_DELAY), refreshData.id, identifier, this.adminJwtRefreshTokenService.removeTokenInTime);
            }
            if (user instanceof owner_model_1.Owner) {
                const refreshData = yield this.ownerJwtRefreshTokenService.findTokenByToken(refreshToken, identifier);
                if (!refreshData) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
                }
                return this.addTimeoutForTokens(`delete-owner-refresh-token: ${(0, uuid_1.v4)()}`, Number(process.env.OWNER_DELAY), refreshData.id, identifier, this.ownerJwtRefreshTokenService.removeTokenInTime);
            }
        });
    }
    addTimeoutForTokens(name, milliseconds, refreshTokenId, identifier, cb) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.Logger.log(`Timeout ${name} executing after (${milliseconds})!`);
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
        this.Logger.warn(`Timeout ${name} executing!`);
        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
        return timeout;
    }
    deleteTimeout(name) {
        this.schedulerRegistry.deleteTimeout(name);
        this.Logger.log(`Timeout ${name} deleted!`);
        return;
    }
};
__decorate([
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _p : Object, String]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], AuthService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object, typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object, typeof (_t = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _t : Object, String]),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], AuthService.prototype, "logout", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object, typeof (_w = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _w : Object, typeof (_x = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _x : Object, String, String]),
    __metadata("design:returntype", typeof (_y = typeof Promise !== "undefined" && Promise) === "function" ? _y : Object)
], AuthService.prototype, "refresh", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _z : Object, typeof (_0 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _0 : Object, typeof (_1 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _1 : Object, String, Number, String, String]),
    __metadata("design:returntype", typeof (_2 = typeof Promise !== "undefined" && Promise) === "function" ? _2 : Object)
], AuthService.prototype, "activate", null);
__decorate([
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_3 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _3 : Object, typeof (_4 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _4 : Object, typeof (_5 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _5 : Object, typeof (_6 = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _6 : Object, Number, String]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "changePassword", null);
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_2.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_2.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_3.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_3.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _c : Object, typeof (_d = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _d : Object, typeof (_e = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _e : Object, typeof (_f = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _f : Object, typeof (_g = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _g : Object, typeof (_h = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _h : Object, typeof (_j = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _j : Object, typeof (_k = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _k : Object])
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
var MailService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const common_1 = __webpack_require__(7);
const mailer_1 = __webpack_require__(22);
const mail_constants_1 = __webpack_require__(23);
const users_service_1 = __webpack_require__(24);
const admin_service_1 = __webpack_require__(60);
const owner_service_1 = __webpack_require__(61);
const api_exception_1 = __webpack_require__(52);
const owner_constants_1 = __webpack_require__(54);
const admin_constants_1 = __webpack_require__(53);
const user_constants_1 = __webpack_require__(50);
let MailService = MailService_1 = class MailService {
    constructor(mailerService, userService, adminService, ownerService) {
        this.mailerService = mailerService;
        this.userService = userService;
        this.adminService = adminService;
        this.ownerService = ownerService;
        this.Logger = new common_1.Logger(MailService_1.name);
    }
    sendActivationMailToOwner(toMail, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerByEmail(toMail);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const info = yield this.mailerService.sendMail({
                    from: process.env.MAILER_USER,
                    to: owner.email,
                    subject: 'Activation of account on ' + process.env.API_URL,
                    text: 'KAZE_SPORT<activating>',
                    html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Новий лист 2</title><!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if !mso]><!-- --><link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><!--<![endif]--><style type="text/css">#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:15px 25px 15px 25px!important;}[data-ogsb] .es-button.es-button-1 {	padding:15px 25px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }</style></head>
<body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F4F4F4"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f4f4f4"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F4F4F4"><tr class="gmail-fix" height="0" style="border-collapse:collapse"><td style="padding:0;Margin:0"><table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"><tr style="border-collapse:collapse"><td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td>
</tr></table></td>
</tr><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#66BB7F;background-repeat:repeat;background-position:center top"><tr style="border-collapse:collapse"><td align="center" bgcolor="#010101" style="padding:0;Margin:0;background-color:#010101"><table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#66BB7F;width:600px"><tr style="border-collapse:collapse"><td align="left" bgcolor="#040404" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;background-color:#040404"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:580px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;background-color:#ffffff" bgcolor="#ffffff" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111">To activate Owner rights, click the button below...</h1>
</td></tr><tr style="border-collapse:collapse"><td bgcolor="#ffffff" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;padding-bottom:15px;padding-left:30px;padding-right:30px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:540px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px"><!--[if mso]><a href="https://viewstripo.email/" target="_blank" hidden> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email/" style="height:54px; v-text-anchor:middle; width:200px" arcsize="4%" strokecolor="#66bb7f" strokeweight="1px" fillcolor="#0d0e0d"> <w:anchorlock></w:anchorlock> <center style='color:#ffffff; font-family:helvetica, "helvetica neue", arial, verdana, sans-serif; font-size:20px; font-weight:400; line-height:20px; mso-text-raise:1px'>Activate Account</center> </v:roundrect></a><![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#66bb7f;background:#0d0e0d;border-width:1px;display:inline-block;border-radius:2px;width:auto;mso-hide:all"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#0d0e0d;border-width:15px 25px;display:inline-block;background:#0d0e0d;border-radius:2px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">Activate Account</a></span><!--<![endif]--></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#111111" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111111"><tr style="border-collapse:collapse"><td class="es-m-txt-l" bgcolor="#111111" align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px;padding-top:35px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#ffffff">Make your website better.</h2>
</td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">You will get the rights to edit and create content on the&nbsp; website.</p></td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" esdev-links-color="#66bb7f" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px"><br></p></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#c0ede0;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#c0ede0"><tr style="border-collapse:collapse"><td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#111111">Need more help?</h3>
</td></tr><tr style="border-collapse:collapse"><td esdev-links-color="#66bb7f" align="center" bgcolor="#333333" style="padding:0;Margin:0;padding-bottom:30px;padding-left:30px;padding-right:30px"><a style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#fefafa;font-size:18px" href="">KAZE_SHOP</a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html> 
        `,
                });
                this.Logger.log('Message sent: %s', info.messageId);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(mail_constants_1.ERORR_WHILE_SENDING_EMAIL);
            }
        });
    }
    sendActivationMailToAdmin(toMail, link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.getAdminByEmail(toMail);
                if (!admin) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_NOT_FOUND);
                }
                const info = yield this.mailerService.sendMail({
                    from: process.env.MAILER_USER,
                    to: admin.email,
                    subject: 'Activation of account on ' + process.env.API_URL,
                    text: 'KAZE_SPORT<activating>',
                    html: `
       <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>Новий лист 2</title><!--[if (mso 16)]><style type="text/css">     a {text-decoration: none;}     </style><![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml><![endif]--><!--[if !mso]><!-- --><link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700,700i" rel="stylesheet"><!--<![endif]--><style type="text/css">#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:15px 25px 15px 25px!important;}[data-ogsb] .es-button.es-button-1 {	padding:15px 25px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:15px 25px 15px 25px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }</style></head>
<body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F4F4F4"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f4f4f4"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F4F4F4"><tr class="gmail-fix" height="0" style="border-collapse:collapse"><td style="padding:0;Margin:0"><table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"><tr style="border-collapse:collapse"><td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td>
</tr></table></td>
</tr><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table class="es-header" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:#66BB7F;background-repeat:repeat;background-position:center top"><tr style="border-collapse:collapse"><td align="center" bgcolor="#010101" style="padding:0;Margin:0;background-color:#010101"><table class="es-header-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#66BB7F;width:600px"><tr style="border-collapse:collapse"><td align="left" bgcolor="#040404" style="Margin:0;padding-bottom:10px;padding-left:10px;padding-right:10px;padding-top:20px;background-color:#040404"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:580px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:25px;padding-bottom:25px;font-size:0"><img src="https://zxkiiu.stripocdn.email/content/guids/CABINET_3df254a10a99df5e44cb27b842c2c69e/images/7331519201751184.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="40"></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;background-color:#ffffff" bgcolor="#ffffff" align="center"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#ffffff;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:35px"><h1 style="Margin:0;line-height:48px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:48px;font-style:normal;font-weight:normal;color:#111111">To activate admin rights, click the button below...</h1>
</td></tr><tr style="border-collapse:collapse"><td bgcolor="#ffffff" align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #ffffff;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;padding-bottom:15px;padding-left:30px;padding-right:30px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:540px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:40px;padding-bottom:40px"><!--[if mso]><a href="https://viewstripo.email/" target="_blank" hidden> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="https://viewstripo.email/" style="height:54px; v-text-anchor:middle; width:200px" arcsize="4%" strokecolor="#66bb7f" strokeweight="1px" fillcolor="#0d0e0d"> <w:anchorlock></w:anchorlock> <center style='color:#ffffff; font-family:helvetica, "helvetica neue", arial, verdana, sans-serif; font-size:20px; font-weight:400; line-height:20px; mso-text-raise:1px'>Activate Account</center> </v:roundrect></a><![endif]--><!--[if !mso]><!-- --><span class="msohide es-button-border" style="border-style:solid;border-color:#66bb7f;background:#0d0e0d;border-width:1px;display:inline-block;border-radius:2px;width:auto;mso-hide:all"><a href="${link}" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#0d0e0d;border-width:15px 25px;display:inline-block;background:#0d0e0d;border-radius:2px;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center">Activate Account</a></span><!--<![endif]--></td>
</tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#111111" width="100%" cellspacing="0" cellpadding="0" bgcolor="#111111"><tr style="border-collapse:collapse"><td class="es-m-txt-l" bgcolor="#111111" align="left" style="padding:0;Margin:0;padding-left:30px;padding-right:30px;padding-top:35px"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:24px;font-style:normal;font-weight:normal;color:#ffffff">Make your website better.</h2>
</td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">You will get the rights to edit and create content on the&nbsp; website.</p></td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" esdev-links-color="#66bb7f" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px"><br></p></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
</tr></table></td></tr></table></td></tr></table></td></tr></table></td>
</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#c0ede0;border-radius:4px" width="100%" cellspacing="0" cellpadding="0" bgcolor="#c0ede0"><tr style="border-collapse:collapse"><td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;padding-top:30px;padding-left:30px;padding-right:30px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:lato, 'helvetica neue', helvetica, arial, sans-serif;font-size:20px;font-style:normal;font-weight:normal;color:#111111">Need more help?</h3>
</td></tr><tr style="border-collapse:collapse"><td esdev-links-color="#66bb7f" align="center" bgcolor="#333333" style="padding:0;Margin:0;padding-bottom:30px;padding-left:30px;padding-right:30px"><a style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#fefafa;font-size:18px" href="">KAZE_SHOP</a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>
        `,
                });
                this.Logger.log('Message sent: %s', info.messageId);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(mail_constants_1.ERORR_WHILE_SENDING_EMAIL);
            }
        });
    }
    sendCode(toMail, code, locale) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserByEmail(toMail);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const info = yield this.mailerService.sendMail({
                    from: process.env.MAILER_USER,
                    to: user.email,
                    subject: 'Reset password on ' + process.env.CLIENT_URL,
                    text: 'KAZE_SPORT<Resetting password>',
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
                this.Logger.log('Message sent: %s', info.messageId);
            }
            catch (err) {
                throw new common_1.InternalServerErrorException(mail_constants_1.ERORR_WHILE_SENDING_EMAIL);
            }
        });
    }
};
MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _c : Object, typeof (_d = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _d : Object])
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
    rs: 'Проблеми са пријављивањем?',
};
exports.RESETTING = {
    en: `Resetting your password is easy. Just  enter the code below to reset your password. We'll have you up and running in no time.`,
    ua: `Скинути пароль легко. Просто введіть код нижче, щоб скинути пароль. Ми підготуємо вас до роботи в найкоротші терміни.`,
    ru: `Сбросить пароль легко. Просто введите код ниже, чтобы сбросить пароль. Мы подготовим вас в кратчайшие сроки.`,
    rs: `Ресетовање лозинке је једноставно. Само унесите код испод да бисте ресетовали лозинку. Оспособићемо вас за кратко време.`,
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const roles_service_1 = __webpack_require__(25);
const user_constants_1 = __webpack_require__(50);
const user_model_1 = __webpack_require__(38);
const bcrypt = __importStar(__webpack_require__(51));
const api_exception_1 = __webpack_require__(52);
const cart_model_1 = __webpack_require__(37);
const cart_constants_1 = __webpack_require__(58);
const uuid_1 = __webpack_require__(59);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
let UsersService = class UsersService {
    constructor(userRepository, roleService, cartRepository) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.cartRepository = cartRepository;
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
                order: [['updatedAt', 'DESC']],
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
    initializeUser(userDto, cartIdentifier) {
        var _a;
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
            let cart;
            if (cartIdentifier) {
                cart = yield this.findCartByIdentifier(cartIdentifier);
            }
            if (cart && cart.cartProducts.length > 0) {
                cart.userId = user.id;
                cart.set('user', user);
                user.$set('leftCarts', cart);
                user.leftCarts = [cart];
                yield cart.save();
            }
            if (cart && ((_a = cart.cartProducts) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                yield this.deleteCartById(cart.id, cart.identifier);
            }
            const identifier = yield this.generateEncryptedValue('USER', 16);
            const newCart = yield this.createCart(identifier);
            user.$set('cart', newCart);
            newCart.userId = user.id;
            user.cart = newCart;
            yield newCart.save();
            yield user.save();
            return user;
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
            user.leftCarts = [];
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
                order: [['updatedAt', 'DESC']],
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
    validateUser(userDto, cartIdentifier) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(userDto.email);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
            }
            const passwordEquals = yield bcrypt.compare(userDto.password, user.getPassword());
            if (!passwordEquals) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
            }
            let cart;
            if (cartIdentifier) {
                cart = yield this.findCartByIdentifier(cartIdentifier);
            }
            if (cart && cart.cartProducts.length > 0) {
                cart.userId = user.id;
                cart.set('user', user);
                user.$add('leftCarts', cart);
                yield cart.save();
            }
            if (cart && ((_a = cart.cartProducts) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                yield this.deleteCartById(cart.id, cart.identifier);
            }
            yield user.save();
            return user;
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
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    deleteCartById(id, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    id: id,
                    identifier: identifier,
                },
            });
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _a : Object, Object])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 25 */
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
const roles_model_1 = __webpack_require__(26);
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
/* 26 */
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
const sequelize_typescript_1 = __webpack_require__(27);
const admin_model_1 = __webpack_require__(28);
const owner_model_1 = __webpack_require__(31);
const user_model_1 = __webpack_require__(38);
const user_roles_model_1 = __webpack_require__(30);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'ROLES' })
], Role);
exports.Role = Role;


/***/ }),
/* 27 */
/***/ ((module) => {

"use strict";
module.exports = require("sequelize-typescript");

/***/ }),
/* 28 */
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
const sequelize_typescript_1 = __webpack_require__(27);
const class_transformer_1 = __webpack_require__(29);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(38);
const admin_refresh_token_model_1 = __webpack_require__(49);
const product_model_1 = __webpack_require__(32);
const cart_model_1 = __webpack_require__(37);
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
    getAdminRefreshTokens() {
        return this.adminRefreshTokens;
    }
    getUser() {
        return this.user;
    }
    addProduct(product) {
        this.products.push(product);
        return this.products;
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
    (0, sequelize_typescript_1.HasOne)(() => cart_model_1.Cart),
    __metadata("design:type", typeof (_a = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _a : Object)
], Admin.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], Admin.prototype, "leftCarts", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Admin.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => admin_refresh_token_model_1.AdminRefreshToken),
    __metadata("design:type", Array)
], Admin.prototype, "adminRefreshTokens", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => roles_model_1.Role, () => user_roles_model_1.UserRoles),
    __metadata("design:type", Array)
], Admin.prototype, "roles", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_model_1.User),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], Admin.prototype, "user", void 0);
Admin = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ADMINS' })
], Admin);
exports.Admin = Admin;


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
exports.UserRoles = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(27);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(28);
const user_model_1 = __webpack_require__(38);
const roles_model_1 = __webpack_require__(26);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'USER`s_Roles', createdAt: false, updatedAt: false })
], UserRoles);
exports.UserRoles = UserRoles;


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
const sequelize_typescript_1 = __webpack_require__(27);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const product_model_1 = __webpack_require__(32);
const owner_refresh_token_model_1 = __webpack_require__(47);
const currencies_model_1 = __webpack_require__(48);
const cart_model_1 = __webpack_require__(37);
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
    getOwnerRefreshTokens() {
        return this.ownerRefreshTokens;
    }
    addProduct(product) {
        this.products.push(product);
        return this.products;
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
    (0, sequelize_typescript_1.HasMany)(() => currencies_model_1.Currencies),
    __metadata("design:type", Array)
], Owner.prototype, "currencies", void 0);
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
    __metadata("design:type", Array)
], Owner.prototype, "ownerRefreshTokens", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => cart_model_1.Cart),
    __metadata("design:type", typeof (_a = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _a : Object)
], Owner.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], Owner.prototype, "leftCarts", void 0);
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const owner_model_1 = __webpack_require__(31);
const admin_model_1 = __webpack_require__(28);
const review_model_1 = __webpack_require__(45);
const product_reviews_model_1 = __webpack_require__(46);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
let Product = class Product extends sequelize_typescript_1.Model {
    getTitle() {
        return JSON.parse(this.title);
    }
    setTitle(title) {
        this.title = JSON.stringify(title);
        return this.title;
    }
    getDescription() {
        return JSON.parse(this.description);
    }
    setDescription(description) {
        this.description = JSON.stringify(description);
        return this.description;
    }
    getSizeChartImageDescription() {
        return JSON.parse(this.sizeChartImageDescription);
    }
    setSizeChartImageDescription(sizeChartImageDescription) {
        this.sizeChartImageDescription = JSON.stringify(sizeChartImageDescription);
        return this.sizeChartImageDescription;
    }
    getColours() {
        return this.colours;
    }
    setColours(colours) {
        this.colours = colours;
        return this.colours;
    }
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
        type: sequelize_typescript_1.DataType.JSONB,
        unique: false,
        allowNull: false,
        field: 'title',
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
        allowNull: false,
        unique: false,
        field: 'description',
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
        unique: false,
        allowNull: false,
        field: 'sizeChartImageDescription',
    }),
    __metadata("design:type", String)
], Product.prototype, "sizeChartImageDescription", void 0);
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
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.JSONB),
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
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL', 'XXL')),
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
        field: 'hexes',
    }),
    __metadata("design:type", Array)
], Product.prototype, "hexes", void 0);
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
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Product.prototype, "adminId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: true }),
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
    (0, sequelize_typescript_1.BelongsToMany)(() => colours_model_1.Colour, () => product_colour_model_1.ProductColours),
    __metadata("design:type", Array)
], Product.prototype, "colours", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => cart_model_1.Cart, () => cart_product_model_1.CartProduct),
    __metadata("design:type", Array)
], Product.prototype, "carts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => order_model_1.Order, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => review_model_1.Review, () => product_reviews_model_1.ProductReviews),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCTS' })
], Product);
exports.Product = Product;


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartProduct = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const colours_model_1 = __webpack_require__(34);
const product_model_1 = __webpack_require__(32);
const cart_model_1 = __webpack_require__(37);
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
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'imageUrl',
    }),
    __metadata("design:type", String)
], CartProduct.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL', 'XXL'),
        unique: false,
        allowNull: true,
        field: 'size',
    }),
    __metadata("design:type", String)
], CartProduct.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => colours_model_1.Colour),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'colourId',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "colourId", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'price',
    }),
    __metadata("design:type", Number)
], CartProduct.prototype, "price", void 0);
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
    (0, sequelize_typescript_1.HasOne)(() => colours_model_1.Colour),
    __metadata("design:type", typeof (_a = typeof colours_model_1.Colour !== "undefined" && colours_model_1.Colour) === "function" ? _a : Object)
], CartProduct.prototype, "colour", void 0);
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
    __metadata("design:type", typeof (_b = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _b : Object)
], CartProduct.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", typeof (_c = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _c : Object)
], CartProduct.prototype, "product", void 0);
CartProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CART_products' })
], CartProduct);
exports.CartProduct = CartProduct;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Colour = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const order_product_model_1 = __webpack_require__(35);
const cart_product_model_1 = __webpack_require__(33);
const product_model_1 = __webpack_require__(32);
const product_colour_model_1 = __webpack_require__(42);
let Colour = class Colour extends sequelize_typescript_1.Model {
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
], Colour.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ua-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "ua", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ru-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "ru", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'en-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "en", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'rs-locale',
    }),
    __metadata("design:type", String)
], Colour.prototype, "rs", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'hex',
    }),
    __metadata("design:type", String)
], Colour.prototype, "hex", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_product_model_1.CartProduct),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        field: 'cartProductId',
    }),
    __metadata("design:type", Number)
], Colour.prototype, "cartProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => order_product_model_1.OrderProduct),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        field: 'orderProductId',
    }),
    __metadata("design:type", Number)
], Colour.prototype, "orderProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => product_colour_model_1.ProductColours),
    __metadata("design:type", Array)
], Colour.prototype, "products", void 0);
Colour = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'COLOURS' })
], Colour);
exports.Colour = Colour;


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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderProduct = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const colours_model_1 = __webpack_require__(34);
const product_model_1 = __webpack_require__(32);
const order_model_1 = __webpack_require__(36);
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
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'imageUrl',
    }),
    __metadata("design:type", String)
], OrderProduct.prototype, "imageUrl", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('S', 'XXS', 'XS', 'M', 'L', 'XL', 'XXL'),
        unique: false,
        allowNull: true,
        field: 'size',
    }),
    __metadata("design:type", String)
], OrderProduct.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => colours_model_1.Colour),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        allowNull: false,
        field: 'colourId',
    }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "colourId", void 0);
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
    (0, sequelize_typescript_1.HasOne)(() => colours_model_1.Colour),
    __metadata("design:type", typeof (_a = typeof colours_model_1.Colour !== "undefined" && colours_model_1.Colour) === "function" ? _a : Object)
], OrderProduct.prototype, "colour", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => order_model_1.Order),
    __metadata("design:type", typeof (_b = typeof order_model_1.Order !== "undefined" && order_model_1.Order) === "function" ? _b : Object)
], OrderProduct.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_model_1.Product),
    __metadata("design:type", typeof (_c = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _c : Object)
], OrderProduct.prototype, "product", void 0);
OrderProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCT_Orders' })
], OrderProduct);
exports.OrderProduct = OrderProduct;


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Order = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const cart_model_1 = __webpack_require__(37);
const product_model_1 = __webpack_require__(32);
const user_model_1 = __webpack_require__(38);
const order_product_model_1 = __webpack_require__(35);
let Order = class Order extends sequelize_typescript_1.Model {
    getCurrency() {
        return JSON.parse(this.currency);
    }
    setCurrency(currency) {
        this.currency = JSON.stringify(currency);
        return this.currency;
    }
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
    getOrderToken() {
        return this.orderToken;
    }
    setOrderToken(orderToken) {
        this.orderToken = orderToken;
        return this.orderToken;
    }
    getOrderTokenExpiration() {
        return this.orderTokenExpiration;
    }
    setOrderTokenExpiration(orderTokenExpiration) {
        this.orderTokenExpiration = orderTokenExpiration;
        return this.orderTokenExpiration;
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
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'userName',
    }),
    __metadata("design:type", String)
], Order.prototype, "userName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'languageCode',
    }),
    __metadata("design:type", String)
], Order.prototype, "languageCode", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
        unique: false,
        allowNull: false,
        field: 'currency',
    }),
    __metadata("design:type", String)
], Order.prototype, "currency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'userSurname',
    }),
    __metadata("design:type", String)
], Order.prototype, "userSurname", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'userEmail',
    }),
    __metadata("design:type", String)
], Order.prototype, "userEmail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'userPhoneNumber',
    }),
    __metadata("design:type", String)
], Order.prototype, "userPhoneNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'country',
    }),
    __metadata("design:type", String)
], Order.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        unique: false,
        allowNull: false,
        field: 'sendDate',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "sendDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'city',
    }),
    __metadata("design:type", String)
], Order.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: true,
        field: 'postOffice',
    }),
    __metadata("design:type", String)
], Order.prototype, "postOffice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        allowNull: false,
        field: 'comment',
    }),
    __metadata("design:type", String)
], Order.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('Canceled', 'Submitted', 'Completed', 'Processing'),
        unique: false,
        field: 'orderStatus',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'orderToken',
    }),
    __metadata("design:type", String)
], Order.prototype, "orderToken", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        unique: true,
        allowNull: true,
        field: 'orderTokenExpiration',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Order.prototype, "orderTokenExpiration", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_model_1.Cart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'cartId',
    }),
    __metadata("design:type", Number)
], Order.prototype, "cartId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'totalPrice',
    }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_c = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _c : Object)
], Order.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_model_1.Cart),
    __metadata("design:type", typeof (_d = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _d : Object)
], Order.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "orderProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => order_product_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ORDERS' })
], Order);
exports.Order = Order;


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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cart = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const order_model_1 = __webpack_require__(36);
const admin_model_1 = __webpack_require__(28);
const owner_model_1 = __webpack_require__(31);
const product_model_1 = __webpack_require__(32);
const user_model_1 = __webpack_require__(38);
const cart_product_model_1 = __webpack_require__(33);
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
    setUser(user) {
        this.user = user;
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
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: false,
        field: 'totalPrice',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "totalPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        field: 'identifier',
    }),
    __metadata("design:type", String)
], Cart.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => admin_model_1.Admin),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'adminId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "adminId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'ownerId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'orderId',
    }),
    __metadata("design:type", Number)
], Cart.prototype, "orderId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Cart.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", typeof (_b = typeof admin_model_1.Admin !== "undefined" && admin_model_1.Admin) === "function" ? _b : Object)
], Cart.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", typeof (_c = typeof owner_model_1.Owner !== "undefined" && owner_model_1.Owner) === "function" ? _c : Object)
], Cart.prototype, "owner", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => order_model_1.Order),
    __metadata("design:type", typeof (_d = typeof order_model_1.Order !== "undefined" && order_model_1.Order) === "function" ? _d : Object)
], Cart.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => cart_product_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_product_model_1.CartProduct),
    __metadata("design:type", Array)
], Cart.prototype, "cartProducts", void 0);
Cart = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CARTS' })
], Cart);
exports.Cart = Cart;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(27);
const cart_model_1 = __webpack_require__(37);
const admin_model_1 = __webpack_require__(28);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const user_refresh_token_model_1 = __webpack_require__(39);
const product_model_1 = __webpack_require__(32);
const bookmark_products_1 = __webpack_require__(40);
const watched_products_model_1 = __webpack_require__(41);
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
        return this.leftCarts;
    }
    getUserRefreshTokens() {
        return this.userRefreshTokens;
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
        unique: true,
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
    __metadata("design:type", Array)
], User.prototype, "userRefreshTokens", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => cart_model_1.Cart),
    __metadata("design:type", typeof (_a = typeof cart_model_1.Cart !== "undefined" && cart_model_1.Cart) === "function" ? _a : Object)
], User.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], User.prototype, "leftCarts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => bookmark_products_1.BookmarksProducts),
    __metadata("design:type", Array)
], User.prototype, "bookmarks", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => watched_products_model_1.WatchedProducts),
    __metadata("design:type", Array)
], User.prototype, "watched", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'USERS' })
], User);
exports.User = User;


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRefreshToken = void 0;
const swagger_1 = __webpack_require__(5);
const sequelize_typescript_1 = __webpack_require__(27);
const user_model_1 = __webpack_require__(38);
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
    getIdentifier() {
        return this.identifier;
    }
    setIdentifier(identifier) {
        this.identifier = identifier;
        return this.identifier;
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
        unique: false,
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
        unique: false,
        allowNull: false,
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
    (0, swagger_1.ApiProperty)({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'identifier',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'identifier',
    }),
    __metadata("design:type", String)
], UserRefreshToken.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", typeof (_b = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _b : Object)
], UserRefreshToken.prototype, "user", void 0);
UserRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'USER`S_Refresh-tokens' })
], UserRefreshToken);
exports.UserRefreshToken = UserRefreshToken;


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
exports.BookmarksProducts = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const user_model_1 = __webpack_require__(38);
const product_model_1 = __webpack_require__(32);
let BookmarksProducts = class BookmarksProducts extends sequelize_typescript_1.Model {
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
], BookmarksProducts.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], BookmarksProducts.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], BookmarksProducts.prototype, "productId", void 0);
BookmarksProducts = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'BOOKMARKS_Products', createdAt: false, updatedAt: false })
], BookmarksProducts);
exports.BookmarksProducts = BookmarksProducts;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WatchedProducts = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const user_model_1 = __webpack_require__(38);
const product_model_1 = __webpack_require__(32);
let WatchedProducts = class WatchedProducts extends sequelize_typescript_1.Model {
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
], WatchedProducts.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'userId',
    }),
    __metadata("design:type", Number)
], WatchedProducts.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], WatchedProducts.prototype, "productId", void 0);
WatchedProducts = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCT_Watched', createdAt: false, updatedAt: false })
], WatchedProducts);
exports.WatchedProducts = WatchedProducts;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductColours = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(32);
const colours_model_1 = __webpack_require__(34);
let ProductColours = class ProductColours extends sequelize_typescript_1.Model {
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
], ProductColours.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => colours_model_1.Colour),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'colourId',
    }),
    __metadata("design:type", Number)
], ProductColours.prototype, "colourId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], ProductColours.prototype, "productId", void 0);
ProductColours = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCT_Colours', createdAt: false, updatedAt: false })
], ProductColours);
exports.ProductColours = ProductColours;


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Category = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(32);
const product_categories_model_1 = __webpack_require__(44);
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
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ua-locale',
    }),
    __metadata("design:type", String)
], Category.prototype, "ua", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'ru-locale',
    }),
    __metadata("design:type", String)
], Category.prototype, "ru", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'en-locale',
    }),
    __metadata("design:type", String)
], Category.prototype, "en", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: false,
        field: 'rs-locale',
    }),
    __metadata("design:type", String)
], Category.prototype, "rs", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => product_categories_model_1.ProductCategories),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'CATEGORIES' })
], Category);
exports.Category = Category;


/***/ }),
/* 44 */
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
const sequelize_typescript_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(32);
const category_model_1 = __webpack_require__(43);
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
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCT_Categories', createdAt: false, updatedAt: false })
], ProductCategories);
exports.ProductCategories = ProductCategories;


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Review = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(32);
const product_reviews_model_1 = __webpack_require__(46);
let Review = class Review extends sequelize_typescript_1.Model {
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
], Review.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        field: 'name',
    }),
    __metadata("design:type", String)
], Review.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        field: 'surname',
    }),
    __metadata("design:type", String)
], Review.prototype, "surname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: false,
        field: 'review',
    }),
    __metadata("design:type", String)
], Review.prototype, "review", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], Review.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => product_reviews_model_1.ProductReviews),
    __metadata("design:type", typeof (_a = typeof product_model_1.Product !== "undefined" && product_model_1.Product) === "function" ? _a : Object)
], Review.prototype, "product", void 0);
Review = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'REVIEWS' })
], Review);
exports.Review = Review;


/***/ }),
/* 46 */
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
exports.ProductReviews = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const product_model_1 = __webpack_require__(32);
const review_model_1 = __webpack_require__(45);
let ProductReviews = class ProductReviews extends sequelize_typescript_1.Model {
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
], ProductReviews.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => review_model_1.Review),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'reviewId',
    }),
    __metadata("design:type", Number)
], ProductReviews.prototype, "reviewId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        field: 'productId',
    }),
    __metadata("design:type", Number)
], ProductReviews.prototype, "productId", void 0);
ProductReviews = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'PRODUCT_Reviews', createdAt: false, updatedAt: false })
], ProductReviews);
exports.ProductReviews = ProductReviews;


/***/ }),
/* 47 */
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
const sequelize_typescript_1 = __webpack_require__(27);
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
    getIdentifier() {
        return this.identifier;
    }
    setIdentifier(identifier) {
        this.identifier = identifier;
        return this.identifier;
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
        unique: false,
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
        unique: false,
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
    (0, swagger_1.ApiProperty)({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'identifier',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'identifier',
    }),
    __metadata("design:type", String)
], OwnerRefreshToken.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", typeof (_b = typeof owner_model_1.Owner !== "undefined" && owner_model_1.Owner) === "function" ? _b : Object)
], OwnerRefreshToken.prototype, "owner", void 0);
OwnerRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'OWNER`s_Refresh-tokens' })
], OwnerRefreshToken);
exports.OwnerRefreshToken = OwnerRefreshToken;


/***/ }),
/* 48 */
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
exports.Currencies = void 0;
const sequelize_typescript_1 = __webpack_require__(27);
const swagger_1 = __webpack_require__(5);
const owner_model_1 = __webpack_require__(31);
let Currencies = class Currencies extends sequelize_typescript_1.Model {
    getAuthor() {
        return this.owner;
    }
    setAuthor(owner) {
        this.owner = owner;
        return this.owner;
    }
    getOwnerId() {
        return this.ownerId;
    }
    setOwnerId(ownerId) {
        this.ownerId = ownerId;
        return this.ownerId;
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
], Currencies.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM('USD'),
        unique: true,
        allowNull: false,
        field: 'base',
    }),
    __metadata("design:type", String)
], Currencies.prototype, "base", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        unique: true,
        allowNull: false,
        field: 'Date',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Currencies.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSONB,
        unique: true,
        allowNull: false,
        field: 'rates',
    }),
    __metadata("design:type", String)
], Currencies.prototype, "rates", void 0);
__decorate([
    sequelize_typescript_1.IsInt,
    (0, sequelize_typescript_1.ForeignKey)(() => owner_model_1.Owner),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, unique: false, allowNull: true }),
    __metadata("design:type", Number)
], Currencies.prototype, "ownerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => owner_model_1.Owner),
    __metadata("design:type", typeof (_b = typeof owner_model_1.Owner !== "undefined" && owner_model_1.Owner) === "function" ? _b : Object)
], Currencies.prototype, "owner", void 0);
Currencies = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Currencies' })
], Currencies);
exports.Currencies = Currencies;


/***/ }),
/* 49 */
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
const sequelize_typescript_1 = __webpack_require__(27);
const admin_model_1 = __webpack_require__(28);
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
    getIdentifier() {
        return this.identifier;
    }
    setIdentifier(identifier) {
        this.identifier = identifier;
        return this.identifier;
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
        unique: false,
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
        unique: false,
        allowNull: false,
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
    (0, swagger_1.ApiProperty)({
        example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        description: 'identifier',
    }),
    (0, sequelize_typescript_1.IsUUID)(4),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
        field: 'identifier',
    }),
    __metadata("design:type", String)
], AdminRefreshToken.prototype, "identifier", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => admin_model_1.Admin),
    __metadata("design:type", typeof (_b = typeof admin_model_1.Admin !== "undefined" && admin_model_1.Admin) === "function" ? _b : Object)
], AdminRefreshToken.prototype, "admin", void 0);
AdminRefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'ADMIN`s_Refresh-tokens' })
], AdminRefreshToken);
exports.AdminRefreshToken = AdminRefreshToken;


/***/ }),
/* 50 */
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
    rs: 'Корисник или улога нису пронађени!',
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!',
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!',
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!',
};
exports.USER_WITH_EMAIL_EXIST = {
    en: 'User with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог',
};
exports.USER_WITH_PHONENUMBER_EXIST = {
    en: 'User with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.',
};
exports.USER_WITH_EMAIL_DOESNT_EXIST = {
    en: 'User with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.',
};
exports.USER_WITH_EMAIL_NOT_FOUND = {
    en: 'User with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!',
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка',
};
exports.USER_NOT_FOUND = {
    en: 'User not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! User doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};


/***/ }),
/* 51 */
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiException = void 0;
const common_1 = __webpack_require__(7);
const admin_constants_1 = __webpack_require__(53);
const owner_constants_1 = __webpack_require__(54);
const jwt_refresh_constants_1 = __webpack_require__(55);
const jwt_refresh_constants_2 = __webpack_require__(56);
const jwt_refresh_constants_3 = __webpack_require__(57);
const user_constants_1 = __webpack_require__(50);
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
        if ((type = 'USER_WITH_EMAIL_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_EXIST);
        }
        if ((type = 'USER_WITH_PHONENUMBER_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_PHONENUMBER_EXIST);
        }
        if ((type = 'USER_WITH_EMAIL_DOESNT_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
        }
        if ((type = 'ADMIN_WITH_EMAIL_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_EXIST);
        }
        if ((type = 'ADMIN_WITH_PHONENUMBER_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_PHONENUMBER_EXIST);
        }
        if ((type = 'ADMIN_WITH_EMAIL_DOESNT_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_DOESNT_EXIST);
        }
        if ((type = 'OWNER_WITH_EMAIL_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_EXIST);
        }
        if ((type = 'OWNER_WITH_PHONENUMBER_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_PHONENUMBER_EXIST);
        }
        if ((type = 'OWNER_WITH_EMAIL_DOESNT_EXIST')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_DOESNT_EXIST);
        }
        if ((type = 'INVALID_EMAIL')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_EMAIL);
        }
        if ((type = 'RESET_TIME_EXPIRED')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.RESET_TIME_EXPIRED);
        }
        if ((type = 'INVALID_CODE')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_CODE);
        }
        if ((type = 'TOKEN_INVALID')) {
            throw new ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_3.TOKEN_INVALID);
        }
    }
    static UserNotFound(type) {
        if ((type = 'USER_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
        }
        if ((type = 'USER_OR_ROLE_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_OR_ROLE_NOT_FOUND);
        }
        if ((type = 'TOKEN_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_3.TOKEN_NOT_FOUND);
        }
        if ((type = 'OWNER_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_2.OWNER_NOT_FOUND);
        }
        if ((type = 'ADMIN_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
        }
        if ((type = 'OWNER_OR_ROLE_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_OR_ROLE_NOT_FOUND);
        }
        if ((type = 'ADMIN_OR_ROLE_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_OR_ROLE_NOT_FOUND);
        }
    }
    static UnauthorizedError(type) {
        if ((type = 'INVALID_EMAIL_OR_PASSWORD')) {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
        }
        if ((type = 'OWNER_ID_NOT_PROVIDED')) {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', owner_constants_1.OWNER_ID_NOT_PROVIDED);
        }
        if ((type = 'ADMIN_ID_NOT_FOUND')) {
            throw new ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ADMIN_ID_NOT_PROVIDED);
        }
    }
    static InternalServerError(type) {
        if ((type = 'ERROR_WHILE_SIGNING_TOKEN')) {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SIGNING_TOKEN);
        }
        if ((type = 'ERROR_WHILE_VALIDATING_TOKEN')) {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_VALIDATING_TOKEN);
        }
        if ((type = 'ERROR_WHILE_SAVING_TOKEN')) {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_SAVING_TOKEN);
        }
        if ((type = 'ERROR_WHILE_REMOVING_TOKEN')) {
            throw new ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_3.ERROR_WHILE_REMOVING_TOKEN);
        }
    }
    static ForbiddenException(type) {
        if ((type = 'NOT_ACTIVATED')) {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.NOT_ACTIVATED);
        }
        if ((type = 'ACCESS_DENIED')) {
            throw new ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.ACCESS_DENIED);
        }
    }
}
exports.ApiException = ApiException;


/***/ }),
/* 53 */
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
    rs: 'Приступ забрањен!',
};
exports.NOT_ACTIVATED = {
    en: 'Access denied, because you are not activated!',
    ua: 'Доступ заборонено, тому що ви не активовані!',
    ru: 'Доступ запрещен, так как вы не активированы!',
    rs: 'Приступ одбијен, јер нисте активирани!',
};
exports.ADMIN_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!',
};
exports.ADMIN_OR_ROLE_NOT_FOUND = {
    en: 'ADMIN or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!',
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!',
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!',
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!',
};
exports.ADMIN_WITH_EMAIL_EXIST = {
    en: 'ADMIN with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог',
};
exports.ADMIN_WITH_PHONENUMBER_EXIST = {
    en: 'ADMIN with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.',
};
exports.ADMIN_WITH_EMAIL_DOESNT_EXIST = {
    en: 'ADMIN with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.',
};
exports.ADMIN_WITH_EMAIL_NOT_FOUND = {
    en: 'ADMIN with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!',
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка',
};
exports.ADMIN_NOT_FOUND = {
    en: 'ADMIN not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! ADMIN doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.PHONENUMBER_VALIDATION = 'Provided phoneNumber is incorrect!';


/***/ }),
/* 54 */
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
    rs: 'Приступ забрањен!',
};
exports.NOT_ACTIVATED = {
    en: 'Access denied, because you are not activated!',
    ua: 'Доступ заборонено, тому що ви не активовані!',
    ru: 'Доступ запрещен, так как вы не активированы!',
    rs: 'Приступ одбијен, јер нисте активирани!',
};
exports.OWNER_ID_NOT_PROVIDED = {
    en: 'User-id token not provided!',
    ua: 'Токен ідентифікатора користувача не надано!',
    ru: 'Токен идентификатора пользователя не предоставлен!',
    rs: 'Токен корисничког ИД-а није обезбеђен!',
};
exports.OWNER_OR_ROLE_NOT_FOUND = {
    en: 'OWNER or Role not found!',
    ua: 'Користувач або роль не знайдено!',
    ru: 'Пользователь или роль не найдены!',
    rs: 'Корисник или улога нису пронађени!',
};
exports.INVALID_CODE = {
    en: 'Invalid confirm code!',
    ua: 'Недійсний код підтвердження!',
    ru: 'Неверный код подтверждения!',
    rs: 'Неважећи код за потврду!',
};
exports.RESET_TIME_EXPIRED = {
    en: 'Reset time expired!',
    ua: 'Час скидання минув!',
    ru: 'Время сброса истекло!',
    rs: 'Време ресетовања је истекло!',
};
exports.INVALID_EMAIL = {
    en: 'Invalid email!',
    ua: 'Недійсна електронна адреса!',
    ru: 'Неверный адрес электронной почты!',
    rs: 'Корисник није пронађен!',
};
exports.OWNER_WITH_EMAIL_EXIST = {
    en: 'OWNER with this email already exist, pick different one.',
    ua: 'Користувач з такою поштою вже існує, оберіть іншу',
    ru: 'Пользователь с такой почтой уже существует, выберите другую',
    rs: 'Корисник са овом е-поштом већ постоји, изаберите другог',
};
exports.OWNER_WITH_PHONENUMBER_EXIST = {
    en: 'OWNER with this phone number already exist, pick different one.',
    ua: 'Користувач із таким номером телефону вже існує, виберіть інший.',
    ru: 'Пользователь с таким номером телефона уже существует, выберите другой.',
    rs: 'Корисник са овим бројем телефона већ постоји, изаберите други.',
};
exports.OWNER_WITH_EMAIL_DOESNT_EXIST = {
    en: 'OWNER with this email doesn`t exist, pick different one.',
    ua: 'Користувача з цією електронною адресою не існує, виберіть іншу.',
    ru: 'Пользователь с таким адресом электронной почты не существует, выберите другого.',
    rs: 'Корисник са овом е-поштом не постоји, изаберите други.',
};
exports.OWNER_WITH_EMAIL_NOT_FOUND = {
    en: 'OWNER with this email not found!',
    ua: 'Користувача з цією електронною адресою не знайдено!',
    ru: 'Пользователь с таким адресом электронной почты не найден!',
    rs: 'Корисник са овом е-поштом није пронађен!',
};
exports.INVALID_EMAIL_OR_PASSWORD = {
    en: 'Invalid entered email or password',
    ua: 'Неправильна введена адреса електронної пошти або пароль',
    ru: 'Неверно введенный адрес электронной почты или пароль',
    rs: 'Неважећа унета адреса е-поште или лозинка',
};
exports.OWNER_NOT_FOUND = {
    en: 'OWNER not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_LINK = {
    en: 'Invalid activation link! OWNER doesn`t exist.',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.INVALID_PHONE_NUMBER = {
    en: 'Phone number is not valid!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.ADMIN_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!',
};
exports.ADMIN_NOT_FOUND = {
    en: 'Admin not found!',
    ua: 'Адміністратора не знайдено!',
    ru: 'Админ не найден!',
    rs: 'Администратор није пронађен!',
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!',
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!',
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!',
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!',
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!',
};


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.OWNER_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!',
};
exports.OWNER_NOT_FOUND = {
    en: 'Owner not found!',
    ua: 'Власника не знайдено!',
    ru: 'Хозяин не найден!',
    rs: 'Власник није пронађен!',
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!',
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!',
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!',
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!',
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!',
};


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ERROR_WHILE_REMOVING_TOKEN = exports.ERROR_WHILE_SAVING_TOKEN = exports.ERROR_WHILE_VALIDATING_TOKEN = exports.ERROR_WHILE_SIGNING_TOKEN = exports.TOKEN_INVALID = exports.USER_NOT_FOUND = exports.TOKEN_NOT_FOUND = void 0;
exports.TOKEN_NOT_FOUND = {
    en: 'The refresh token not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Токен оновлення не знайдено!',
    rs: 'Токен за освежавање није пронађен!',
};
exports.USER_NOT_FOUND = {
    en: 'User not found!',
    ua: 'Користувач не знайдений!',
    ru: 'Пользователь не найден!',
    rs: 'Корисник није пронађен!',
};
exports.TOKEN_INVALID = {
    en: 'The refresh token is invalid!',
    ua: 'Токен оновлення недійсний!',
    ru: 'Токен обновления недействителен!',
    rs: 'Токен за освежавање је неважећи!',
};
exports.ERROR_WHILE_SIGNING_TOKEN = {
    en: 'Unexpected error occur while signing token',
    ua: 'Під час записання токену сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при подписании токена!',
    rs: 'Дошло је до неочекиване грешке при писању токена!',
};
exports.ERROR_WHILE_VALIDATING_TOKEN = {
    en: 'Unexpected error occur while validating token!',
    ua: 'Під час перевірки токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при проверке токена!',
    rs: 'Дошло је до неочекиване грешке приликом провере токена!',
};
exports.ERROR_WHILE_SAVING_TOKEN = {
    en: 'Unexpected error occur while saving token!',
    ua: 'Під час збереження токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при сохранении токена!',
    rs: 'Дошло је до неочекиване грешке приликом чувања токена!',
};
exports.ERROR_WHILE_REMOVING_TOKEN = {
    en: 'Unexpected error occur while removing token!',
    ua: 'Під час видалення токена сталася неочікувана помилка!',
    ru: 'Непредвиденная ошибка при удалении токена!',
    rs: 'Дошло је до неочекиване грешке приликом уклањања токена!',
};


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CART_EMPTY = exports.IDENTIFIER_NOT_PROVIDED = exports.CART_NOT_FOUND = void 0;
exports.CART_NOT_FOUND = {
    ua: 'Корзину не знайдено!',
    en: 'Cart not found!',
    ru: 'Корзина не найдена!',
    rs: 'Корпа није пронађена!',
};
exports.IDENTIFIER_NOT_PROVIDED = {
    ua: 'Кошик користувача не знайдено!',
    en: 'User`s cart not found!',
    ru: 'Корзина пользователя не найдена!',
    rs: 'Корисничка корпа није пронађена!',
};
exports.CART_EMPTY = {
    ua: 'Ваш кошик порожній!',
    en: 'Your cart is empty!',
    ru: 'Ваша корзина пуста!',
    rs: 'Ваша колица су празна!',
};


/***/ }),
/* 59 */
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ }),
/* 60 */
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
const bcrypt = __importStar(__webpack_require__(51));
const admin_constants_1 = __webpack_require__(53);
const admin_model_1 = __webpack_require__(28);
const users_service_1 = __webpack_require__(24);
const roles_service_1 = __webpack_require__(25);
const api_exception_1 = __webpack_require__(52);
const cart_constants_1 = __webpack_require__(58);
const cart_model_1 = __webpack_require__(37);
const uuid_1 = __webpack_require__(59);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
let AdminService = class AdminService {
    constructor(adminRepository, userService, roleService, cartRepository) {
        this.adminRepository = adminRepository;
        this.userService = userService;
        this.roleService = roleService;
        this.cartRepository = cartRepository;
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
                order: [['updatedAt', 'DESC']],
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
                order: [['updatedAt', 'DESC']],
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
    validateAdmin(adminDto, cartIdentifier) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(adminDto.email);
            if (!admin) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(adminDto.password, admin.getPassword());
            if (!passwordEquals) {
                return false;
            }
            if (!admin.cart || admin.cart.cartProducts.length === 0) {
                const identifier = yield this.generateEncryptedValue('ADMIN', 16);
                const newCart = yield this.createCart(identifier);
                admin.$set('cart', newCart);
                newCart.adminId = admin.id;
                admin.cart = newCart;
                yield newCart.save();
            }
            let cart;
            if (cartIdentifier) {
                cart = yield this.findCartByIdentifier(cartIdentifier);
            }
            if (cart && cart.cartProducts.length > 0) {
                cart.adminId = admin.id;
                cart.set('admin', admin);
                admin.$add('leftCarts', cart);
                yield cart.save();
            }
            if (cart && ((_a = cart.cartProducts) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                yield this.deleteCartById(cart.id, cart.identifier);
            }
            yield admin.save();
            return admin;
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
    deleteCartById(id, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    id: id,
                    identifier: identifier,
                },
            });
            return cart;
        });
    }
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __param(3, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _b : Object, Object])
], AdminService);
exports.AdminService = AdminService;


/***/ }),
/* 61 */
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
var OwnerService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const owner_constants_1 = __webpack_require__(54);
const owner_model_1 = __webpack_require__(31);
const roles_service_1 = __webpack_require__(25);
const bcrypt = __importStar(__webpack_require__(51));
const uuid_1 = __webpack_require__(59);
const roles_model_1 = __webpack_require__(26);
const api_exception_1 = __webpack_require__(52);
const schedule_1 = __webpack_require__(62);
const currency_service_1 = __webpack_require__(63);
const cart_model_1 = __webpack_require__(37);
const cart_constants_1 = __webpack_require__(58);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
let OwnerService = OwnerService_1 = class OwnerService {
    constructor(schedulerRegistry, currencyService, cartRepository, ownerRepository, roleService) {
        this.schedulerRegistry = schedulerRegistry;
        this.currencyService = currencyService;
        this.cartRepository = cartRepository;
        this.ownerRepository = ownerRepository;
        this.roleService = roleService;
        this.Logger = new common_1.Logger(OwnerService_1.name);
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Logger.warn(`time (${1}) second for job setting-up to run!`);
            const owner = yield OwnerService_1.creatingOwner({
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
    deleteCron(name) {
        this.schedulerRegistry.deleteCronJob(name);
        this.Logger.warn(`job ${name} deleted!`);
        return;
    }
    static creatingOwner(OWNER) {
        return __awaiter(this, void 0, void 0, function* () {
            const [phoneNumber, email] = yield Promise.all([
                yield owner_model_1.Owner.findOne({
                    where: { phoneNumber: OWNER.phoneNumber },
                    include: { all: true },
                }),
                yield owner_model_1.Owner.findOne({
                    where: { email: OWNER.email },
                    include: { all: true },
                }),
            ]);
            if (phoneNumber || email) {
                return false;
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS || 10);
            const hashedPassword = yield bcrypt.hash(OWNER.password, salt);
            const ownerDto = {
                name: OWNER.name,
                surname: OWNER.surname,
                phoneNumber: OWNER.phoneNumber,
                email: OWNER.email,
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
    validateOwner(ownerDto, cartIdentifier) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(ownerDto.email);
            if (!owner) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(ownerDto.password, owner.getPassword());
            if (!passwordEquals) {
                return false;
            }
            if (!owner.cart) {
                const identifier = yield this.generateEncryptedValue('OWNER', 16);
                const newCart = yield this.createCart(identifier);
                owner.$set('cart', newCart);
                newCart.ownerId = owner.id;
                owner.cart = newCart;
                yield newCart.save();
            }
            let cart;
            if (cartIdentifier) {
                cart = yield this.findCartByIdentifier(cartIdentifier);
            }
            if (cart && ((_a = cart.cartProducts) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                cart.ownerId = owner.id;
                cart.set('owner', owner);
                owner.$add('leftCarts', cart);
                yield cart.save();
            }
            if (cart && ((_b = cart.cartProducts) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                yield this.deleteCartById(cart.id, cart.identifier);
            }
            yield owner.save();
            return owner;
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
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    deleteCartById(id, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    id: id,
                    identifier: identifier,
                },
            });
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS, {
        name: 'setting-up',
        unrefTimeout: true,
        utcOffset: 1,
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerService.prototype, "setUp", null);
OwnerService = OwnerService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(2, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __param(3, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _b : Object, Object, Object, typeof (_c = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _c : Object])
], OwnerService);
exports.OwnerService = OwnerService;


/***/ }),
/* 62 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/schedule");

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CurrencyService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrencyService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const owner_model_1 = __webpack_require__(31);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const rxjs_1 = __webpack_require__(65);
const country_to_currency_1 = __importDefault(__webpack_require__(66));
const schedule_1 = __webpack_require__(62);
const currency_symbol_map_1 = __importDefault(__webpack_require__(67));
let CurrencyService = CurrencyService_1 = class CurrencyService {
    constructor(currenciesRepository, ownerRepository, httpService) {
        this.currenciesRepository = currenciesRepository;
        this.ownerRepository = ownerRepository;
        this.httpService = httpService;
        this.Logger = new common_1.Logger(CurrencyService_1.name);
    }
    setCurrencies(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield currencies_model_1.Currencies.findAll();
            if (currencies.length > 0) {
                this.Logger.log(currencies);
                return false;
            }
            let data;
            try {
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`, {
                    headers: {
                        apikey: process.env.CURRENCIES_API_KEY.trim(),
                        'Accept-Encoding': 'gzip,deflate,compress',
                    },
                })
                    .pipe((0, rxjs_1.map)((res) => res.data))
                    .pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                this.Logger.log(data);
                const currency = yield currencies_model_1.Currencies.create({
                    base: data.base,
                    date: data.date,
                    rates: JSON.stringify(data.rates),
                });
                currency.setOwnerId(ownerId);
                const owner = yield owner_model_1.Owner.findByPk(ownerId);
                currency.setAuthor(owner);
                yield currency.save();
            }
            catch (error) {
                this.Logger.error(error);
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } })
                    .pipe((0, rxjs_1.map)((res) => res.data))
                    .pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                const currency = yield currencies_model_1.Currencies.create({
                    base: Object.keys(data)[1].toUpperCase().trim(),
                    date: data.date,
                    rates: JSON.stringify(data[process.env.BASE_CURRENCY.toLowerCase().trim()]),
                });
                currency.setOwnerId(ownerId);
                const owner = yield owner_model_1.Owner.findByPk(ownerId);
                currency.setAuthor(owner);
                yield currency.save();
            }
        });
    }
    renewCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield this.currenciesRepository.findAll({
                include: { all: true },
            });
            const currency = currencies[0];
            let data;
            try {
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`, {
                    headers: {
                        apikey: process.env.CURRENCIES_API_KEY.trim(),
                        'Accept-Encoding': 'gzip,deflate,compress',
                    },
                })
                    .pipe((0, rxjs_1.map)((res) => res.data))
                    .pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                currency.base = data.base;
                currency.date = data.date;
                currency.rates = JSON.stringify(data.rates);
                yield currency.save();
            }
            catch (error) {
                this.Logger.error(error);
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } })
                    .pipe((0, rxjs_1.map)((res) => res.data))
                    .pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                currency.base = Object.keys(data)[1].toUpperCase().trim();
                currency.date = data.date;
                currency.rates = JSON.stringify(data[process.env.BASE_CURRENCY.toLowerCase().trim()]);
                yield currency.save();
                return currency;
            }
        });
    }
    getCurrentCurrency(countryIsoCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const currrencyCode = country_to_currency_1.default[countryIsoCode];
            const currencies = yield this.currenciesRepository.findAll({});
            if (currencies.length === 0) {
                return null;
            }
            const currency = currencies[0];
            const availableCurrencies = JSON.parse(currency.rates);
            if (currrencyCode.toLowerCase() in availableCurrencies) {
                return {
                    currrencyCode: country_to_currency_1.default[countryIsoCode],
                    symbol: (0, currency_symbol_map_1.default)(currrencyCode),
                    rate: availableCurrencies[currrencyCode.toLowerCase()],
                };
            }
            if (currrencyCode in availableCurrencies) {
                return {
                    currrencyCode: country_to_currency_1.default[countryIsoCode],
                    symbol: (0, currency_symbol_map_1.default)(currrencyCode),
                    rate: availableCurrencies[currrencyCode],
                };
            }
            return null;
        });
    }
    renewCurrenciesCron() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.renewCurrencies();
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CurrencyService.prototype, "renewCurrenciesCron", null);
CurrencyService = CurrencyService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(currencies_model_1.Currencies)),
    __param(1, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], CurrencyService);
exports.CurrencyService = CurrencyService;


/***/ }),
/* 64 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/axios");

/***/ }),
/* 65 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs");

/***/ }),
/* 66 */
/***/ ((module) => {

"use strict";
module.exports = require("country-to-currency");

/***/ }),
/* 67 */
/***/ ((module) => {

"use strict";
module.exports = require("currency-symbol-map");

/***/ }),
/* 68 */
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
const jwt_refresh_constants_1 = __webpack_require__(57);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_service_1 = __webpack_require__(24);
const sequelize_1 = __webpack_require__(8);
const scedule_service_1 = __webpack_require__(69);
const api_exception_1 = __webpack_require__(52);
const uuid_1 = __webpack_require__(59);
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
    insertToken(userId, userRefreshToken, email, userAgent, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.USER_NOT_FOUND);
                }
                const token = yield this.userRefreshTokenRepository.create({
                    userRefreshToken: userRefreshToken,
                    userId: user.id,
                    email: email,
                    userAgent: userAgent ||
                        'Mozilla/5.0 (Windows NT 7.0; Win32; x32) AppleWebKit/523.34 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/523.34',
                });
                token.setIdentifier((0, uuid_1.v4)());
                yield token.save();
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                if (!user.getUserRefreshTokens() ||
                    user.getUserRefreshTokens().length === 0) {
                    user.$set('userRefreshTokens', token.id);
                    user.userRefreshTokens = [token];
                }
                else {
                    user.$add('userRefreshTokens', token.id);
                }
                yield user.save();
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    saveToken(userId, userRefreshToken, email, userAgent, expireDate, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.USER_NOT_FOUND);
                }
                const tokenData = yield this.userRefreshTokenRepository.findOne({
                    where: {
                        userId: userId,
                        identifier: identifier,
                    },
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
                const user = yield this.userService.getUserById(token.userId);
                user.$remove('userRefreshTokens', token.token.id);
                yield user.save();
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
    findTokenByToken(userRefreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield user_refresh_token_model_1.UserRefreshToken.findOne({
                where: {
                    userRefreshToken: userRefreshToken,
                    identifier: identifier,
                },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findToken(userRefreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield user_refresh_token_model_1.UserRefreshToken.findOne({
                where: {
                    userRefreshToken: userRefreshToken,
                },
                include: {
                    all: true,
                },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return {
                token: token,
                userId: token.userId,
            };
        });
    }
    removeTokenInTime(userRefreshTokenId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.userRefreshTokenRepository.findOne({
                where: {
                    id: userRefreshTokenId,
                    identifier: identifier,
                },
            });
            if (!token) {
                return false;
            }
            const user = yield this.userService.getUserById(token.userId);
            user.$remove('userRefreshTokens', token.id);
            yield user.save();
            return this.userRefreshTokenRepository.destroy({
                where: { id: userRefreshTokenId, identifier: identifier },
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TasksService_1;
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TasksService = void 0;
const common_1 = __webpack_require__(7);
const event_emitter_1 = __webpack_require__(70);
const schedule_1 = __webpack_require__(62);
const cron_1 = __webpack_require__(71);
const owner_service_1 = __webpack_require__(61);
const currency_service_1 = __webpack_require__(63);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(72);
const path_1 = __webpack_require__(73);
const delete_empty_1 = __importDefault(__webpack_require__(74));
let TasksService = TasksService_1 = class TasksService {
    constructor(schedulerRegistry, eventEmitter, currencyService) {
        this.schedulerRegistry = schedulerRegistry;
        this.eventEmitter = eventEmitter;
        this.currencyService = currencyService;
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
    getTimeouts() {
        const timeouts = this.schedulerRegistry.getTimeouts();
        timeouts.forEach((key) => this.logger.log(`Timeout: ${key}`));
        return timeouts;
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
    addInterval(name, milliseconds, cb, ownerRefreshToken) {
        const callback = () => __awaiter(this, void 0, void 0, function* () {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
            return cb(ownerRefreshToken, name);
        });
        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
        return interval;
    }
    getIntervals() {
        this.deleteCron('');
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach((key) => this.logger.log(`Interval: ${key}`));
        return intervals;
    }
    addTimeoutForTokens(name, milliseconds, refreshTokenId, identifier, cb) {
        try {
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
        catch (err) {
            this.deleteTimeout(name);
        }
    }
    deleteEmptyFolders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield (0, delete_empty_1.default)((0, path_1.join)(__dirname, 'static'));
                this.logger.log(deleted);
                return deleted;
            }
            catch (err) {
                this.deleteCron('deleteEmptyFolders');
            }
        });
    }
    renewCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.currencyService.renewCurrencies();
            }
            catch (err) {
                this.deleteCron('renewCurrencies');
            }
        });
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.warn(`time (${30}) second for job setting-up to run!`);
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
            }
            catch (err) {
                this.deleteCron('setting-up');
            }
        });
    }
    deleteTimeout(name) {
        this.schedulerRegistry.deleteTimeout(name);
        this.logger.log(`Timeout ${name} deleted!`);
        return;
    }
    deleteCron(name) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
        return;
    }
    deleteInterval(name) {
        this.schedulerRegistry.deleteInterval(name);
        this.logger.warn(`Interval ${name} deleted!`);
        return;
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TasksService.prototype, "getTimeouts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR, {
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_d = typeof Map !== "undefined" && Map) === "function" ? _d : Object)
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
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS, {
        name: 'deleteEmptyFolders',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], TasksService.prototype, "deleteEmptyFolders", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK, {
        name: 'renewCurrencies',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], TasksService.prototype, "renewCurrencies", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS, {
        name: 'setting-up',
        unrefTimeout: true,
        utcOffset: 1,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], TasksService.prototype, "setUp", null);
TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _b : Object, typeof (_c = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _c : Object])
], TasksService);
exports.TasksService = TasksService;


/***/ }),
/* 70 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/event-emitter");

/***/ }),
/* 71 */
/***/ ((module) => {

"use strict";
module.exports = require("cron");

/***/ }),
/* 72 */
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
/* 73 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 74 */
/***/ ((module) => {

"use strict";
module.exports = require("delete-empty");

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
var OwnerJwtRefreshService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerJwtRefreshService = void 0;
const common_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(16);
const sequelize_1 = __webpack_require__(8);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(59);
const api_exception_1 = __webpack_require__(52);
const scedule_service_1 = __webpack_require__(69);
const mail_service_1 = __webpack_require__(21);
const jwt_refresh_constants_1 = __webpack_require__(56);
const owner_constants_1 = __webpack_require__(54);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_service_1 = __webpack_require__(61);
let OwnerJwtRefreshService = OwnerJwtRefreshService_1 = class OwnerJwtRefreshService {
    constructor(jwtService, ownerService, mailService, sheduleService, ownerRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.ownerService = ownerService;
        this.mailService = mailService;
        this.sheduleService = sheduleService;
        this.ownerRefreshTokenRepository = ownerRefreshTokenRepository;
        this.Logger = new common_1.Logger(OwnerJwtRefreshService_1.name);
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
    insertToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const token = yield this.ownerRefreshTokenRepository.create({
                    ownerRefreshToken: ownerRefreshToken,
                    ownerId: owner.id,
                    email: email,
                    ownerAgent: ownerAgent,
                    phoneNumber: phoneNumber,
                });
                token.setIdentifier((0, uuid_1.v4)());
                yield token.save();
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                if (!owner.getOwnerRefreshTokens() ||
                    owner.getOwnerRefreshTokens().length === 0) {
                    owner.$set('ownerRefreshTokens', token.id);
                    owner.ownerRefreshTokens = [token];
                }
                else {
                    owner.$add('ownerRefreshTokens', token.id);
                }
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    saveToken(ownerId, ownerRefreshToken, email, ownerAgent, phoneNumber, expireDate, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const owner = yield this.ownerService.getOwnerById(ownerId);
                if (!owner) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
                }
                const tokenData = yield this.ownerRefreshTokenRepository.findOne({
                    where: {
                        ownerId: ownerId,
                        identifier: identifier,
                    },
                });
                if (tokenData && !owner.getOwnerAgent()) {
                    owner.setOwnerAgent(ownerAgent);
                    tokenData.setownerAgent(ownerAgent);
                    yield owner.save();
                    yield tokenData.save();
                }
                if (tokenData) {
                    tokenData.ownerRefreshToken = ownerRefreshToken;
                    if (owner.getOwnerAgent() &&
                        owner.getOwnerAgent().trim() !== ownerAgent) {
                        owner.setIsActivated(false);
                        const link = yield this.generateEncryptedValue('OWNER', 16);
                        const code = this.generateActivationCode();
                        owner.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                        owner.setActivationCode(code);
                        owner.setResetTokenExpiration(Number(Date.now() + 3600000));
                        yield owner.save();
                        this.Logger.log(`checking owner with email ${owner.email}`, owner.getOwnerAgent() !== ownerAgent);
                        this.mailService.sendActivationMailToOwner(owner.email, `${process.env.API_URL}/auth/activate/${owner
                            .getResetToken()
                            .trim()}?code=${code}`);
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
                const owner = yield this.ownerService.getOwnerById(token.ownerId);
                owner.$remove('ownerRefreshTokens', token.token.id);
                yield owner.save();
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
    findTokenByToken(ownerRefreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: {
                    ownerRefreshToken: ownerRefreshToken,
                    identifier: identifier,
                },
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
                include: {
                    all: true,
                },
            });
            if (!token) {
                return false;
            }
            return { token: token, ownerId: token.ownerId };
        });
    }
    findTokenByParams(email, phoneNumber, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.ownerRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber, identifier: identifier },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(ownerRefreshTokenId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield owner_refresh_token_model_1.OwnerRefreshToken.findOne({
                where: {
                    id: ownerRefreshTokenId,
                    identifier: identifier,
                },
            });
            if (!token) {
                return false;
            }
            const owner = yield this.ownerService.getOwnerById(token.ownerId);
            owner.$remove('ownerRefreshTokens', token.id);
            yield owner.save();
            return owner_refresh_token_model_1.OwnerRefreshToken.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                    identifier: identifier,
                },
            });
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
    generateActivationCode() {
        const confirmCode = Number(('' + Math.random()).substring(2, 10));
        return confirmCode;
    }
};
OwnerJwtRefreshService = OwnerJwtRefreshService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(owner_refresh_token_model_1.OwnerRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _b : Object, typeof (_c = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _c : Object, typeof (_d = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _d : Object, Object])
], OwnerJwtRefreshService);
exports.OwnerJwtRefreshService = OwnerJwtRefreshService;


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
var AdminJwtRefreshService_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AdminJwtRefreshService = void 0;
const common_1 = __webpack_require__(7);
const jwt_1 = __webpack_require__(16);
const jwt_refresh_constants_1 = __webpack_require__(55);
const admin_refresh_token_model_1 = __webpack_require__(49);
const admin_service_1 = __webpack_require__(60);
const mail_service_1 = __webpack_require__(21);
const sequelize_1 = __webpack_require__(8);
const scedule_service_1 = __webpack_require__(69);
const api_exception_1 = __webpack_require__(52);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(59);
let AdminJwtRefreshService = AdminJwtRefreshService_1 = class AdminJwtRefreshService {
    constructor(jwtService, adminService, sheduleService, mailService, adminRefreshTokenRepository) {
        this.jwtService = jwtService;
        this.adminService = adminService;
        this.sheduleService = sheduleService;
        this.mailService = mailService;
        this.adminRefreshTokenRepository = adminRefreshTokenRepository;
        this.Logger = new common_1.Logger(AdminJwtRefreshService_1.name);
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
    insertToken(adminId, adminRefreshToken, email, adminAgent, phoneNumber, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.getAdminById(adminId);
                if (!admin) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
                }
                const token = yield this.adminRefreshTokenRepository.create({
                    adminRefreshToken: adminRefreshToken,
                    adminId: admin.id,
                    email: email,
                    adminAgent: adminAgent,
                    phoneNumber: phoneNumber,
                });
                token.setIdentifier((0, uuid_1.v4)());
                yield token.save();
                if (!token.getExpireDate()) {
                    token.setExpireDate(expireDate);
                    yield token.save();
                }
                if (!admin.getAdminRefreshTokens() ||
                    admin.getAdminRefreshTokens().length === 0) {
                    admin.$set('adminRefreshTokens', token.id);
                    admin.adminRefreshTokens = [token];
                }
                else {
                    admin.$add('adminRefreshTokens', token.id);
                }
                yield admin.save();
                return token;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error', jwt_refresh_constants_1.ERROR_WHILE_SAVING_TOKEN);
            }
        });
    }
    saveToken(adminId, adminRefreshToken, email, adminAgent, phoneNumber, expireDate, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminService.getAdminById(adminId);
                if (!admin) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.ADMIN_NOT_FOUND);
                }
                const tokenData = yield this.adminRefreshTokenRepository.findOne({
                    where: {
                        adminId: adminId,
                        identifier: identifier,
                    },
                });
                if (tokenData && admin.getAdminAgent() === 'null') {
                    admin.setAdminAgent(adminAgent);
                    tokenData.setAdminAgent(adminAgent);
                    yield admin.save();
                    yield tokenData.save();
                }
                if (tokenData) {
                    tokenData.adminRefreshToken = adminRefreshToken;
                    if (admin.getAdminAgent() &&
                        admin.getAdminAgent().trim() !== adminAgent) {
                        admin.setIsActivated(false);
                        const link = yield this.generateEncryptedValue('ADMIN', 16);
                        const code = this.generateActivationCode();
                        admin.setResetToken(link.replace('/', `${(0, uuid_1.v4)()}`).replace('=', `${(0, uuid_1.v4)()}`));
                        admin.setActivationCode(code);
                        admin.setResetTokenExpiration(Number(Date.now() + 3600000));
                        yield admin.save();
                        this.Logger.log(`checking owner with email ${admin.email}`, admin.getAdminAgent() !== adminAgent);
                        this.mailService.sendActivationMailToAdmin(admin.email, `${process.env.API_URL}/auth/activate/${admin
                            .getResetToken()
                            .trim()}?code=${code}`);
                    }
                    yield tokenData.save();
                    return tokenData;
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
                const admin = yield this.adminService.getAdminById(token.adminId);
                admin.$remove('adminRefreshTokens', token.token.id);
                yield admin.save();
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
                include: {
                    all: true,
                },
            });
            if (!token) {
                return false;
            }
            return { token: token, adminId: token.adminId };
        });
    }
    findTokenByToken(adminRefreshToken, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { adminRefreshToken: adminRefreshToken, identifier: identifier },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', jwt_refresh_constants_1.TOKEN_NOT_FOUND);
            }
            return token;
        });
    }
    findTokenByParams(email, phoneNumber, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.adminRefreshTokenRepository.findOne({
                where: { email: email, phoneNumber: phoneNumber, identifier: identifier },
            });
            if (!token) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', jwt_refresh_constants_1.TOKEN_INVALID);
            }
            return token;
        });
    }
    removeTokenInTime(adminRefreshTokenId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield admin_refresh_token_model_1.AdminRefreshToken.findOne({
                where: {
                    id: adminRefreshTokenId,
                    identifier: identifier,
                },
            });
            if (!token) {
                return false;
            }
            const admin = yield this.adminService.getAdminById(token.adminId);
            admin.$remove('adminRefreshTokens', token.id);
            yield admin.save();
            return this.adminRefreshTokenRepository.destroy({
                where: {
                    id: token.id,
                    phoneNumber: token.phoneNumber,
                    identifier: identifier,
                },
            });
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
    generateActivationCode() {
        const confirmCode = Number(('' + Math.random()).substring(2, 10));
        return confirmCode;
    }
};
AdminJwtRefreshService = AdminJwtRefreshService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(4, (0, sequelize_1.InjectModel)(admin_refresh_token_model_1.AdminRefreshToken)),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _b : Object, typeof (_c = typeof scedule_service_1.TasksService !== "undefined" && scedule_service_1.TasksService) === "function" ? _c : Object, typeof (_d = typeof mail_service_1.MailService !== "undefined" && mail_service_1.MailService) === "function" ? _d : Object, Object])
], AdminJwtRefreshService);
exports.AdminJwtRefreshService = AdminJwtRefreshService;


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
/* 78 */
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
const admin_constants_1 = __webpack_require__(53);
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
/* 79 */
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
const validation_excetion_1 = __webpack_require__(80);
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
/* 80 */
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
/* 81 */
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
const throttler_1 = __webpack_require__(82);
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
/* 82 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/throttler");

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(7);
exports.ROLES_KEY = 'tdshgre4h6k7{=}weg34lhbthbtgn';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 84 */
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
const roles_auth_decorator_1 = __webpack_require__(83);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(52);
const admin_constants_1 = __webpack_require__(53);
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
                if (!payload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
                }
                return true;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
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
/* 85 */
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
exports.OwnerAdminGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const jwt_refresh_service_1 = __webpack_require__(75);
const owner_refresh_token_model_1 = __webpack_require__(47);
const roles_auth_decorator_1 = __webpack_require__(83);
const core_1 = __webpack_require__(4);
const jwt_refresh_service_2 = __webpack_require__(76);
const admin_refresh_token_model_1 = __webpack_require__(49);
const api_exception_1 = __webpack_require__(52);
const admin_constants_1 = __webpack_require__(53);
let OwnerAdminGuard = class OwnerAdminGuard {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, reflector) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
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
                if (!refreshPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
                }
                return true;
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
                if (!refreshPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
                }
                return true;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
        }))();
    }
};
OwnerAdminGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_1.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_2.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_2.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _c : Object])
], OwnerAdminGuard);
exports.OwnerAdminGuard = OwnerAdminGuard;


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
const admin_service_1 = __webpack_require__(60);
const owner_service_1 = __webpack_require__(61);
const users_service_1 = __webpack_require__(24);
const user_constants_1 = __webpack_require__(50);
const api_exception_1 = __webpack_require__(52);
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
/* 87 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/pipes");

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
exports.ApiErrorExceptionFilter = void 0;
const validate_dto_exception_error_1 = __webpack_require__(89);
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
/* 89 */
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
/* 90 */
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
const api_exception_1 = __webpack_require__(52);
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
/* 91 */
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
const auth_controller_1 = __webpack_require__(92);
const admin_module_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(16);
const mail_service_1 = __webpack_require__(21);
const core_1 = __webpack_require__(4);
const http_exception_filter_1 = __webpack_require__(101);
const auth_middleware_1 = __webpack_require__(102);
const throttler_1 = __webpack_require__(82);
const owner_module_1 = __webpack_require__(103);
const jwt_refresh_service_1 = __webpack_require__(76);
const jwt_refresh_service_2 = __webpack_require__(75);
const users_module_1 = __webpack_require__(122);
const initialize_user_middleware_1 = __webpack_require__(128);
const initialize_email_middleware_1 = __webpack_require__(175);
const activate_middleware_1 = __webpack_require__(176);
const body_validator_pipe_1 = __importDefault(__webpack_require__(129));
const login_dto_1 = __webpack_require__(94);
const signup_dto_1 = __webpack_require__(17);
const reset_password_dto_1 = __webpack_require__(95);
const change_password_dto_1 = __webpack_require__(77);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const config_1 = __webpack_require__(108);
const scedule_service_1 = __webpack_require__(69);
const core_module_1 = __webpack_require__(109);
const events_service_1 = __webpack_require__(177);
const currency_service_1 = __webpack_require__(63);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const cart_module_1 = __webpack_require__(153);
const cart_model_1 = __webpack_require__(37);
const cart_product_model_1 = __webpack_require__(33);
const category_model_1 = __webpack_require__(43);
const colours_model_1 = __webpack_require__(34);
const product_categories_model_1 = __webpack_require__(44);
const product_colour_model_1 = __webpack_require__(42);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const bookmark_products_1 = __webpack_require__(40);
const product_model_1 = __webpack_require__(32);
const watched_products_model_1 = __webpack_require__(41);
const product_reviews_model_1 = __webpack_require__(46);
const review_model_1 = __webpack_require__(45);
const categories_colours_module_1 = __webpack_require__(147);
const product_module_1 = __webpack_require__(130);
const roles_module_1 = __webpack_require__(104);
const file_service_1 = __webpack_require__(116);
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
            currency_service_1.CurrencyService,
            file_service_1.FilesService,
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
            axios_1.HttpModule,
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_reviews_model_1.ProductReviews,
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
                cart_product_model_1.CartProduct,
                review_model_1.Review,
                bookmark_products_1.BookmarksProducts,
                watched_products_model_1.WatchedProducts,
                currencies_model_1.Currencies,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(7);
const decorators_1 = __webpack_require__(93);
const auth_service_1 = __webpack_require__(13);
const login_dto_1 = __webpack_require__(94);
const reset_password_dto_1 = __webpack_require__(95);
const signup_dto_1 = __webpack_require__(17);
const swagger_1 = __webpack_require__(5);
const express_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(11);
const throttler_1 = __webpack_require__(82);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const user_type_decorator_1 = __webpack_require__(96);
const user_agent_decorator_1 = __webpack_require__(97);
const validation_pipe_1 = __webpack_require__(79);
const refresh_guard_1 = __webpack_require__(98);
const auth_interfaces_1 = __webpack_require__(99);
const jw_refresh_guard_1 = __webpack_require__(86);
const change_password_dto_1 = __webpack_require__(77);
const user_id_decorator_1 = __webpack_require__(100);
const error_handler_filter_1 = __webpack_require__(88);
const api_exception_filter_1 = __webpack_require__(90);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
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
    __metadata("design:paramtypes", [typeof (_b = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _e : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_f = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object, typeof (_j = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _j : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _m : Object, String, String]),
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
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, typeof (_p = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _p : Object, typeof (_q = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _q : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_r = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _r : Object, String]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
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
    __metadata("design:paramtypes", [typeof (_t = typeof reset_password_dto_1.ResetDto !== "undefined" && reset_password_dto_1.ResetDto) === "function" ? _t : Object, typeof (_u = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
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
    __metadata("design:paramtypes", [typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object, typeof (_x = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _x : Object, typeof (_y = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _y : Object, typeof (_z = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _z : Object, Number, String]),
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
    __metadata("design:paramtypes", [String, Number, typeof (_0 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _0 : Object, typeof (_1 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _1 : Object, typeof (_2 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _2 : Object, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
AuthController = __decorate([
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, decorators_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, decorators_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 93 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/decorators");

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
/* 95 */
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
/* 96 */
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
/* 97 */
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
/* 98 */
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
const api_exception_1 = __webpack_require__(52);
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
/* 99 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 100 */
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
/* 101 */
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
/* 102 */
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
/* 103 */
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
const owner_service_1 = __webpack_require__(61);
const jwt_1 = __webpack_require__(16);
const sequelize_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(91);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const jwt_refresh_service_1 = __webpack_require__(75);
const admin_module_1 = __webpack_require__(9);
const mail_service_1 = __webpack_require__(21);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const config_1 = __webpack_require__(108);
const core_module_1 = __webpack_require__(109);
const scedule_service_1 = __webpack_require__(69);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const product_model_1 = __webpack_require__(32);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_service_1 = __webpack_require__(24);
const admin_service_1 = __webpack_require__(60);
const currencies_model_1 = __webpack_require__(48);
const currency_service_1 = __webpack_require__(63);
const axios_1 = __webpack_require__(64);
const schedule_1 = __webpack_require__(62);
const cart_module_1 = __webpack_require__(153);
const cart_service_1 = __webpack_require__(154);
const product_module_1 = __webpack_require__(130);
const product_service_1 = __webpack_require__(131);
const categories_colours_module_1 = __webpack_require__(147);
const file_service_1 = __webpack_require__(116);
let OwnerModule = OwnerModule_1 = class OwnerModule {
};
OwnerModule = OwnerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            axios_1.HttpModule.register({
                withCredentials: true,
                responseEncoding: 'utf8',
                responseType: 'json',
            }),
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
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
                product_colour_model_1.ProductColours,
                colours_model_1.Colour,
            ]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
        ],
        providers: [
            file_service_1.FilesService,
            cart_service_1.CartService,
            owner_service_1.OwnerService,
            jwt_refresh_service_1.OwnerJwtRefreshService,
            currency_service_1.CurrencyService,
            mail_service_1.MailService,
            scedule_service_1.TasksService,
            users_service_1.UsersService,
            admin_service_1.AdminService,
            product_service_1.ProductService,
        ],
        exports: [owner_service_1.OwnerService, jwt_refresh_service_1.OwnerJwtRefreshService, currency_service_1.CurrencyService],
    })
], OwnerModule);
exports.OwnerModule = OwnerModule;


/***/ }),
/* 104 */
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
const roles_controller_1 = __webpack_require__(105);
const roles_service_1 = __webpack_require__(25);
const sequelize_1 = __webpack_require__(8);
const roles_model_1 = __webpack_require__(26);
const user_model_1 = __webpack_require__(38);
const user_roles_model_1 = __webpack_require__(30);
const config_1 = __webpack_require__(108);
const order_product_model_1 = __webpack_require__(35);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const product_model_1 = __webpack_require__(32);
const user_refresh_token_model_1 = __webpack_require__(39);
const auth_service_1 = __webpack_require__(13);
const admin_module_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(91);
const core_module_1 = __webpack_require__(109);
const mail_module_1 = __webpack_require__(121);
const owner_module_1 = __webpack_require__(103);
const product_module_1 = __webpack_require__(130);
const users_module_1 = __webpack_require__(122);
const users_service_1 = __webpack_require__(24);
const scedule_service_1 = __webpack_require__(69);
const jwt_refresh_service_1 = __webpack_require__(68);
const initialize_user_middleware_1 = __webpack_require__(128);
const currency_service_1 = __webpack_require__(63);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const cart_module_1 = __webpack_require__(153);
const cart_service_1 = __webpack_require__(154);
const product_service_1 = __webpack_require__(131);
const categories_colours_module_1 = __webpack_require__(147);
const file_service_1 = __webpack_require__(116);
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
            currency_service_1.CurrencyService,
            file_service_1.FilesService,
            cart_service_1.CartService,
            product_service_1.ProductService,
        ],
        imports: [
            axios_1.HttpModule,
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
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => RolesModule_1),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
        ],
        exports: [roles_service_1.RolesService],
    })
], RolesModule);
exports.RolesModule = RolesModule;


/***/ }),
/* 105 */
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
const roles_auth_decorator_1 = __webpack_require__(83);
const add_content_guard_1 = __webpack_require__(106);
const jw_refresh_guard_1 = __webpack_require__(86);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(85);
const roles_guard_1 = __webpack_require__(84);
const error_handler_filter_1 = __webpack_require__(88);
const create_role_dto_1 = __webpack_require__(107);
const roles_model_1 = __webpack_require__(26);
const roles_service_1 = __webpack_require__(25);
const throttler_1 = __webpack_require__(82);
const api_exception_filter_1 = __webpack_require__(90);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
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
/* 106 */
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
const admin_service_1 = __webpack_require__(60);
const api_exception_1 = __webpack_require__(52);
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
/* 107 */
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
/* 108 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/config");

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
var CoreModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(4);
const all_exceptions_filter_1 = __webpack_require__(110);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const global_interceptor_1 = __webpack_require__(111);
const cluster_service_1 = __webpack_require__(113);
const file_service_1 = __webpack_require__(116);
const config_1 = __webpack_require__(108);
const schedule_1 = __webpack_require__(62);
const scedule_service_1 = __webpack_require__(69);
const event_emitter_1 = __webpack_require__(70);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const product_model_1 = __webpack_require__(32);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const sequelize_1 = __webpack_require__(8);
const currency_service_1 = __webpack_require__(63);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const admin_module_1 = __webpack_require__(9);
const auth_module_1 = __webpack_require__(91);
const mail_module_1 = __webpack_require__(121);
const owner_module_1 = __webpack_require__(103);
const product_module_1 = __webpack_require__(130);
const roles_module_1 = __webpack_require__(104);
const users_module_1 = __webpack_require__(122);
const bull_1 = __webpack_require__(170);
const delete_files_processor_1 = __webpack_require__(171);
const workers_service_1 = __webpack_require__(173);
const delete_products_from_carts_processor_1 = __webpack_require__(174);
let CoreModule = CoreModule_1 = class CoreModule {
};
CoreModule = CoreModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: core_1.APP_INTERCEPTOR, useClass: global_interceptor_1.GlobalInterceptor },
            { provide: core_1.APP_FILTER, useClass: all_exceptions_filter_1.AllExceptionsFilter },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard,
            },
            workers_service_1.WorkerService,
            delete_products_from_carts_processor_1.DeleteProductsFromCarts,
            currency_service_1.CurrencyService,
            scedule_service_1.TasksService,
            cluster_service_1.AppClusterService,
            file_service_1.FilesService,
            delete_files_processor_1.ColectingGarbageFiles,
        ],
        imports: [
            axios_1.HttpModule,
            bull_1.BullModule.registerQueue({
                name: 'garbageColecting',
            }, { name: 'deleteProductsFromCarts' }),
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
                delimiter: '.',
                newListener: true,
                removeListener: true,
                maxListeners: 10,
                verboseMemoryLeak: true,
                ignoreErrors: false,
            }),
            schedule_1.ScheduleModule.forRoot(),
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
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => CoreModule_1),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], CoreModule);
exports.CoreModule = CoreModule;


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
/* 111 */
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
const rxjs_1 = __webpack_require__(65);
const operators_1 = __webpack_require__(112);
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
/* 112 */
/***/ ((module) => {

"use strict";
module.exports = require("rxjs/operators");

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
var AppClusterService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppClusterService = void 0;
const cluster_1 = __importDefault(__webpack_require__(114));
const os_1 = __webpack_require__(115);
const common_1 = __webpack_require__(7);
const numCPUs = (0, os_1.cpus)().length;
let AppClusterService = AppClusterService_1 = class AppClusterService {
    static clusterize(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cluster_1.default.isPrimary) {
                AppClusterService_1.Logger.log(`Number of CPUs is ${numCPUs}`);
                AppClusterService_1.Logger.log(`Master server started on ${process.pid}`);
                for (let i = 0; i < numCPUs; i++) {
                    const worker = cluster_1.default.fork();
                    console.info(worker);
                }
                cluster_1.default.on('exit', (worker, code, signal) => {
                    AppClusterService_1.Logger.log(`Worker ${worker.process.pid} died. Restarting`, signal || code);
                    cluster_1.default.fork();
                });
            }
            else {
                AppClusterService_1.Logger.log(`Cluster server started on ${process.pid}`);
                const app = yield callback();
                AppClusterService_1.Logger.log(`Cluster server started: ${app.get.name}`);
                process.on('SIGINT', () => process.exit(1));
                process.on('SIGTERM', () => process.exit(1));
                process.on('SIGUSR2', () => __awaiter(this, void 0, void 0, function* () { return process.exit(1); }));
                process.on('message', (msg) => {
                    if (msg === 'shutdown') {
                        process.exit(1);
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
            AppClusterService_1.Logger.log(`numReqs = ${numReqs}`);
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
            common_1.Logger.log(address);
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
AppClusterService.Logger = new common_1.Logger(AppClusterService_1.name);
AppClusterService = AppClusterService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], AppClusterService);
exports.AppClusterService = AppClusterService;


/***/ }),
/* 114 */
/***/ ((module) => {

"use strict";
module.exports = require("cluster");

/***/ }),
/* 115 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 116 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var FilesService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilesService = void 0;
const common_1 = __webpack_require__(7);
const fs = __importStar(__webpack_require__(117));
const uuid = __importStar(__webpack_require__(59));
const path_1 = __importStar(__webpack_require__(73));
const fs_1 = __webpack_require__(117);
const uuid_1 = __webpack_require__(59);
const util_1 = __importDefault(__webpack_require__(15));
const rimraf_1 = __importDefault(__webpack_require__(118));
const path_starts_with_1 = __importDefault(__webpack_require__(119));
const ansi_colors_1 = __importDefault(__webpack_require__(120));
const readdir = util_1.default.promisify(fs.readdir);
const GARBAGE_REGEX = /(?:Thumbs\.db|\.DS_Store)$/i;
let FilesService = FilesService_1 = class FilesService {
    constructor() {
        this.Logger = new common_1.Logger(FilesService_1.name);
    }
    deleteEmpty(cwd, options, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof cwd !== 'string') {
                    return Promise.reject(new TypeError('expected the first argument to be a string'));
                }
                if (typeof options === 'function') {
                    cb = options;
                    options = null;
                }
                if (typeof cb === 'function') {
                    return this.deleteEmpty(cwd, options, cb)
                        .then((res) => cb(null, res))
                        .catch(cb);
                }
                const opts = options || {};
                const dirname = path_1.default.resolve(cwd);
                const onDirectory = opts.onDirectory || (() => { });
                const empty = [];
                const remove = (filepath) => __awaiter(this, void 0, void 0, function* () {
                    const dir = path_1.default.resolve(filepath);
                    if (!this.isValidDir(cwd, dir, empty)) {
                        return;
                    }
                    onDirectory(dir);
                    const files = yield readdir(dir);
                    if (this.isEmpty(dir, files, empty, opts)) {
                        empty.push(dir);
                        yield this.deleteDir(dir, opts);
                        if (opts.verbose === true) {
                            console.log(ansi_colors_1.default.red('Deleted:'), path_1.default.relative(cwd, dir));
                        }
                        if (typeof opts.onDelete === 'function') {
                            yield opts.onDelete(dir);
                        }
                        return remove(path_1.default.dirname(dir));
                    }
                    for (const file of files) {
                        yield remove(path_1.default.join(dir, file));
                    }
                    return empty;
                });
                return remove(dirname);
            }
            catch (err) {
                this.Logger.log(err);
            }
        });
    }
    deleteEmptySync(cwd, options) {
        if (typeof cwd !== 'string') {
            throw new TypeError('expected the first argument to be a string');
        }
        const opts = options || {};
        const dirname = path_1.default.resolve(cwd);
        const deleted = [];
        const empty = [];
        const remove = (filepath) => {
            const dir = path_1.default.resolve(filepath);
            if (!this.isValidDir(cwd, dir, empty)) {
                return empty;
            }
            const files = fs.readdirSync(dir);
            if (this.isEmpty(dir, files, empty, opts)) {
                empty.push(dir);
                this.deleteDirSync(dir, opts);
                if (opts.verbose === true) {
                    this.Logger.log(ansi_colors_1.default.red('Deleted:'), path_1.default.relative(cwd, dir));
                }
                if (typeof opts.onDelete === 'function') {
                    opts.onDelete(dir);
                }
                return remove(path_1.default.dirname(dir));
            }
            for (const filepath of files) {
                remove(path_1.default.join(dir, filepath));
            }
            return empty;
        };
        remove(dirname);
        return empty;
    }
    isEmpty(dir, files, empty, options = {}) {
        const filter = options.filter || this.filterGarbage;
        const regex = options.junkRegex;
        for (const basename of files) {
            const filepath = path_1.default.join(dir, basename);
            if (!(options.dryRun && empty.includes(filepath)) &&
                filter(filepath, regex) === true) {
                return false;
            }
        }
        return true;
    }
    createFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = uuid.v4() + '.jpg';
                const filePath = path_1.default.resolve(__dirname, '..', 'static');
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path_1.default.join(filePath, fileName), file.buffer);
                return { fileName: fileName, filePath: filePath };
            }
            catch (e) {
                throw new common_1.HttpException('Error occured while writing file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    unlinkFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            filePath = path_1.default.join(__dirname, 'static', filePath);
            fs.unlink(filePath, (err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        });
    }
    createfileName(req, file, callback) {
        const name = file.originalname.split('.')[0];
        const ext = (0, path_1.extname)(file.originalname);
        const randomName = (0, uuid_1.v4)();
        callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
    }
    fileFilter(req, file, callback) {
        const filetypes = /\.(jpg|jpeg|png|gif)$/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return callback(null, true);
        }
        return callback(new Error('Only image files are allowed!'), false);
    }
    destination(req, file, callback) {
        var _a, _b;
        const destination = path_1.default.join(__dirname, 'static', 'products', `${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title}`);
        const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.title}`, file.fieldname);
        if (!(0, fs_1.existsSync)(destination)) {
            (0, fs_1.mkdirSync)(destination, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(imagesPath)) {
            (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
        }
        callback(null, imagesPath);
    }
    deleteDirSync(dirname, options = {}) {
        if (options.dryRun !== true) {
            return rimraf_1.default.sync(dirname, Object.assign(Object.assign({}, options), { glob: false }));
        }
    }
    isGarbageFile(file, regex = GARBAGE_REGEX) {
        return regex.test(file);
    }
    filterGarbage(file, regex) {
        return !this.isGarbageFile(file, regex);
    }
    isValidDir(cwd, dir, empty) {
        return (!empty.includes(dir) && (0, path_starts_with_1.default)(dir, cwd) && this.isDirectory(dir));
    }
    deleteDir(dirname, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options.dryRun !== true) {
                return new Promise((resolve, reject) => {
                    try {
                        (0, rimraf_1.default)(dirname, Object.assign(Object.assign({}, options), { glob: false }));
                        resolve();
                    }
                    catch (err) {
                        reject(err);
                    }
                });
            }
        });
    }
    isDirectory(dir) {
        try {
            return fs.statSync(dir).isDirectory();
        }
        catch (err) {
            this.Logger.error(err);
        }
        return false;
    }
};
FilesService = FilesService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], FilesService);
exports.FilesService = FilesService;


/***/ }),
/* 117 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),
/* 118 */
/***/ ((module) => {

"use strict";
module.exports = require("rimraf");

/***/ }),
/* 119 */
/***/ ((module) => {

"use strict";
module.exports = require("path-starts-with");

/***/ }),
/* 120 */
/***/ ((module) => {

"use strict";
module.exports = require("ansi-colors");

/***/ }),
/* 121 */
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
const auth_module_1 = __webpack_require__(91);
const owner_module_1 = __webpack_require__(103);
const roles_module_1 = __webpack_require__(104);
const users_module_1 = __webpack_require__(122);
const config_1 = __webpack_require__(108);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const product_model_1 = __webpack_require__(32);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const currencies_model_1 = __webpack_require__(48);
const cart_module_1 = __webpack_require__(153);
const product_module_1 = __webpack_require__(130);
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
            sequelize_1.SequelizeModule.forFeature([
                product_model_1.Product,
                order_model_1.Order,
                order_product_model_1.OrderProduct,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                owner_refresh_token_model_1.OwnerRefreshToken,
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
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
/* 122 */
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
const users_controller_1 = __webpack_require__(123);
const users_service_1 = __webpack_require__(24);
const sequelize_1 = __webpack_require__(8);
const user_model_1 = __webpack_require__(38);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const auth_module_1 = __webpack_require__(91);
const user_refresh_token_model_1 = __webpack_require__(39);
const jwt_1 = __webpack_require__(16);
const jwt_refresh_service_1 = __webpack_require__(68);
const user_middleware_1 = __webpack_require__(127);
const initialize_user_middleware_1 = __webpack_require__(128);
const admin_refresh_token_model_1 = __webpack_require__(49);
const admin_model_1 = __webpack_require__(28);
const admin_module_1 = __webpack_require__(9);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_module_1 = __webpack_require__(103);
const body_validator_pipe_1 = __importDefault(__webpack_require__(129));
const update_user_dto_1 = __webpack_require__(125);
const config_1 = __webpack_require__(108);
const scedule_service_1 = __webpack_require__(69);
const core_module_1 = __webpack_require__(109);
const product_module_1 = __webpack_require__(130);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const product_model_1 = __webpack_require__(32);
const auth_service_1 = __webpack_require__(13);
const mail_module_1 = __webpack_require__(121);
const bookmark_products_1 = __webpack_require__(40);
const watched_products_model_1 = __webpack_require__(41);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const currency_service_1 = __webpack_require__(63);
const cart_module_1 = __webpack_require__(153);
const cart_service_1 = __webpack_require__(154);
const categories_colours_module_1 = __webpack_require__(147);
const product_service_1 = __webpack_require__(131);
const file_service_1 = __webpack_require__(116);
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
            axios_1.HttpModule,
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
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
                bookmark_products_1.BookmarksProducts,
                watched_products_model_1.WatchedProducts,
                currencies_model_1.Currencies,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_USER_SECRET.toString().trim() ||
                    'knfdgfhRRljhtop6hfdghshfdshfohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
                signOptions: {
                    expiresIn: 604800000,
                },
            }),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => UsersModule_1),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
        ],
        providers: [
            file_service_1.FilesService,
            cart_service_1.CartService,
            users_service_1.UsersService,
            jwt_refresh_service_1.UserJwtRefreshTokenService,
            scedule_service_1.TasksService,
            auth_service_1.AuthService,
            currency_service_1.CurrencyService,
            product_service_1.ProductService,
        ],
        exports: [users_service_1.UsersService, jwt_refresh_service_1.UserJwtRefreshTokenService],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 123 */
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
const roles_auth_decorator_1 = __webpack_require__(83);
const jwt_auth_guard_1 = __webpack_require__(11);
const user_model_1 = __webpack_require__(38);
const users_service_1 = __webpack_require__(24);
const roles_guard_1 = __webpack_require__(84);
const ban_user_dto_1 = __webpack_require__(124);
const throttler_1 = __webpack_require__(82);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const auth_service_1 = __webpack_require__(13);
const update_user_dto_1 = __webpack_require__(125);
const express_1 = __webpack_require__(20);
const user_agent_decorator_1 = __webpack_require__(97);
const user_id_decorator_1 = __webpack_require__(100);
const user_guard_1 = __webpack_require__(126);
const owner_admin_guard_1 = __webpack_require__(85);
const jw_refresh_guard_1 = __webpack_require__(86);
const error_handler_filter_1 = __webpack_require__(88);
const api_exception_filter_1 = __webpack_require__(90);
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
/* 124 */
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
exports.UpdateUserDto = void 0;
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(18);
const user_constants_1 = __webpack_require__(50);
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
/* 126 */
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
exports.UserGuard = void 0;
const common_1 = __webpack_require__(7);
const jwt_refresh_service_1 = __webpack_require__(68);
const auth_constants_1 = __webpack_require__(12);
const core_1 = __webpack_require__(4);
const roles_auth_decorator_1 = __webpack_require__(83);
const api_exception_1 = __webpack_require__(52);
const admin_constants_1 = __webpack_require__(53);
let UserGuard = class UserGuard {
    constructor(userJwtRefreshTokenService, reflector) {
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
            if (!refreshToken) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.REFRESH_TOKEN_NOT_PROVIDED);
            }
            const decodedRefreshToken = Buffer.from(refreshToken, 'base64').toString('ascii');
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
            if (!refreshPayload.roles.some((role) => requiredRoles.includes(role.value))) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
            }
            return true;
        }))();
    }
};
UserGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], UserGuard);
exports.UserGuard = UserGuard;


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
const jwt_refresh_service_1 = __webpack_require__(75);
const jwt_refresh_service_2 = __webpack_require__(76);
const jwt_refresh_service_3 = __webpack_require__(68);
const decorators_1 = __webpack_require__(93);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(52);
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
/* 129 */
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
const validate_dto_exception_error_1 = __webpack_require__(89);
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
exports.ProductModule = void 0;
const common_1 = __webpack_require__(7);
const product_service_1 = __webpack_require__(131);
const product_controller_1 = __webpack_require__(137);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const auth_module_1 = __webpack_require__(91);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_module_1 = __webpack_require__(103);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_module_1 = __webpack_require__(122);
const config_1 = __webpack_require__(108);
const product_model_1 = __webpack_require__(32);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const categories_colours_module_1 = __webpack_require__(147);
const cart_module_1 = __webpack_require__(153);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const orders_module_1 = __webpack_require__(158);
const initialize_user_middleware_1 = __webpack_require__(128);
const categories_service_1 = __webpack_require__(133);
const file_service_1 = __webpack_require__(116);
const product_middleware_1 = __webpack_require__(152);
const product_reviews_model_1 = __webpack_require__(46);
const bookmark_products_1 = __webpack_require__(40);
const watched_products_model_1 = __webpack_require__(41);
const user_middleware_1 = __webpack_require__(127);
const axios_1 = __webpack_require__(64);
const currencies_model_1 = __webpack_require__(48);
const colours_service_1 = __webpack_require__(136);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const bull_1 = __webpack_require__(170);
let ProductModule = class ProductModule {
    configure(consumer) {
        consumer.apply(product_middleware_1.ProductMiddleware).forRoutes({
            path: '*',
            method: common_1.RequestMethod.ALL,
        });
        consumer
            .apply(user_middleware_1.UserMiddleware, initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'product/addBookmark', method: common_1.RequestMethod.POST }, { path: 'product/addWatchedProduct', method: common_1.RequestMethod.POST }, { path: 'product/watchedProducts', method: common_1.RequestMethod.GET }, { path: 'product/bookmarkProducts', method: common_1.RequestMethod.GET });
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'product/create_product', method: common_1.RequestMethod.PUT }, { path: '*', method: common_1.RequestMethod.PATCH }, { path: '*', method: common_1.RequestMethod.DELETE }, { path: 'product/delete_image', method: common_1.RequestMethod.DELETE });
    }
};
ProductModule = __decorate([
    (0, common_1.Module)({
        providers: [product_service_1.ProductService, file_service_1.FilesService, categories_service_1.CategoriesService, colours_service_1.ColoursService],
        controllers: [product_controller_1.ProductController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            bull_1.BullModule.registerQueue({
                name: 'garbageColecting',
                defaultJobOptions: {
                    delay: 5000,
                    stackTraceLimit: 50,
                },
            }),
            axios_1.HttpModule,
            sequelize_1.SequelizeModule.forFeature([
                product_reviews_model_1.ProductReviews,
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
                bookmark_products_1.BookmarksProducts,
                watched_products_model_1.WatchedProducts,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
                cart_product_model_1.CartProduct,
                currencies_model_1.Currencies,
            ]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
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
/* 131 */
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var ProductService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const common_1 = __webpack_require__(7);
const product_constants_1 = __webpack_require__(132);
const sequelize_1 = __webpack_require__(8);
const fs_1 = __webpack_require__(117);
const path_1 = __webpack_require__(73);
const admin_service_1 = __webpack_require__(60);
const api_exception_1 = __webpack_require__(52);
const owner_service_1 = __webpack_require__(61);
const categories_service_1 = __webpack_require__(133);
const product_model_1 = __webpack_require__(32);
const users_service_1 = __webpack_require__(24);
const user_constants_1 = __webpack_require__(50);
const colours_service_1 = __webpack_require__(136);
let ProductService = ProductService_1 = class ProductService {
    constructor(productRepository, ownerService, userService, adminService, categoriesService, coloursService) {
        this.productRepository = productRepository;
        this.ownerService = ownerService;
        this.userService = userService;
        this.adminService = adminService;
        this.categoriesService = categoriesService;
        this.coloursService = coloursService;
        this.Logger = new common_1.Logger(ProductService_1.name);
    }
    getCompareProducts(request, response, next, page, pageSize, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currency = request['currency'];
                let products = yield this.productRepository.findAll({
                    include: { all: true },
                });
                if (categories && categories.length > 0) {
                    products = products.filter((product) => {
                        if (product.categories.some((category) => !categories
                            .map((category) => Number(category))
                            .includes(category.id))) {
                            return product;
                        }
                    });
                }
                return response.json({
                    products: products
                        .map((product) => {
                        var _a;
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            sizeChartImageDescription: product.getSizeChartImageDescription(),
                            price: Math.round(product.price * currency.rate) + currency.symbol,
                            quantity: product.quantity,
                            images: product.images.map((image) => JSON.parse(image)),
                            hexes: product.hexes,
                            sizeChartImage: product.sizeChartImage,
                            sizes: product.sizes,
                            colours: product.colours.map((colour) => {
                                return {
                                    id: colour.id,
                                    ua: colour.ua,
                                    en: colour.en,
                                    rs: colour.rs,
                                    ru: colour.ru,
                                    hex: colour.hex,
                                    type: 'colour',
                                    createdAt: colour.createdAt,
                                    updatedAt: colour.updatedAt,
                                };
                            }),
                            categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                                return {
                                    id: category.id,
                                    ua: category.ua,
                                    en: category.en,
                                    rs: category.rs,
                                    ru: category.ru,
                                    type: 'category',
                                    createdAt: category.createdAt,
                                    updatedAt: category.updatedAt,
                                };
                            }),
                            reviews: product.reviews.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            }),
                        };
                    })
                        .slice((page - 1) * pageSize, pageSize * page),
                    totalProducts: products.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getProductsByCategory(request, response, next, page, pageSize, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currency = request['currency'];
                let products = yield this.productRepository.findAll({
                    include: { all: true },
                });
                if (categories && categories.length > 0) {
                    products = products.filter((product) => {
                        if (product.categories.some((category) => categories
                            .map((category) => Number(category))
                            .includes(category.id))) {
                            return product;
                        }
                    });
                }
                return response.json({
                    products: products
                        .map((product) => {
                        var _a;
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            sizeChartImageDescription: product.getSizeChartImageDescription(),
                            price: Math.round(product.price * currency.rate) + currency.symbol,
                            quantity: product.quantity,
                            images: product.images.map((image) => JSON.parse(image)),
                            hexes: product.hexes,
                            sizeChartImage: product.sizeChartImage,
                            sizes: product.sizes,
                            colours: product.colours.map((colour) => {
                                return {
                                    id: colour.id,
                                    ua: colour.ua,
                                    en: colour.en,
                                    rs: colour.rs,
                                    ru: colour.ru,
                                    hex: colour.hex,
                                    type: 'colour',
                                    createdAt: colour.createdAt,
                                    updatedAt: colour.updatedAt,
                                };
                            }),
                            categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                                return {
                                    id: category.id,
                                    ua: category.ua,
                                    en: category.en,
                                    rs: category.rs,
                                    ru: category.ru,
                                    type: 'category',
                                    createdAt: category.createdAt,
                                    updatedAt: category.updatedAt,
                                };
                            }),
                            reviews: product.reviews.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            }),
                        };
                    })
                        .slice((page - 1) * pageSize, pageSize * page),
                    totalProducts: products.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getBookmarks(request, response, next, page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const currency = request['currency'];
                const products = user.bookmarks
                    .slice((page - 1) * productPerPage, productPerPage * page)
                    .map((product) => {
                    var _a;
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        sizeChartImageDescription: product.getSizeChartImageDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images.map((image) => JSON.parse(image)),
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours.map((colour) => {
                            return {
                                id: colour.id,
                                ua: colour.ua,
                                en: colour.en,
                                rs: colour.rs,
                                ru: colour.ru,
                                hex: colour.hex,
                                type: 'colour',
                                createdAt: colour.createdAt,
                                updatedAt: colour.updatedAt,
                            };
                        }),
                        categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                type: 'category',
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: products,
                    totalProducts: user.bookmarks.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getWatchedProducts(request, response, next, page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const currency = request['currency'];
                const products = user.watched
                    .slice((page - 1) * productPerPage, productPerPage * page)
                    .map((product) => {
                    var _a;
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        sizeChartImageDescription: product.getSizeChartImageDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images.map((image) => JSON.parse(image)),
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours.map((colour) => {
                            return {
                                id: colour.id,
                                ua: colour.ua,
                                en: colour.en,
                                rs: colour.rs,
                                ru: colour.ru,
                                hex: colour.hex,
                                type: 'colour',
                                createdAt: colour.createdAt,
                                updatedAt: colour.updatedAt,
                            };
                        }),
                        categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                type: 'category',
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: products,
                    totalProducts: user.bookmarks.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getProductsByIds(request, response, next, productIds, page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count();
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    offset: (page - 1) * productPerPage,
                    limit: productPerPage,
                    where: {
                        id: productIds,
                    },
                });
                const currency = request['currency'];
                const returnedProducts = products.map((product) => {
                    var _a;
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        sizeChartImageDescription: product.getSizeChartImageDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images.map((image) => JSON.parse(image)),
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours.map((colour) => {
                            return {
                                id: colour.id,
                                ua: colour.ua,
                                en: colour.en,
                                rs: colour.rs,
                                ru: colour.ru,
                                hex: colour.hex,
                                type: 'colour',
                                createdAt: colour.createdAt,
                                updatedAt: colour.updatedAt,
                            };
                        }),
                        categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                type: 'category',
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: returnedProducts,
                    totalProducts: totalCount,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getProducts(request, response, next, page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count();
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    order: [['updatedAt', 'DESC']],
                });
                const currency = request['currency'];
                const returnedProducts = products
                    .map((product) => {
                    var _a;
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images.map((image) => JSON.parse(image)),
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours.map((colour) => {
                            return {
                                id: colour.id,
                                ua: colour.ua,
                                en: colour.en,
                                rs: colour.rs,
                                ru: colour.ru,
                                hex: colour.hex,
                                type: 'colour',
                                createdAt: colour.createdAt,
                                updatedAt: colour.updatedAt,
                            };
                        }),
                        categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                type: 'category',
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                })
                    .slice((page - 1) * productPerPage, productPerPage * page);
                return response.json({
                    products: returnedProducts,
                    totalProducts: totalCount,
                });
            }
            catch (error) {
                this.Logger.error(error);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    getProductById(request, response, next, productId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.findByPk(productId, {
                    include: {
                        all: true,
                    },
                });
                if (!product) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
                }
                const currency = request['currency'];
                return response.json({
                    id: product.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    sizeChartImageDescription: product.getSizeChartImageDescription(),
                    price: Math.floor(product.price * currency.rate) + currency.symbol,
                    quantity: product.quantity,
                    images: product.images.map((image) => JSON.parse(image)),
                    sizeChartImage: product.sizeChartImage,
                    sizes: product.sizes,
                    hexes: product.hexes,
                    colours: product.colours.map((colour) => {
                        return {
                            id: colour.id,
                            ua: colour.ua,
                            en: colour.en,
                            rs: colour.rs,
                            ru: colour.ru,
                            hex: colour.hex,
                            type: 'colour',
                            createdAt: colour.createdAt,
                            updatedAt: colour.updatedAt,
                        };
                    }),
                    categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            type: 'category',
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: product.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    }),
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    filterProducts(request, response, next, queryFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let products = yield this.productRepository.findAll({
                    include: { all: true },
                });
                if (queryFilterDto.order && queryFilterDto.order === 'ASC') {
                    products.sort((firstProduct, secondProduct) => {
                        return firstProduct.price - secondProduct.price;
                    });
                }
                if (queryFilterDto.order && queryFilterDto.order === 'DESC') {
                    products.sort((firstProduct, secondProduct) => {
                        return secondProduct.price - firstProduct.price;
                    });
                }
                if (queryFilterDto.categories && queryFilterDto.categories.length > 0) {
                    products = products.filter((product) => {
                        if (product.categories.some((category) => queryFilterDto.categories.includes(category.id))) {
                            return product;
                        }
                    });
                }
                if (queryFilterDto.sizes && queryFilterDto.sizes.length > 0) {
                    products = products.filter((product) => {
                        if (product.sizes.some((size) => queryFilterDto.sizes.includes(size))) {
                            return product;
                        }
                    });
                }
                if (queryFilterDto.colours && queryFilterDto.colours.length > 0) {
                    products = products.filter((product) => {
                        if (product.colours.some((colour) => queryFilterDto.colours.includes(colour.id))) {
                            return product;
                        }
                    });
                }
                const currency = request['currency'];
                return response.json({
                    products: products
                        .map((product) => {
                        var _a;
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            sizeChartImageDescription: product.getSizeChartImageDescription(),
                            price: Math.round(product.price * currency.rate) + currency.symbol,
                            quantity: product.quantity,
                            images: product.images.map((image) => JSON.parse(image)),
                            hexes: product.hexes,
                            sizeChartImage: product.sizeChartImage,
                            sizes: product.sizes,
                            colours: product.colours.map((colour) => {
                                return {
                                    id: colour.id,
                                    ua: colour.ua,
                                    en: colour.en,
                                    rs: colour.rs,
                                    ru: colour.ru,
                                    hex: colour.hex,
                                    type: 'colour',
                                    createdAt: colour.createdAt,
                                    updatedAt: colour.updatedAt,
                                };
                            }),
                            categories: (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                                return {
                                    id: category.id,
                                    ua: category.ua,
                                    en: category.en,
                                    rs: category.rs,
                                    ru: category.ru,
                                    type: 'category',
                                    createdAt: category.createdAt,
                                    updatedAt: category.updatedAt,
                                };
                            }),
                            reviews: product.reviews.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            }),
                        };
                    })
                        .slice((queryFilterDto.page - 1) * queryFilterDto.pageSize, queryFilterDto.pageSize * queryFilterDto.page),
                    totalProducts: products.length,
                });
            }
            catch (error) {
                this.Logger.error(error);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    addWatchedProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const product = yield this.findById(productId);
                if (!user.watched || user.watched.length === 0) {
                    user.$set('watched', product.id);
                    user.watched = [product];
                }
                else {
                    user.$add('watched', product.id);
                }
                yield user.save();
                return productId;
            }
            catch (err) {
                this.Logger.error(err);
                throw err;
            }
        });
    }
    addBookmarkProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const product = yield this.findById(productId);
                if (!user.bookmarks || user.bookmarks.length === 0) {
                    user.$set('bookmarks', product.id);
                    user.bookmarks = [product];
                }
                else {
                    user.$add('bookmarks', product.id);
                }
                yield user.save();
                return productId;
            }
            catch (err) {
                this.Logger.error(err);
                throw err;
            }
        });
    }
    createProduct(createProductDto, userId, type, images, sizeChartImage) {
        var _a, e_1, _b, _c, _d, e_2, _e, _f, _g, e_3, _h, _j;
        var _k;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!type && !userId) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', product_constants_1.NOT_AUTHORIZED);
                }
                if (!images ||
                    images.length === 0 ||
                    !sizeChartImage ||
                    sizeChartImage.length === 0) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', product_constants_1.NO_IMAGES_PROVIDED);
                }
                const sizeChartImagePath = '/' +
                    sizeChartImage[0].path
                        .split('\\')
                        .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
                        .join('/');
                const product = yield this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { title: JSON.stringify(createProductDto.title), description: JSON.stringify(createProductDto.description), sizeChartImage: sizeChartImagePath, sizeChartImageDescription: JSON.stringify(createProductDto.sizeChartImageDescription) }));
                product.reviews = [];
                try {
                    for (var _l = true, _m = __asyncValues(createProductDto.categories), _o; _o = yield _m.next(), _a = _o.done, !_a;) {
                        _c = _o.value;
                        _l = false;
                        try {
                            const category = _c;
                            const productCategory = yield this.categoriesService.getCategoryById(Number(category));
                            if (!product.categories) {
                                product.$add('categories', productCategory.id);
                                product.categories = [productCategory];
                            }
                            else {
                                product.$add('categories', productCategory.id);
                            }
                            yield product.save();
                        }
                        finally {
                            _l = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_l && !_a && (_b = _m.return)) yield _b.call(_m);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    for (var _p = true, _q = __asyncValues(createProductDto.colours), _r; _r = yield _q.next(), _d = _r.done, !_d;) {
                        _f = _r.value;
                        _p = false;
                        try {
                            const colour = _f;
                            const productColour = yield this.coloursService.getColourById(Number(colour));
                            if (!product.colours) {
                                product.$add('colours', productColour.id);
                                product.colours = [productColour];
                            }
                            else {
                                product.$add('colours', productColour.id);
                            }
                            if (!product.hexes) {
                                product.hexes = [productColour.hex];
                            }
                            else {
                                product.hexes.push(productColour.hex);
                            }
                            yield product.save();
                        }
                        finally {
                            _p = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_p && !_d && (_e = _q.return)) yield _e.call(_q);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                const IMAGES = [];
                try {
                    for (var _s = true, _t = __asyncValues(createProductDto.selectedImages), _u; _u = yield _t.next(), _g = _u.done, !_g;) {
                        _j = _u.value;
                        _s = false;
                        try {
                            const IMAGE = _j;
                            const colour = yield this.coloursService.getColourById(Number(IMAGE.colourId));
                            const imagesPaths = [];
                            IMAGE.fileNames.forEach((fileName) => {
                                const imagePath = images.filter((image) => {
                                    return image.originalname === fileName;
                                });
                                imagePath.forEach((image) => {
                                    imagesPaths.push(image.path);
                                });
                            });
                            IMAGES.push(JSON.stringify({
                                imagesPaths: imagesPaths.map((path) => {
                                    return path
                                        .split('\\')
                                        .slice(path.split('\\').indexOf('products'))
                                        .join('/');
                                }),
                                sizes: IMAGE.sizes,
                                colour: {
                                    id: colour.id,
                                    ua: colour.ua,
                                    en: colour.en,
                                    rs: colour.rs,
                                    ru: colour.ru,
                                    hex: colour.hex,
                                    type: 'colour',
                                    createdAt: colour.createdAt,
                                    updatedAt: colour.updatedAt,
                                },
                            }));
                        }
                        finally {
                            _s = true;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (!_s && !_g && (_h = _t.return)) yield _h.call(_t);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                product.images = IMAGES;
                yield product.save();
                if (type && type === 'OWNER') {
                    const owner = yield this.ownerService.getOwnerById(userId);
                    product.setOwnerId(userId);
                    product.$set('owner', userId);
                    product.owner = owner;
                    owner.$add('products', product.id);
                    owner.addProduct(product);
                    yield Promise.all([yield product.save(), yield owner.save()]);
                }
                if (type && type === 'ADMIN') {
                    product.setAdminId(userId);
                    product.$set('admin', userId);
                    const admin = yield this.adminService.getAdminById(userId);
                    product.admin = admin;
                    admin.$add('products', product.id);
                    admin.addProduct(product);
                    yield Promise.all([yield product.save(), yield admin.save()]);
                }
                yield product.save();
                const dbProduct = yield this.findById(product.id);
                const Product = {
                    id: dbProduct.id,
                    title: dbProduct.getTitle(),
                    description: dbProduct.getDescription(),
                    sizeChartImageDescription: dbProduct.getSizeChartImageDescription(),
                    price: dbProduct.price,
                    quantity: dbProduct.quantity,
                    images: dbProduct.images.map((image) => JSON.parse(image)),
                    sizeChartImage: dbProduct.sizeChartImage,
                    sizes: dbProduct.sizes,
                    colours: dbProduct.colours.map((colour) => {
                        return {
                            id: colour.id,
                            ua: colour.ua,
                            en: colour.en,
                            rs: colour.rs,
                            ru: colour.ru,
                            hex: colour.hex,
                            type: 'colour',
                            createdAt: colour.createdAt,
                            updatedAt: colour.updatedAt,
                        };
                    }),
                    categories: (_k = dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.categories) === null || _k === void 0 ? void 0 : _k.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            type: 'category',
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: dbProduct.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    }),
                };
                return Product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    updateProduct(updateProductDto, productId, userId, type, images, sizeChartImage) {
        var _a, e_4, _b, _c;
        var _d;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.productRepository.findByPk(productId, {
                    include: { all: true },
                });
                if (!existingProduct) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
                }
                if (type && type === 'OWNER') {
                    existingProduct.setOwnerId(userId);
                }
                if (type && type === 'ADMIN' && !existingProduct.getAdminId()) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        existingProduct.setAdminId(userId);
                        existingProduct.$set('admin', userId);
                        const admin = yield this.adminService.getAdminById(userId);
                        existingProduct.admin = admin;
                        admin.$add('products', existingProduct.id);
                        admin.addProduct(existingProduct);
                        yield Promise.all([yield existingProduct.save(), yield admin.save()]);
                    }), 0);
                }
                existingProduct.setTitle(updateProductDto.title);
                existingProduct.setDescription(updateProductDto.description);
                existingProduct.setSizeChartImageDescription(updateProductDto.sizeChartImageDescription);
                existingProduct.quantity = updateProductDto.quantity;
                existingProduct.price = updateProductDto.price;
                existingProduct.sizes = [...updateProductDto.sizes];
                existingProduct.hexes = [];
                for (const category of existingProduct.categories) {
                    existingProduct.$remove('categories', category.id);
                    yield existingProduct.save();
                }
                for (const category of updateProductDto.categories) {
                    const existingProductCategory = yield this.categoriesService.getCategoryById(Number(category));
                    if (!existingProduct.categories) {
                        existingProduct.$add('categories', existingProductCategory.id);
                        existingProduct.categories = [existingProductCategory];
                    }
                    else {
                        existingProduct.$add('categories', existingProductCategory.id);
                    }
                    yield existingProduct.save();
                }
                for (const colour of existingProduct.colours) {
                    existingProduct.$remove('colours', colour.id);
                    yield existingProduct.save();
                }
                for (const colour of updateProductDto.colours) {
                    const existingProductColour = yield this.coloursService.getColourById(Number(colour));
                    if (!existingProduct.colours) {
                        existingProduct.$add('colours', existingProductColour.id);
                        existingProduct.colours = [existingProductColour];
                    }
                    else {
                        existingProduct.$add('colours', existingProductColour.id);
                    }
                    if (!existingProduct.hexes) {
                        existingProduct.hexes = [existingProductColour.hex];
                    }
                    else {
                        existingProduct.hexes.push(existingProductColour.hex);
                    }
                    yield existingProduct.save();
                }
                const IMAGES = [];
                try {
                    for (var _e = true, _f = __asyncValues(updateProductDto.selectedImages), _g; _g = yield _f.next(), _a = _g.done, !_a;) {
                        _c = _g.value;
                        _e = false;
                        try {
                            const IMAGE = _c;
                            const colour = yield this.coloursService.getColourById(Number(IMAGE.colourId));
                            const imagesPaths = [];
                            IMAGE.fileNames.forEach((fileName) => {
                                const imagePath = images.filter((image) => {
                                    return image.originalname === fileName;
                                });
                                imagePath.forEach((image) => {
                                    imagesPaths.push(image.path);
                                });
                            });
                            IMAGES.push(JSON.stringify({
                                imagesPaths: imagesPaths.map((path) => {
                                    return path
                                        .split('\\')
                                        .slice(path.split('\\').indexOf('products'))
                                        .join('/');
                                }),
                                sizes: IMAGE.sizes,
                                colour: {
                                    id: colour.id,
                                    ua: colour.ua,
                                    en: colour.en,
                                    rs: colour.rs,
                                    ru: colour.ru,
                                    hex: colour.hex,
                                    type: 'colour',
                                    createdAt: colour.createdAt,
                                    updatedAt: colour.updatedAt,
                                },
                            }));
                        }
                        finally {
                            _e = true;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                existingProduct.images = IMAGES;
                yield existingProduct.save();
                if (sizeChartImage && sizeChartImage.length > 0) {
                    const sizeChartImagePath = '/' +
                        sizeChartImage[0].path
                            .split('\\')
                            .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
                            .join('/');
                    const file = (0, path_1.join)(__dirname, 'static' + existingProduct.sizeChartImage);
                    if ((0, fs_1.existsSync)(file)) {
                        (0, fs_1.unlink)(file, (err) => {
                            if (err) {
                                this.Logger.error(err.message);
                            }
                        });
                    }
                    existingProduct.sizeChartImage = sizeChartImagePath;
                }
                yield existingProduct.save();
                const dbProduct = yield this.findById(existingProduct.id);
                const Product = {
                    id: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.id,
                    title: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.getTitle(),
                    description: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.getDescription(),
                    sizeChartImageDescription: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.getSizeChartImageDescription(),
                    price: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.price,
                    quantity: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity,
                    images: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.images.map((image) => JSON.parse(image)),
                    sizeChartImage: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizeChartImage,
                    sizes: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizes,
                    colours: dbProduct.colours.map((colour) => {
                        return {
                            id: colour.id,
                            ua: colour.ua,
                            en: colour.en,
                            rs: colour.rs,
                            ru: colour.ru,
                            hex: colour.hex,
                            type: 'colour',
                            createdAt: colour.createdAt,
                            updatedAt: colour.updatedAt,
                        };
                    }),
                    categories: (_d = dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.categories) === null || _d === void 0 ? void 0 : _d.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            type: 'category',
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: [],
                };
                if (dbProduct.reviews.length !== 0) {
                    Product.reviews = dbProduct.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    });
                }
                return Product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.productRepository.findByPk(productId, {
                    include: { all: true },
                });
                if (!existingProduct) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND);
                }
                for (const image of existingProduct.images) {
                    const file = (0, path_1.join)(__dirname, 'static' + image);
                    (0, fs_1.unlink)(file, (err) => {
                        if (err) {
                            this.Logger.error(err.message);
                        }
                    });
                }
                const sizeChartImage = (0, path_1.join)(__dirname, 'static', ...existingProduct.sizeChartImage.split('/'));
                (0, fs_1.unlink)(sizeChartImage, (err) => {
                    if (err) {
                        this.Logger.error(err.message);
                    }
                });
                const folderPath = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0]
                    .split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 2));
                const imagesFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0]
                    .split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 1));
                const sizeChartImageFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.sizeChartImage
                    .split('/')
                    .slice(0, existingProduct.sizeChartImage.split('/').length - 1));
                if ((0, fs_1.readdirSync)(imagesFolder).length === 0 &&
                    (0, fs_1.readdirSync)(sizeChartImageFolder).length === 0) {
                    (0, fs_1.rmSync)(folderPath, { recursive: true, force: true });
                }
                const product = yield this.productRepository.destroy({
                    where: {
                        id: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.id,
                        quantity: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.quantity,
                        price: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.price,
                        sizes: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.sizes,
                        images: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.images,
                    },
                });
                return product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    deleteImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = (0, path_1.join)(__dirname, 'static' + filePath);
                this.Logger.log(file);
                if (!(0, fs_1.existsSync)(file)) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.FILE_NOT_FOUND);
                }
                (0, fs_1.unlink)(file, (err) => {
                    if (err) {
                        this.Logger.error(err.message);
                    }
                });
                const [productsImages, sizeChartImageProducts] = yield Promise.all([
                    yield this.productRepository.findAll({ where: { images: [filePath] } }),
                    yield this.productRepository.findAll({
                        where: { sizeChartImage: filePath },
                    }),
                ]);
                if ((productsImages === null || productsImages === void 0 ? void 0 : productsImages.length) !== 0) {
                    for (const product of productsImages) {
                        const index = product.images.indexOf(filePath);
                        product.images.splice(index, 1);
                        yield product.save();
                    }
                }
                if ((sizeChartImageProducts === null || sizeChartImageProducts === void 0 ? void 0 : sizeChartImageProducts.length) !== 0) {
                    for (const product of sizeChartImageProducts) {
                        product.sizeChartImage = null;
                        yield product.save();
                    }
                }
                return filePath;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({
                where: {
                    id: productId,
                },
                include: {
                    all: true,
                },
            });
            if (!product) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
            }
            return product;
        });
    }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productRepository.findAll({
                include: {
                    all: true,
                },
            });
            if (!products) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
            }
            return products;
        });
    }
};
ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _c : Object, typeof (_d = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _d : Object, typeof (_e = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _e : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FILE_NOT_FOUND = exports.NOT_AUTHORIZED = exports.NO_IMAGES_PROVIDED = exports.PRODUCT_NOT_FOUND = exports.PRODUCTS_NOT_FOUND = void 0;
exports.PRODUCTS_NOT_FOUND = {
    en: `Products not found!`,
    ua: 'Товарів не знайдено!',
    ru: 'Товар не найден!',
    rs: 'Производи нису пронађени!',
};
exports.PRODUCT_NOT_FOUND = {
    en: 'Product not found!',
    ua: 'Товар не знайдено!',
    ru: 'Товар не найден!',
    rs: 'Производ није пронађен!',
};
exports.NO_IMAGES_PROVIDED = {
    en: 'No images provided!',
    ua: 'Немає зображень!',
    ru: 'Изображения не предоставлены!',
    rs: 'Слике нису обезбеђене!',
};
exports.NOT_AUTHORIZED = {
    en: 'User is not authorized to create product!',
    ua: 'Користувач не авторизований для створення товару!',
    ru: 'Пользователь не авторизован для создания товара!',
    rs: 'Корисник није овлашћен да креира производ!',
};
exports.FILE_NOT_FOUND = {
    en: 'File not found! Invalid path.',
    ua: 'Файл не знайдено! Недійсний шлях.',
    ru: 'Файл не найден! Неверный путь.',
    rs: 'Фајл није пронађен! Неважећи пут.',
};


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
const interfaces_1 = __webpack_require__(134);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const category_colour_constants_1 = __webpack_require__(135);
const category_model_1 = __webpack_require__(43);
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    setCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.bulkCreate([
                { ru: '', rs: '', en: '', ua: '' },
            ]);
            return categories;
        });
    }
    getCategoryByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne({
                where: { ua: value },
            });
            if (!category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategoriesByIds(categoryIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findAll({
                where: {
                    id: categoryIds,
                },
            });
            if (category.length === 0 || !category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findByPk(categoryId);
            if (!category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.findAll();
            return categories.map((category) => {
                return {
                    id: category.id,
                    ua: category.ua,
                    en: category.en,
                    rs: category.rs,
                    ru: category.ru,
                    type: 'category',
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
                    ua: categoryDto.ua,
                    en: categoryDto.en,
                    rs: categoryDto.rs,
                    ru: categoryDto.ru,
                },
            });
            if (isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', category_colour_constants_1.ALREADY_EXIST_CATEGORY);
            }
            const category = yield this.categoryRepository.create(Object.assign({}, categoryDto));
            return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            };
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findByPk(categoryId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            const deleted = yield this.categoryRepository.destroy({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return deleted;
        });
    }
    updateCategory(categoryId, updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findByPk(categoryId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            isExist.ua = updateDto.ua;
            isExist.ru = updateDto.ru;
            isExist.rs = updateDto.rs;
            isExist.en = updateDto.en;
            yield isExist.save();
            const category = yield this.categoryRepository.findOne({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            };
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
/* 134 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/common/interfaces");

/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALREADY_EXIST_COLOUR = exports.NOT_FOUND_COLOUR = exports.ALREADY_EXIST_CATEGORY = exports.NOT_FOUND_CATEGORY = void 0;
exports.NOT_FOUND_CATEGORY = {
    ua: 'Категорію не знайдено!',
    en: 'Category not found!',
    ru: 'Категория не найдена!',
    rs: 'Категорија није пронађена!',
};
exports.ALREADY_EXIST_CATEGORY = {
    ua: 'Категорія вже існує!',
    en: 'Category already exist!',
    ru: 'Категория уже существует!',
    rs: 'Категорија већ постоји!',
};
exports.NOT_FOUND_COLOUR = {
    ua: 'Колір не знайдено!',
    en: 'Color not found!',
    ru: 'Цвет не найден!',
    rs: 'Боја није пронађена!',
};
exports.ALREADY_EXIST_COLOUR = {
    ua: 'Колір вже існує!',
    en: 'The color is already there!',
    ru: 'Цвет уже существует!',
    rs: 'Боја већ постоји!',
};


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColoursService = void 0;
const common_1 = __webpack_require__(7);
const interfaces_1 = __webpack_require__(134);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const category_colour_constants_1 = __webpack_require__(135);
const colours_model_1 = __webpack_require__(34);
let ColoursService = class ColoursService {
    constructor(colourRepository) {
        this.colourRepository = colourRepository;
    }
    setColours() {
        return __awaiter(this, void 0, void 0, function* () {
            const colours = yield this.colourRepository.bulkCreate([
                { ru: 'Бежевый', rs: '', en: '', ua: '', hex: '#FFE4C4' },
                { ru: 'Капучинный', rs: '', en: '', ua: '', hex: '#9F8E84' },
                { ru: 'Синий', rs: '', en: '', ua: '', hex: '#000080' },
                { ru: 'Голубой', rs: '', en: '', ua: '', hex: '#A6BEE5' },
                { ru: 'Коричневый', rs: '', en: '', ua: '', hex: '#0B0B0B' },
                { ru: 'Изумрудный', rs: '', en: '', ua: '', hex: '#24514C' },
                { ru: 'Розовый', rs: '', en: '', ua: '', hex: '#FFC0CB' },
                { ru: 'Фиолетовый', rs: '', en: '', ua: '', hex: '#800080' },
                { ru: 'Черный', rs: '', en: '', ua: '', hex: '#0B0B0B' },
                { ru: 'Оливковый', rs: '', en: '', ua: '', hex: '#829E86' },
                { ru: 'Белый', rs: '', en: '', ua: '', hex: '#fff' },
                { ru: 'Серый', rs: '', en: '', ua: '', hex: '#808080' },
                { ru: 'Графитовый', rs: '', en: '', ua: '', hex: '#525A5B' },
                { ru: 'Пудровый', rs: '', en: '', ua: '', hex: '#F2E2D8' },
            ]);
            return colours;
        });
    }
    getColourByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findOne({
                where: { ua: value },
            });
            if (!colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColoursByIds(colourIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findAll({
                where: {
                    id: colourIds,
                },
            });
            if (colour.length === 0 || !colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColourById(colourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findByPk(colourId);
            if (!colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColours() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.colourRepository.findAll();
            return categories.map((colour) => {
                return {
                    id: colour.id,
                    ua: colour.ua,
                    en: colour.en,
                    rs: colour.rs,
                    ru: colour.ru,
                    hex: colour.hex,
                    type: 'colour',
                    createdAt: colour.createdAt,
                    updatedAt: colour.updatedAt,
                };
            });
        });
    }
    createColour(colourDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findOne({
                where: {
                    ua: colourDto.ua,
                    en: colourDto.en,
                    rs: colourDto.rs,
                    ru: colourDto.ru,
                    hex: colourDto.hex,
                },
            });
            if (isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', category_colour_constants_1.ALREADY_EXIST_COLOUR);
            }
            const colour = yield this.colourRepository.create(Object.assign({}, colourDto));
            return {
                id: colour.id,
                ua: colour.ua,
                en: colour.en,
                rs: colour.rs,
                ru: colour.ru,
                hex: colour.hex,
                type: 'colour',
                createdAt: colour.createdAt,
                updatedAt: colour.updatedAt,
            };
        });
    }
    deleteColour(colourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findByPk(colourId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            const deleted = yield this.colourRepository.destroy({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                    hex: isExist.hex,
                },
            });
            return deleted;
        });
    }
    updateColour(colourId, updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findByPk(colourId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            isExist.ua = updateDto.ua;
            isExist.ru = updateDto.ru;
            isExist.rs = updateDto.rs;
            isExist.en = updateDto.en;
            isExist.hex = updateDto.hex;
            yield isExist.save();
            const colour = yield this.colourRepository.findOne({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return {
                id: colour.id,
                ua: colour.ua,
                en: colour.en,
                rs: colour.rs,
                ru: colour.ru,
                hex: colour.hex,
                type: 'colour',
                createdAt: colour.createdAt,
                updatedAt: colour.updatedAt,
            };
        });
    }
};
ColoursService = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(colours_model_1.Colour)),
    __metadata("design:paramtypes", [Object])
], ColoursService);
exports.ColoursService = ColoursService;


/***/ }),
/* 137 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const platform_express_1 = __webpack_require__(138);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const error_handler_filter_1 = __webpack_require__(88);
const create_product_dto_1 = __webpack_require__(139);
const throttler_1 = __webpack_require__(82);
const product_service_1 = __webpack_require__(131);
const roles_auth_decorator_1 = __webpack_require__(83);
const add_content_guard_1 = __webpack_require__(106);
const jw_refresh_guard_1 = __webpack_require__(86);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(85);
const roles_guard_1 = __webpack_require__(84);
const multer_1 = __webpack_require__(140);
const path_1 = __importStar(__webpack_require__(73));
const update_product_dto_1 = __webpack_require__(141);
const user_type_decorator_1 = __webpack_require__(96);
const user_id_decorator_1 = __webpack_require__(100);
const api_exception_filter_1 = __webpack_require__(90);
const fs_1 = __webpack_require__(117);
const uuid_1 = __webpack_require__(59);
const edit_content_guard_1 = __webpack_require__(142);
const formdata_pipe_1 = __webpack_require__(143);
const user_guard_1 = __webpack_require__(126);
const query_filter_dto_1 = __webpack_require__(146);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(response, request, next, page, pageSize) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProducts(request, response, next, page, pageSize);
        }))();
    }
    getCompare(response, request, next, page, pageSize, categories) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getCompareProducts(request, response, next, page, pageSize, categories);
        }))();
    }
    getProductsByCategory(response, request, next, page, pageSize, categories) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProductsByCategory(request, response, next, page, pageSize, categories);
        }))();
    }
    getProductsByIds(response, request, next, page, pageSize, productIds) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProductsByIds(request, response, next, productIds, page, pageSize);
        }))();
    }
    filterProducts(response, request, next, queryFilterDto) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.filterProducts(request, response, next, queryFilterDto);
        }))();
    }
    getById(response, request, next, productId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProductById(request, response, next, productId);
        }))();
    }
    getBookmarkProducts(response, request, next, page, pageSize, userId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getBookmarks(request, response, next, page, pageSize, userId);
        }))();
    }
    getWatchedProducts(response, request, next, page, pageSize, userId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getWatchedProducts(request, response, next, page, pageSize, userId);
        }))();
    }
    addWatchedProduct(productId, userId) {
        try {
            return this.productService.addWatchedProduct(productId, userId);
        }
        catch (err) {
            throw err;
        }
    }
    addBookmark(productId, userId) {
        try {
            return this.productService.addBookmarkProduct(productId, userId);
        }
        catch (err) {
            throw err;
        }
    }
    createProduct(createProductDto, files, userId, type) {
        try {
            return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
        }
        catch (error) {
            throw error;
        }
    }
    updateProduct(updateProductDto, productId, userId, type, files) {
        try {
            return this.productService.updateProduct(updateProductDto, productId, userId, type, files.images, files.sizeChartImage);
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
        return this.productService.deleteImage(filePath);
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('compare'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('categories', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object, Number, Number, Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getCompare", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('categories', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _k : Object, Number, Number, Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductsByCategory", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('productIds', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object, typeof (_m = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _m : Object, typeof (_o = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _o : Object, Number, Number, Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductsByIds", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object, typeof (_q = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _q : Object, typeof (_r = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _r : Object, typeof (_s = typeof query_filter_dto_1.QueryFilterDto !== "undefined" && query_filter_dto_1.QueryFilterDto) === "function" ? _s : Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "filterProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('/:productId'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object, typeof (_u = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _u : Object, typeof (_v = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _v : Object, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getById", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('bookmarkProducts'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object, typeof (_x = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _x : Object, typeof (_y = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _y : Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBookmarkProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('watchedProducts'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_z = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _z : Object, typeof (_0 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _0 : Object, typeof (_1 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _1 : Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getWatchedProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addWatchedProduct'),
    __param(0, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Object)
], ProductController.prototype, "addWatchedProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addBookmarkProduct'),
    __param(0, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Object)
], ProductController.prototype, "addBookmark", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Put)('create_product'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 30 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: (req, file, callback) => {
            const filetypes = /jpeg|jpg|png|gif|svg/;
            const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Only image files are allowed!'), false);
            }
        },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                var _a, _b, _c;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const destination = path_1.default.join(__dirname, 'static', 'products', `${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}`);
                const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_c = JSON.parse(req.body.title)) === null || _c === void 0 ? void 0 : _c.en.split(' ').join('_')}`, file.fieldname);
                if (!(0, fs_1.existsSync)(destination)) {
                    (0, fs_1.mkdirSync)(destination, { recursive: true });
                }
                if (!(0, fs_1.existsSync)(imagesPath)) {
                    (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
                }
                callback(null, imagesPath);
            },
            filename: (req, file, callback) => {
                var _a, _b;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const name = file.originalname.split('.')[0];
                const ext = (0, path_1.extname)(file.originalname);
                const randomName = (0, uuid_1.v4)();
                callback(null, `${randomName}--${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}--${name}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_4 = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _4 : Object, Object, Number, String]),
    __metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Patch)('update_product/:productId'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: (req, file, callback) => {
            const filetypes = /jpeg|jpg|png|gif|svg/;
            const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Only image files are allowed!'), false);
            }
        },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                var _a, _b, _c;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const destination = path_1.default.join(__dirname, 'static', 'products', `${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}`);
                const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_c = JSON.parse(req.body.title)) === null || _c === void 0 ? void 0 : _c.en.split(' ').join('_')}`, file.fieldname);
                if (!(0, fs_1.existsSync)(destination)) {
                    (0, fs_1.mkdirSync)(destination, { recursive: true });
                }
                if (!(0, fs_1.existsSync)(imagesPath)) {
                    (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
                }
                callback(null, imagesPath);
            },
            filename: (req, file, callback) => {
                var _a, _b;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const name = file.originalname.split('.')[0];
                const ext = (0, path_1.extname)(file.originalname);
                const randomName = (0, uuid_1.v4)();
                callback(null, `${randomName}--${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}--${name}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __param(4, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_6 = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _6 : Object, Number, Number, String, Object]),
    __metadata("design:returntype", typeof (_7 = typeof Promise !== "undefined" && Promise) === "function" ? _7 : Object)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Delete)('delete_product/:productId'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(202),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Delete)('delete_image'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_9 = typeof Promise !== "undefined" && Promise) === "function" ? _9 : Object)
], ProductController.prototype, "deleteFile", null);
ProductController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),
/* 138 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/platform-express");

/***/ }),
/* 139 */
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
const class_transformer_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(18);
class Nested {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "ua", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "ru", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "rs", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "en", void 0);
class Image {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], Image.prototype, "fileNames", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], Image.prototype, "colourId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], Image.prototype, "sizes", void 0);
class CreateProductDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], CreateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "colours", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Transform)((value) => Number(value.value)),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "selectedImages", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], CreateProductDto.prototype, "sizeChartImageDescription", void 0);
exports.CreateProductDto = CreateProductDto;


/***/ }),
/* 140 */
/***/ ((module) => {

"use strict";
module.exports = require("multer");

/***/ }),
/* 141 */
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
const class_transformer_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(18);
class Nested {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "ua", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "ru", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "rs", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    __metadata("design:type", String)
], Nested.prototype, "en", void 0);
class Image {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], Image.prototype, "fileNames", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    __metadata("design:type", Number)
], Image.prototype, "colourId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], Image.prototype, "sizes", void 0);
class UpdateProductDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], UpdateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "colours", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Transform)((value) => Number(value.value)),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], UpdateProductDto.prototype, "selectedImages", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Nested),
    __metadata("design:type", Nested)
], UpdateProductDto.prototype, "sizeChartImageDescription", void 0);
exports.UpdateProductDto = UpdateProductDto;


/***/ }),
/* 142 */
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
exports.EditContentGuard = void 0;
const common_1 = __webpack_require__(7);
const auth_constants_1 = __webpack_require__(12);
const admin_service_1 = __webpack_require__(60);
const api_exception_1 = __webpack_require__(52);
let EditContentGuard = class EditContentGuard {
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
            if (type && type === 'ADMIN' && admin.getEditContent()) {
                return true;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', auth_constants_1.NO_RIGHT);
        }))();
    }
};
EditContentGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _a : Object])
], EditContentGuard);
exports.EditContentGuard = EditContentGuard;


/***/ }),
/* 143 */
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
exports.ParseFormDataJsonPipe = void 0;
const deep_parse_json_1 = __webpack_require__(144);
const _ = __importStar(__webpack_require__(145));
class ParseFormDataJsonPipe {
    constructor(options) {
        this.options = options;
    }
    transform(value, _metadata) {
        try {
            const { except } = this.options;
            const serializedValue = value;
            const originProperties = {};
            if (except === null || except === void 0 ? void 0 : except.length) {
                _.merge(originProperties, _.pick(serializedValue, ...except));
            }
            const deserializedValue = (0, deep_parse_json_1.deepParseJson)(value);
            console.log(`deserializedValue`, deserializedValue, _metadata);
            return Object.assign(Object.assign({}, deserializedValue), originProperties);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.ParseFormDataJsonPipe = ParseFormDataJsonPipe;


/***/ }),
/* 144 */
/***/ ((module) => {

"use strict";
module.exports = require("deep-parse-json");

/***/ }),
/* 145 */
/***/ ((module) => {

"use strict";
module.exports = require("lodash");

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryFilterDto = void 0;
const class_transformer_1 = __webpack_require__(29);
const class_validator_1 = __webpack_require__(18);
class QueryFilterDto {
    constructor() {
        this.page = 1;
        this.pageSize = 5;
    }
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], QueryFilterDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryFilterDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryFilterDto.prototype, "order", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Array),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], QueryFilterDto.prototype, "sizes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], QueryFilterDto.prototype, "colours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Array),
    __metadata("design:type", Array)
], QueryFilterDto.prototype, "categories", void 0);
exports.QueryFilterDto = QueryFilterDto;


/***/ }),
/* 147 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesColoursModule = void 0;
const common_1 = __webpack_require__(7);
const categories_service_1 = __webpack_require__(133);
const categories_controller_1 = __webpack_require__(148);
const config_1 = __webpack_require__(108);
const sequelize_1 = __webpack_require__(8);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const auth_module_1 = __webpack_require__(91);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_module_1 = __webpack_require__(103);
const product_model_1 = __webpack_require__(32);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_module_1 = __webpack_require__(122);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const product_module_1 = __webpack_require__(130);
const initialize_user_middleware_1 = __webpack_require__(128);
const colours_service_1 = __webpack_require__(136);
const colours_controller_1 = __webpack_require__(150);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const product_middleware_1 = __webpack_require__(152);
let CategoriesColoursModule = class CategoriesColoursModule {
    configure(consumer) {
        consumer
            .apply(product_middleware_1.ProductMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'categories/create_category', method: common_1.RequestMethod.PUT }, { path: 'categories/delete_category', method: common_1.RequestMethod.DELETE }, { path: 'colours/create_colour', method: common_1.RequestMethod.PUT }, { path: 'colours/delete_colour', method: common_1.RequestMethod.DELETE }, { path: '*', method: common_1.RequestMethod.PATCH });
    }
};
CategoriesColoursModule = __decorate([
    (0, common_1.Module)({
        providers: [categories_service_1.CategoriesService, colours_service_1.ColoursService],
        controllers: [categories_controller_1.CategoriesController, colours_controller_1.ColoursController],
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
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
            ]),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        exports: [categories_service_1.CategoriesService, colours_service_1.ColoursService],
    })
], CategoriesColoursModule);
exports.CategoriesColoursModule = CategoriesColoursModule;


/***/ }),
/* 148 */
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
exports.CategoriesController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const throttler_1 = __webpack_require__(82);
const roles_auth_decorator_1 = __webpack_require__(83);
const add_content_guard_1 = __webpack_require__(106);
const jw_refresh_guard_1 = __webpack_require__(86);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(85);
const roles_guard_1 = __webpack_require__(84);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const error_handler_filter_1 = __webpack_require__(88);
const categories_service_1 = __webpack_require__(133);
const create_category_dto_1 = __webpack_require__(149);
const category_model_1 = __webpack_require__(43);
const api_exception_filter_1 = __webpack_require__(90);
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
    updateCategory(categoryId, categoryDto) {
        return this.categoriesService.updateCategory(categoryId, categoryDto);
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_category_dto_1.CreateCategoryDto !== "undefined" && create_category_dto_1.CreateCategoryDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], CategoriesController.prototype, "createCategory", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating Categories' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: category_model_1.Category }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Patch)('update_category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof create_category_dto_1.CreateCategoryDto !== "undefined" && create_category_dto_1.CreateCategoryDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.HttpCode)(200),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Delete)('delete_category/:categoryId'),
    __param(0, (0, common_1.Param)('categoryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
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
/* 149 */
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
], CreateCategoryDto.prototype, "ua", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "ru", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "rs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "en", void 0);
exports.CreateCategoryDto = CreateCategoryDto;


/***/ }),
/* 150 */
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
exports.ColoursController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const throttler_1 = __webpack_require__(82);
const roles_auth_decorator_1 = __webpack_require__(83);
const add_content_guard_1 = __webpack_require__(106);
const jw_refresh_guard_1 = __webpack_require__(86);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(85);
const roles_guard_1 = __webpack_require__(84);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const error_handler_filter_1 = __webpack_require__(88);
const create_colour_dto_1 = __webpack_require__(151);
const colours_model_1 = __webpack_require__(34);
const api_exception_filter_1 = __webpack_require__(90);
const colours_service_1 = __webpack_require__(136);
let ColoursController = class ColoursController {
    constructor(coloursService) {
        this.coloursService = coloursService;
    }
    getcolours() {
        return this.coloursService.getColours();
    }
    createcolour(colourDto) {
        return this.coloursService.createColour(colourDto);
    }
    updatecolour(colourId, colourDto) {
        return this.coloursService.updateColour(colourId, colourDto);
    }
    deletecolour(colourId) {
        return this.coloursService.deleteColour(colourId);
    }
};
__decorate([
    (0, throttler_1.Throttle)(700, 7000),
    (0, common_1.CacheTTL)(200),
    (0, common_1.Get)('get_colours'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ColoursController.prototype, "getcolours", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating colours' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: colours_model_1.Colour }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Put)('create_colour'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_colour_dto_1.CreateColourDto !== "undefined" && create_colour_dto_1.CreateColourDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ColoursController.prototype, "createcolour", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating colours' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: colours_model_1.Colour }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Patch)('update_colour/:colourId'),
    __param(0, (0, common_1.Param)('colourId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof create_colour_dto_1.CreateColourDto !== "undefined" && create_colour_dto_1.CreateColourDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ColoursController.prototype, "updatecolour", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.HttpCode)(200),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Delete)('delete_colour/:colourId'),
    __param(0, (0, common_1.Param)('colourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ColoursController.prototype, "deletecolour", null);
ColoursController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('colours'),
    __metadata("design:paramtypes", [typeof (_a = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _a : Object])
], ColoursController);
exports.ColoursController = ColoursController;


/***/ }),
/* 151 */
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
exports.CreateColourDto = void 0;
const class_validator_1 = __webpack_require__(18);
class CreateColourDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateColourDto.prototype, "ua", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateColourDto.prototype, "ru", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateColourDto.prototype, "rs", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateColourDto.prototype, "en", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/),
    __metadata("design:type", String)
], CreateColourDto.prototype, "hex", void 0);
exports.CreateColourDto = CreateColourDto;


/***/ }),
/* 152 */
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
exports.ProductMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
let ProductMiddleware = class ProductMiddleware {
    use(req, res, next) {
        try {
            const userAgent = req.headers['user-agent'];
            res.setHeader('Access-Control-Request-Headers', 'Authorization');
            res.setHeader('Access-Control-Request-Method', 'POST, GET, PUT, PATCH, DELETE');
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
], ProductMiddleware.prototype, "use", null);
ProductMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], ProductMiddleware);
exports.ProductMiddleware = ProductMiddleware;


/***/ }),
/* 153 */
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
const cart_service_1 = __webpack_require__(154);
const cart_controller_1 = __webpack_require__(155);
const config_1 = __webpack_require__(108);
const sequelize_1 = __webpack_require__(8);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const cart_model_1 = __webpack_require__(37);
const auth_module_1 = __webpack_require__(91);
const product_module_1 = __webpack_require__(130);
const users_module_1 = __webpack_require__(122);
const cart_product_model_1 = __webpack_require__(33);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const product_model_1 = __webpack_require__(32);
const orders_module_1 = __webpack_require__(158);
const categories_colours_module_1 = __webpack_require__(147);
const cart_middleware_1 = __webpack_require__(169);
const currency_service_1 = __webpack_require__(63);
const currencies_model_1 = __webpack_require__(48);
const admin_module_1 = __webpack_require__(9);
const owner_module_1 = __webpack_require__(103);
const mail_module_1 = __webpack_require__(121);
const axios_1 = __webpack_require__(64);
const product_service_1 = __webpack_require__(131);
let CartModule = class CartModule {
    configure(consumer) {
        consumer
            .apply(cart_middleware_1.CartMiddleware)
            .forRoutes({ path: 'cart/', method: common_1.RequestMethod.GET }, { path: 'cart/addProduct', method: common_1.RequestMethod.POST }, { path: 'cart/clear', method: common_1.RequestMethod.PUT }, { path: 'cart/deleteProduct', method: common_1.RequestMethod.DELETE }, { path: 'cart/leftCarts', method: common_1.RequestMethod.GET });
    }
};
CartModule = __decorate([
    (0, common_1.Module)({
        providers: [cart_service_1.CartService, currency_service_1.CurrencyService, product_service_1.ProductService],
        controllers: [cart_controller_1.CartController],
        exports: [cart_service_1.CartService],
        imports: [
            axios_1.HttpModule,
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
                cart_product_model_1.CartProduct,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
                currencies_model_1.Currencies,
            ]),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
        ],
    })
], CartModule);
exports.CartModule = CartModule;


/***/ }),
/* 154 */
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
var CartService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const cart_constants_1 = __webpack_require__(58);
const cart_model_1 = __webpack_require__(37);
const cart_product_model_1 = __webpack_require__(33);
const product_service_1 = __webpack_require__(131);
const crypto_1 = __webpack_require__(14);
const util_1 = __webpack_require__(15);
const uuid_1 = __webpack_require__(59);
const colours_service_1 = __webpack_require__(136);
let CartService = CartService_1 = class CartService {
    constructor(cartProductRepository, cartRepository, productService, colourSevice) {
        this.cartProductRepository = cartProductRepository;
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.colourSevice = colourSevice;
        this.Logger = new common_1.Logger(CartService_1.name);
    }
    setCart(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.signedCookies['_id']) {
                    const _id = yield this.generateEncryptedValue('USER', 16);
                    yield this.createCart(_id);
                    response.cookie('_id', _id, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production' ? true : false,
                        domain: process.env.CLIENT_DOMAIN.toString().trim(),
                        sameSite: 'strict',
                        signed: true,
                        path: '/',
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                    });
                    return response.json({ _id: _id });
                }
                response.cookie('_id', request.signedCookies['_id'], {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    sameSite: 'strict',
                    signed: true,
                    path: '/',
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                });
                return response.json({ _id: request.signedCookies['_id'] });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getCart(response, request, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const currency = request['currency'];
                let totalPrice = 0;
                cart.cartProducts.forEach((cartProduct) => {
                    totalPrice += Number(cartProduct.quantity) * Number(cartProduct.price);
                });
                cart.totalPrice = totalPrice;
                yield cart.save();
                return response.json({
                    cart: {
                        id: cart.id,
                        cartStatus: cart.cartStatus,
                        totalPrice: totalPrice * currency.rate + currency.symbol,
                        cartProducts: cart.cartProducts.map((cartProduct) => {
                            return {
                                id: cartProduct.id,
                                color: cartProduct.colour,
                                size: cartProduct.size,
                                price: cartProduct.price * currency.rate + currency.symbol,
                                imageUrl: cartProduct.imageUrl,
                                colourId: cartProduct.colourId,
                                colour: cartProduct.colour,
                                productId: cartProduct.productId,
                                quantity: cartProduct.quantity,
                            };
                        }),
                    },
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getLeftCarts(response, request, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const leftCarts = user.leftCarts;
                const currency = request['currency'];
                return response.json({
                    leftCarts: leftCarts.map((cart) => {
                        let totalPrice = 0;
                        cart.cartProducts.forEach((cartProduct) => {
                            totalPrice +=
                                Number(cartProduct.quantity) * Number(cartProduct.product.price);
                        });
                        return {
                            id: cart.id,
                            cartStatus: cart.cartStatus,
                            totalPrice: totalPrice * currency.rate + currency.symbol,
                            cartProducts: cart.cartProducts.map((cartProduct) => {
                                return {
                                    id: cartProduct.id,
                                    color: cartProduct.colour,
                                    size: cartProduct.size,
                                    price: cartProduct.price * currency.rate + currency.symbol,
                                    imageUrl: cartProduct.imageUrl,
                                    colourId: cartProduct.colourId,
                                    colour: cartProduct.colour,
                                    productId: cartProduct.productId,
                                    quantity: cartProduct.quantity,
                                };
                            }),
                        };
                    }),
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    addProductToCart(request, response, next, productId, addProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productService.findById(productId);
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const cartProductIndex = cart.cartProducts.findIndex((cartProduct) => {
                    return (addProduct.imageUrl === cartProduct.imageUrl &&
                        addProduct.size === cartProduct.size &&
                        addProduct.colorId === cartProduct.colourId);
                });
                let newQuantity = 1;
                if (cartProductIndex >= 0) {
                    newQuantity = cart.cartProducts[cartProductIndex].quantity + 1;
                    cart.cartProducts[cartProductIndex].quantity = newQuantity;
                    cart.totalPrice += product.price;
                    yield cart.save();
                }
                else {
                    const newCartProduct = yield this.cartProductRepository.create({
                        imageUrl: addProduct.imageUrl,
                        size: addProduct.size,
                        colorId: addProduct.colorId,
                        quantity: newQuantity,
                        productId: product.id,
                        cartId: cart.id,
                        price: product.price,
                    });
                    const colour = yield this.colourSevice.getColourById(addProduct.colorId);
                    newCartProduct.set('colour', colour);
                    newCartProduct.set('product', product);
                    newCartProduct.set('cart', cart);
                    cart.$add('cartProducts', newCartProduct);
                    yield Promise.all([yield cart.save(), yield newCartProduct.save()]);
                    let newTotalPrice = 0;
                    cart.cartProducts.forEach((cartProduct) => {
                        newTotalPrice +=
                            Number(cartProduct.quantity) * Number(cartProduct.product.price);
                    });
                    cart.totalPrice = newTotalPrice;
                    yield cart.save();
                }
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    deleteProductFromCart(request, response, next, cartProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                const [cartProduct] = cart.cartProducts.filter((cartProduct) => {
                    return cartProduct.id === cartProductId;
                });
                yield this.productService.findById(cartProduct.productId);
                if (cartProduct.quantity - 1 === 0) {
                    cart.$remove('cartProducts', cartProduct.id);
                    const cartProductIndex = cart.cartProducts.findIndex((cartProduct) => {
                        return cartProduct.id === cartProductId;
                    });
                    cart.cartProducts.splice(cartProductIndex, 1);
                    yield cart.save();
                }
                cartProduct.quantity -= 1;
                yield cartProduct.save();
                yield cart.save();
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    clearCart(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = request['user'];
                const cartIdentifier = request.signedCookies['_id'];
                let cart = yield this.findCartByIdentifier(cartIdentifier);
                if (user) {
                    cart = user.cart;
                }
                cart.cartProducts = [];
                yield cart.save();
                return response.json({ cart });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    getCartById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findByPk(cartId, {
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
    deleteCart(cartId, identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    id: cartId,
                    identifier: identifier,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            const deletedCart = yield this.cartRepository.destroy({
                where: {
                    id: cart.id,
                    identifier: cart.identifier,
                },
            });
            return deletedCart;
        });
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(cart_product_model_1.CartProduct)),
    __param(1, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object, typeof (_b = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _b : Object])
], CartService);
exports.CartService = CartService;


/***/ }),
/* 155 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartController = void 0;
const common_1 = __webpack_require__(7);
const throttler_1 = __webpack_require__(82);
const express_1 = __webpack_require__(20);
const roles_auth_decorator_1 = __webpack_require__(83);
const cart_guard_1 = __webpack_require__(156);
const jwt_auth_guard_1 = __webpack_require__(11);
const roles_guard_1 = __webpack_require__(84);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const api_exception_filter_1 = __webpack_require__(90);
const error_handler_filter_1 = __webpack_require__(88);
const cart_service_1 = __webpack_require__(154);
const add_product_dto_1 = __webpack_require__(157);
let CartController = class CartController {
    constructor(cardService) {
        this.cardService = cardService;
    }
    setCart(request, response, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.setCart(request, response, next);
        }))();
    }
    getCart(response, request, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.getCart(response, request, next);
        }))();
    }
    addProduct(response, request, next, productId, addProdcut) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.addProductToCart(request, response, next, productId, addProdcut);
        }))();
    }
    clearCart(response, request, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.clearCart(request, response, next);
        }))();
    }
    deleteProduct(response, request, next, cartProductId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.deleteProductFromCart(request, response, next, cartProductId);
        }))();
    }
    getLeftCarts(response, request, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.cardService.getLeftCarts(response, request, next);
        }))();
    }
};
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Get)('set-cart'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "setCart", null);
__decorate([
    (0, throttler_1.Throttle)(55, 550),
    (0, common_1.Get)('/'),
    (0, roles_auth_decorator_1.Roles)('ADMIN', 'USER', 'OWNER'),
    (0, common_1.UseGuards)(cart_guard_1.CartGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, throttler_1.Throttle)(55, 550),
    (0, roles_auth_decorator_1.Roles)('ADMIN', 'USER', 'OWNER'),
    (0, common_1.UseGuards)(cart_guard_1.CartGuard),
    (0, common_1.Post)('addProduct/:productId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _k : Object, Number, typeof (_l = typeof add_product_dto_1.AddProductDto !== "undefined" && add_product_dto_1.AddProductDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addProduct", null);
__decorate([
    (0, throttler_1.Throttle)(55, 550),
    (0, roles_auth_decorator_1.Roles)('ADMIN', 'USER', 'OWNER'),
    (0, common_1.UseGuards)(cart_guard_1.CartGuard),
    (0, common_1.Put)('clear'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _p : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, throttler_1.Throttle)(55, 550),
    (0, roles_auth_decorator_1.Roles)('ADMIN', 'USER', 'OWNER'),
    (0, common_1.UseGuards)(cart_guard_1.CartGuard),
    (0, common_1.Delete)('deleteProduct/:cartProductId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Param)('cartProductId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object, typeof (_r = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _r : Object, typeof (_s = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _s : Object, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(55, 550),
    (0, roles_auth_decorator_1.Roles)('ADMIN', 'USER', 'OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, cart_guard_1.CartGuard),
    (0, common_1.Get)('/leftCarts'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object, typeof (_u = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _u : Object, typeof (_v = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _v : Object]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getLeftCarts", null);
CartController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [typeof (_a = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _a : Object])
], CartController);
exports.CartController = CartController;


/***/ }),
/* 156 */
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
exports.CartGuard = void 0;
const common_1 = __webpack_require__(7);
const core_1 = __webpack_require__(4);
const admin_constants_1 = __webpack_require__(53);
const auth_constants_1 = __webpack_require__(12);
const auth_service_1 = __webpack_require__(13);
const roles_auth_decorator_1 = __webpack_require__(83);
const api_exception_1 = __webpack_require__(52);
let CartGuard = class CartGuard {
    constructor(authService, reflector) {
        this.authService = authService;
        this.reflector = reflector;
    }
    canActivate(context) {
        return (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const req = context.switchToHttp().getRequest();
                if (!req['user']) {
                    return true;
                }
                const requiredRoles = this.reflector.getAllAndOverride(roles_auth_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
                if (!requiredRoles) {
                    return true;
                }
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
                if (!payload.roles.some((role) => requiredRoles.includes(role.value))) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
                }
                return true;
            }
            catch (err) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ACCESS_DENIED);
            }
        }))();
    }
};
CartGuard = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object, typeof (_b = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _b : Object])
], CartGuard);
exports.CartGuard = CartGuard;


/***/ }),
/* 157 */
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
exports.AddProductDto = void 0;
const class_validator_1 = __webpack_require__(18);
class AddProductDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddProductDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddProductDto.prototype, "colorId", void 0);
exports.AddProductDto = AddProductDto;


/***/ }),
/* 158 */
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
const orders_service_1 = __webpack_require__(159);
const orders_controller_1 = __webpack_require__(165);
const sequelize_1 = __webpack_require__(8);
const auth_module_1 = __webpack_require__(91);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_module_1 = __webpack_require__(122);
const config_1 = __webpack_require__(108);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const cart_module_1 = __webpack_require__(153);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const product_model_1 = __webpack_require__(32);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const categories_colours_module_1 = __webpack_require__(147);
const is_user_middleware_1 = __webpack_require__(168);
let OrdersModule = class OrdersModule {
    configure(consumer) {
        consumer.apply(is_user_middleware_1.IsUser).forRoutes({
            path: 'orders/create_order',
            method: common_1.RequestMethod.POST,
        });
    }
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
                cart_product_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;


/***/ }),
/* 159 */
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
var OrdersService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersService = void 0;
const common_1 = __webpack_require__(7);
const crypto_1 = __importStar(__webpack_require__(14));
const cart_constants_1 = __webpack_require__(58);
const api_exception_1 = __webpack_require__(52);
const cart_service_1 = __webpack_require__(154);
const telegram_service_1 = __webpack_require__(160);
const sequelize_1 = __webpack_require__(8);
const order_model_1 = __webpack_require__(36);
const uuid_1 = __webpack_require__(59);
const util_1 = __webpack_require__(15);
const order_constants_1 = __webpack_require__(164);
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(orderRepository, bot, cartService) {
        this.orderRepository = orderRepository;
        this.bot = bot;
        this.cartService = cartService;
        this.Logger = new common_1.Logger(OrdersService_1.name);
        this.API_URL = `${process.env.LIQPAY_API_BASE_URL.trim()}/${Number(process.env.LIQPAY_API_VERSION)}`;
    }
    createOrder(request, response, next, cartId, createOrderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userCart = yield this.cartService.getCartById(cartId);
                if (!userCart.cartProducts || userCart.cartProducts.length === 0) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', cart_constants_1.CART_EMPTY);
                }
                const order = yield this.orderRepository.create(Object.assign({}, createOrderDto));
                const orderToken = yield this.generateEncryptedValue('USER', 16);
                order.setOrderToken(orderToken);
                order.setOrderTokenExpiration(new Date());
                order.cartId = userCart.id;
                order.$set('cart', userCart);
                userCart.$set('order', order);
                yield order.save();
                yield userCart.save();
                if (request['user']) {
                    const user = request['user'];
                    order.$set('user', user.id);
                    order.userId = user.id;
                    user.$add('orders', order);
                    yield user.save();
                    yield order.save();
                }
                response.cookie('orderToken', orderToken, {
                    maxAge: 1000 * 60 * 60 * 24,
                    path: '/',
                    httpOnly: true,
                    signed: true,
                    domain: process.env.CLIENT_DOMAIN.toString().trim(),
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                    sameSite: 'strict',
                });
                return response.json({ orderId: order.id });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    continueOrder(request, response, next, continueOrderDto, languageCode = 'en') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderToken = request.signedCookies['orderToken'];
                if (!orderToken) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', order_constants_1.ORDER_TOKEN_NOT_PROVIDED);
                }
                const order = yield this.orderRepository.findOne({
                    where: { orderToken: orderToken },
                    include: { all: true },
                });
                if (!order) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', order_constants_1.ORDER_NOT_FOUND);
                }
                let paymentLink = null;
                let totalPrice;
                const currency = request['currency'];
                order.city = continueOrderDto.city;
                order.country = continueOrderDto.country;
                order.postOffice = continueOrderDto.postOffice;
                order.setCurrency(currency);
                order.languageCode = languageCode;
                if (continueOrderDto.comment) {
                    order.comment = continueOrderDto.comment;
                }
                if (continueOrderDto.sendDate) {
                    order.sendDate = continueOrderDto.sendDate;
                }
                for (const cartProduct of order.cart.cartProducts) {
                    order.$add('orderProducts', cartProduct);
                }
                order.orderProducts.forEach((orderProduct) => {
                    totalPrice +=
                        Number(orderProduct.quantity) * Number(orderProduct.price);
                });
                order.totalPrice = totalPrice * currency.rate;
                yield order.save();
                if (continueOrderDto.payByCard && !continueOrderDto.payInCash) {
                    paymentLink = this.ganeratePaymentLink({
                        userName: order.userName,
                        userSurname: order.userSurname,
                        amount: order.totalPrice,
                        orderId: order.id,
                        description: '',
                        orderProducts: order.orderProducts,
                        languageCode: languageCode,
                    }, currency);
                    return response.json({ paymentLink: paymentLink, orderId: order.id });
                }
                yield this.bot.sendMessage(order);
                return response.json({ paymentLink: paymentLink, orderId: order.id });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    verifyOrder(data, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedData = this.parseDataString(data);
            const order = yield this.orderRepository.findByPk(parsedData.order_id, {
                include: { all: true },
            });
            const dataToSign = this.generateDataToSign({
                userName: order.userName,
                userSurname: order.userSurname,
                amount: order.totalPrice,
                orderId: order.id,
                description: '',
                orderProducts: order.orderProducts,
                languageCode: order.languageCode,
            }, order.getCurrency());
            const dataString = this.objectToBase64(dataToSign);
            const verification = this.verifyDataString(dataString, signature);
            if (verification) {
                yield this.bot.sendMessage(order);
            }
            return;
        });
    }
    ganeratePaymentLink(params, currency) {
        const dataToSign = this.generateDataToSign(params, currency);
        const dataString = this.objectToBase64(dataToSign);
        const signature = this.signString(dataString);
        return `${this.API_URL}/checkout?data=${dataString}&signature=${signature}`;
    }
    generateDataToSign(params, currency) {
        const dataToSign = {
            version: Number(process.env.LIQPAY_API_VERSION),
            action: 'pay',
            sender_first_name: params.userName,
            sender_last_name: params.userSurname,
            sender_country_code: currency.countryCode,
            amount: params.amount,
            order_id: params.orderId,
            description: params.description.slice(0, 150),
            currency: currency.currencyCode,
            public_key: process.env.LIQPAY_PUBLIC_KEY.trim(),
            private_key: process.env.LIQPAY_PRIVATE_KEY.trim(),
            sandbox: false,
            language: params.languageCode,
            server_url: process.env.API_URL.trim(),
            result_url: `${process.env.REDIRECT_URL.trim()}?orderId=${params.orderId}`,
            rro_info: {
                items: params.orderProducts.map((orderProduct) => {
                    return {
                        amount: orderProduct.quantity,
                        price: orderProduct.price * currency.rate,
                        cost: orderProduct.price * currency.rate * orderProduct.quantity,
                        id: orderProduct.id,
                    };
                }),
            },
        };
        return dataToSign;
    }
    signString(strToSign) {
        const hash = crypto_1.default.createHash('sha1');
        hash.update(process.env.LIQPAY_PRIVATE_KEY.trim() +
            strToSign +
            process.env.LIQPAY_PRIVATE_KEY.trim());
        return hash.digest('base64');
    }
    objectToBase64(data) {
        return Buffer.from(JSON.stringify(data)).toString('base64');
    }
    parseDataString(dataString) {
        return JSON.parse(Buffer.from(dataString, 'base64').toString('utf-8'));
    }
    verifyDataString(dataString, signature) {
        return crypto_1.default.timingSafeEqual(Buffer.from(this.signString(dataString)), Buffer.from(signature));
    }
    generateEncryptedValue(value, bytes) {
        return __awaiter(this, void 0, void 0, function* () {
            const iv = (0, crypto_1.randomBytes)(bytes);
            const API_KEY = process.env.API_KEY.toString();
            const key = (yield (0, util_1.promisify)(crypto_1.scrypt)(API_KEY, 'salt', 32));
            const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
            return Buffer.concat([cipher.update(value), cipher.final()])
                .toString('base64')
                .replace('/', `${(0, uuid_1.v4)()}`)
                .replace('=', `${(0, uuid_1.v4)()}`);
        });
    }
};
OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(order_model_1.Order)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof telegram_service_1.TelegramService !== "undefined" && telegram_service_1.TelegramService) === "function" ? _a : Object, typeof (_b = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _b : Object])
], OrdersService);
exports.OrdersService = OrdersService;


/***/ }),
/* 160 */
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
const telegraf_1 = __webpack_require__(161);
const telegram_constants_1 = __webpack_require__(162);
const telegram_interface_1 = __webpack_require__(163);
let TelegramService = class TelegramService {
    constructor(options) {
        this.bot = new telegraf_1.Telegraf(options.token);
        this.options = options;
    }
    sendMessage(order, chatId = this.options.chatId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    createMessage(order) { }
};
TelegramService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(telegram_constants_1.TELEGRAM_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [typeof (_a = typeof telegram_interface_1.ITelegramOptions !== "undefined" && telegram_interface_1.ITelegramOptions) === "function" ? _a : Object])
], TelegramService);
exports.TelegramService = TelegramService;


/***/ }),
/* 161 */
/***/ ((module) => {

"use strict";
module.exports = require("telegraf");

/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TELEGRAM_MODULE_OPTIONS = void 0;
exports.TELEGRAM_MODULE_OPTIONS = 'TELEGRAM_MODULE_OPTIONS';


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ORDER_NOT_FOUND = exports.ORDER_TOKEN_NOT_PROVIDED = void 0;
exports.ORDER_TOKEN_NOT_PROVIDED = {
    ua: 'Кошик користувача не знайдено!',
    en: 'User`s cart not found!',
    ru: 'Корзина пользователя не найдена!',
    rs: 'Корисничка корпа није пронађена!',
};
exports.ORDER_NOT_FOUND = {
    ua: 'Кошик користувача не знайдено!',
    en: 'User`s cart not found!',
    ru: 'Корзина пользователя не найдена!',
    rs: 'Корисничка корпа није пронађена!',
};


/***/ }),
/* 165 */
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrdersController = void 0;
const common_1 = __webpack_require__(7);
const throttler_1 = __webpack_require__(82);
const express_1 = __webpack_require__(20);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const api_exception_filter_1 = __webpack_require__(90);
const error_handler_filter_1 = __webpack_require__(88);
const create_order_dto_1 = __webpack_require__(166);
const continue_order_dto_1 = __webpack_require__(167);
let OrdersController = class OrdersController {
    createOrder(request, response, next, cartId, createOrderDto) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return console.log(request, response, next, cartId, createOrderDto);
        }))();
    }
    continueOrder(request, response, next, continueOrderDto) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return console.log(request, response, next, continueOrderDto);
        }))();
    }
    verifyOrder(request, response, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return console.log(request, response, next);
        }))();
    }
};
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Post)('create_order'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('catdId', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object, Number, typeof (_d = typeof create_order_dto_1.CreateOrderDto !== "undefined" && create_order_dto_1.CreateOrderDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "createOrder", null);
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.HttpCode)(201),
    (0, common_1.Put)('continue_order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object, typeof (_h = typeof continue_order_dto_1.ContinueOrderDto !== "undefined" && continue_order_dto_1.ContinueOrderDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "continueOrder", null);
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('verify_order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, typeof (_l = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "verifyOrder", null);
OrdersController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('orders')
], OrdersController);
exports.OrdersController = OrdersController;


/***/ }),
/* 166 */
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
exports.CreateOrderDto = void 0;
const class_validator_1 = __webpack_require__(18);
const auth_constants_1 = __webpack_require__(12);
class CreateOrderDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: auth_constants_1.USERNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-я_-]{2,30}/, {
        message: auth_constants_1.SURNAME_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userSurname", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Matches)(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, {
        message: auth_constants_1.EMAIL_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: auth_constants_1.PHONE_NUMRER_VALIDATION,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userPhoneNumber", void 0);
exports.CreateOrderDto = CreateOrderDto;


/***/ }),
/* 167 */
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
exports.ContinueOrderDto = void 0;
const class_validator_1 = __webpack_require__(18);
class ContinueOrderDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContinueOrderDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContinueOrderDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], ContinueOrderDto.prototype, "postOffice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], ContinueOrderDto.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ContinueOrderDto.prototype, "sendDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContinueOrderDto.prototype, "payByCard", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContinueOrderDto.prototype, "payInCash", void 0);
exports.ContinueOrderDto = ContinueOrderDto;


/***/ }),
/* 168 */
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
exports.IsUser = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const jwt_refresh_service_1 = __webpack_require__(68);
const decorators_1 = __webpack_require__(93);
let IsUser = class IsUser {
    constructor(userJwtRefreshTokenService) {
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
                res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
                if (refreshToken) {
                    const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
                    const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
                    req['user'] = userRefreshToken.token.getUser();
                }
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
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], IsUser.prototype, "use", null);
IsUser = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_1.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_1.UserJwtRefreshTokenService) === "function" ? _a : Object])
], IsUser);
exports.IsUser = IsUser;


/***/ }),
/* 169 */
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CartMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const cart_constants_1 = __webpack_require__(58);
const jwt_refresh_service_1 = __webpack_require__(76);
const auth_constants_1 = __webpack_require__(12);
const jwt_refresh_service_2 = __webpack_require__(75);
const jwt_refresh_service_3 = __webpack_require__(68);
const api_exception_1 = __webpack_require__(52);
const cart_service_1 = __webpack_require__(154);
let CartMiddleware = class CartMiddleware {
    constructor(ownerJwtRefreshTokenService, adminJwtRefreshTokenService, userJwtRefreshTokenService, cartService) {
        this.ownerJwtRefreshTokenService = ownerJwtRefreshTokenService;
        this.adminJwtRefreshTokenService = adminJwtRefreshTokenService;
        this.userJwtRefreshTokenService = userJwtRefreshTokenService;
        this.cartService = cartService;
    }
    use(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userAgent = req.headers['user-agent'];
                res.setHeader('Access-Control-Request-Headers', 'Authorization');
                res.setHeader('Access-Control-Request-Method', 'POST, GET, DELETE');
                res.setHeader('Timing-Allow-Origin', `${process.env.ACCESS_ALLOW}`);
                req['userAgent'] = userAgent;
                const refreshToken = req === null || req === void 0 ? void 0 : req.cookies['refreshToken'];
                if (refreshToken) {
                    const decodedToken = Buffer.from(refreshToken, 'base64').toString('ascii');
                    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
                    const ownerRefreshToken = yield this.ownerJwtRefreshTokenService.findToken(decodedToken);
                    if (ownerRefreshToken) {
                        req['user'] = ownerRefreshToken.token.getOwner();
                        return next();
                    }
                    const adminRefreshToken = yield this.adminJwtRefreshTokenService.findToken(decodedToken);
                    if (adminRefreshToken) {
                        req['user'] = adminRefreshToken.token.getAdmin();
                        return next();
                    }
                    const userRefreshToken = yield this.userJwtRefreshTokenService.findToken(decodedToken);
                    if (!userRefreshToken) {
                        throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', auth_constants_1.INVALID_REFRESH_TOKEN);
                    }
                    req['user'] = userRefreshToken.token.getUser();
                    return next();
                }
                req['user'] = null;
                const cartIdentifier = req.signedCookies['_id'];
                if (!cartIdentifier) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request!', cart_constants_1.IDENTIFIER_NOT_PROVIDED);
                }
                yield this.cartService.findCartByIdentifier(cartIdentifier);
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
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], CartMiddleware.prototype, "use", null);
CartMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_refresh_service_2.OwnerJwtRefreshService !== "undefined" && jwt_refresh_service_2.OwnerJwtRefreshService) === "function" ? _a : Object, typeof (_b = typeof jwt_refresh_service_1.AdminJwtRefreshService !== "undefined" && jwt_refresh_service_1.AdminJwtRefreshService) === "function" ? _b : Object, typeof (_c = typeof jwt_refresh_service_3.UserJwtRefreshTokenService !== "undefined" && jwt_refresh_service_3.UserJwtRefreshTokenService) === "function" ? _c : Object, typeof (_d = typeof cart_service_1.CartService !== "undefined" && cart_service_1.CartService) === "function" ? _d : Object])
], CartMiddleware);
exports.CartMiddleware = CartMiddleware;


/***/ }),
/* 170 */
/***/ ((module) => {

"use strict";
module.exports = require("@nestjs/bull");

/***/ }),
/* 171 */
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var ColectingGarbageFiles_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColectingGarbageFiles = void 0;
const bull_1 = __webpack_require__(170);
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const bull_2 = __webpack_require__(172);
const fs_1 = __webpack_require__(117);
const path_1 = __webpack_require__(73);
const product_model_1 = __webpack_require__(32);
let ColectingGarbageFiles = ColectingGarbageFiles_1 = class ColectingGarbageFiles {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.logger = new common_1.Logger(ColectingGarbageFiles_1.name);
    }
    processNamedJob(job) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.warn('JOB started: deleting files', job.name);
                this.logger.log(process.cwd());
                const products = yield this.productRepository.findAll();
                if (products.length === 0) {
                    this.logger.log('JOB finished succesfully!', job.name);
                    return;
                }
                try {
                    for (var _d = true, products_1 = __asyncValues(products), products_1_1; products_1_1 = yield products_1.next(), _a = products_1_1.done, !_a;) {
                        _c = products_1_1.value;
                        _d = false;
                        try {
                            const product = _c;
                            for (let j = 0; j < product.images.length; j++) {
                                const IMAGE = JSON.parse(product.images[j]);
                                for (let i = 0; i < IMAGE.imagesPaths.length; i++) {
                                    const file = (0, path_1.join)(__dirname, 'static' + IMAGE.imagesPaths[i]);
                                    if (!(0, fs_1.existsSync)(file)) {
                                        IMAGE.imagesPaths.splice(i, 1);
                                    }
                                }
                                product.images[j] = JSON.stringify(Object.assign(Object.assign({}, IMAGE), { imagesPaths: IMAGE.imagesPaths }));
                                yield product.save();
                            }
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = products_1.return)) yield _b.call(products_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.logger.log('JOB finished succesfully!', job.name);
                return;
            }
            catch (err) {
                this.logger.error(err);
                process.exit(1);
            }
        });
    }
};
__decorate([
    (0, bull_1.Process)('deleteFiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ColectingGarbageFiles.prototype, "processNamedJob", null);
ColectingGarbageFiles = ColectingGarbageFiles_1 = __decorate([
    (0, bull_1.Processor)('garbageColecting'),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object])
], ColectingGarbageFiles);
exports.ColectingGarbageFiles = ColectingGarbageFiles;


/***/ }),
/* 172 */
/***/ ((module) => {

"use strict";
module.exports = require("bull");

/***/ }),
/* 173 */
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
var WorkerService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkerService = void 0;
const bull_1 = __webpack_require__(170);
const common_1 = __webpack_require__(7);
const schedule_1 = __webpack_require__(62);
const bull_2 = __webpack_require__(172);
let WorkerService = WorkerService_1 = class WorkerService {
    constructor(schedulerRegistry, garbageQueue, freshQueue) {
        this.schedulerRegistry = schedulerRegistry;
        this.garbageQueue = garbageQueue;
        this.freshQueue = freshQueue;
        this.logger = new common_1.Logger(WorkerService_1.name);
    }
    deleteFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.garbageQueue.add('deleteFiles');
                this.logger.log('done');
            }
            catch (err) {
                this.deleteCron('garbageColecting');
            }
        });
    }
    freshCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.freshQueue.add('freshCarts');
                this.logger.log('done');
            }
            catch (err) {
                this.deleteCron('freshCarts');
            }
        });
    }
    deleteCron(name) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
        return;
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_2_HOURS, {
        name: 'garbageColecting',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkerService.prototype, "deleteFiles", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_12_HOURS, {
        name: 'freshCarts',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkerService.prototype, "freshCarts", null);
WorkerService = WorkerService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __param(1, (0, bull_1.InjectQueue)('garbageColecting')),
    __param(2, (0, bull_1.InjectQueue)('deleteProductsFromCarts')),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _b : Object, typeof (_c = typeof bull_2.Queue !== "undefined" && bull_2.Queue) === "function" ? _c : Object])
], WorkerService);
exports.WorkerService = WorkerService;


/***/ }),
/* 174 */
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var DeleteProductsFromCarts_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteProductsFromCarts = void 0;
const bull_1 = __webpack_require__(170);
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const bull_2 = __webpack_require__(172);
const cart_model_1 = __webpack_require__(37);
const product_model_1 = __webpack_require__(32);
let DeleteProductsFromCarts = DeleteProductsFromCarts_1 = class DeleteProductsFromCarts {
    constructor(productRepository, cartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.logger = new common_1.Logger(DeleteProductsFromCarts_1.name);
    }
    processNamedJob(job) {
        var _a, e_1, _b, _c, _d, e_2, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield this.cartRepository.findAll({
                    include: { all: true },
                });
                this.logger.warn('JOB started: freashingCarts', job.name);
                this.logger.log(process.cwd());
                try {
                    for (var _g = true, carts_1 = __asyncValues(carts), carts_1_1; carts_1_1 = yield carts_1.next(), _a = carts_1_1.done, !_a;) {
                        _c = carts_1_1.value;
                        _g = false;
                        try {
                            const cart = _c;
                            try {
                                for (var _h = true, _j = (e_2 = void 0, __asyncValues(cart.cartProducts)), _k; _k = yield _j.next(), _d = _k.done, !_d;) {
                                    _f = _k.value;
                                    _h = false;
                                    try {
                                        const cartProduct = _f;
                                        const product = yield this.productRepository.findByPk(cartProduct.productId);
                                        if (!product) {
                                            cart.$remove('cartProducts', cartProduct.id);
                                        }
                                    }
                                    finally {
                                        _h = true;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (!_h && !_d && (_e = _j.return)) yield _e.call(_j);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            yield cart.save();
                        }
                        finally {
                            _g = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_g && !_a && (_b = carts_1.return)) yield _b.call(carts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                this.logger.log('JOB finished succesfully!', job.name);
                return;
            }
            catch (err) {
                this.logger.error(err);
                process.exit(1);
            }
        });
    }
};
__decorate([
    (0, bull_1.Process)('freshCarts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof bull_2.Job !== "undefined" && bull_2.Job) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DeleteProductsFromCarts.prototype, "processNamedJob", null);
DeleteProductsFromCarts = DeleteProductsFromCarts_1 = __decorate([
    (0, bull_1.Processor)('deleteProductsFromCarts'),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(1, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __metadata("design:paramtypes", [Object, Object])
], DeleteProductsFromCarts);
exports.DeleteProductsFromCarts = DeleteProductsFromCarts;


/***/ }),
/* 175 */
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
const decorators_1 = __webpack_require__(93);
const admin_service_1 = __webpack_require__(60);
const owner_service_1 = __webpack_require__(61);
const users_service_1 = __webpack_require__(24);
const auth_constants_1 = __webpack_require__(12);
const api_exception_1 = __webpack_require__(52);
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
/* 176 */
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
const admin_model_1 = __webpack_require__(28);
const owner_model_1 = __webpack_require__(31);
const api_exception_1 = __webpack_require__(52);
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
/* 177 */
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
const interfaces_1 = __webpack_require__(134);
const event_emitter_1 = __webpack_require__(70);
const jwt_refresh_token_deleted_evet_1 = __webpack_require__(72);
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
/* 178 */
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
const user_constants_1 = __webpack_require__(50);
const uuid_1 = __webpack_require__(59);
const users_service_1 = __webpack_require__(24);
const api_exception_1 = __webpack_require__(52);
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
/* 179 */
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
const admin_constants_1 = __webpack_require__(53);
const auth_constants_1 = __webpack_require__(12);
const admin_service_1 = __webpack_require__(60);
const api_exception_1 = __webpack_require__(52);
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
/* 180 */
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
var CorsMiddleware_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const geoip_lite_1 = __importDefault(__webpack_require__(181));
const ip_1 = __importDefault(__webpack_require__(182));
let CorsMiddleware = CorsMiddleware_1 = class CorsMiddleware {
    constructor() {
        this.Logger = new common_1.Logger(CorsMiddleware_1.name);
    }
    use(req, res, next) {
        const headers = JSON.parse(JSON.stringify(req.headers));
        const isEmpty = this.isEmpty(headers);
        const geo = geoip_lite_1.default.reloadDataSync();
        const ipAddress = ip_1.default.address();
        this.Logger.log(geo);
        this.Logger.log(ipAddress);
        this.Logger.log(req.headers['x-forwarded-for']);
        if (isEmpty) {
            throw new common_1.BadRequestException({
                message: 'No request headers were provided!',
            });
        }
        res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL.toString().trim()}`);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.setHeader('X-Frame-Options', 'deny');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0, s-maxage=0');
        res.setHeader('Expires', '0');
        res.setHeader('Strict-Transport-Security', 'max-age=5184000,preload');
        res.setHeader('Content-Security-Policy', `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'`);
        res.setHeader('X-Content-Security-Policy', `default-src 'self'; script-src 'self'; object-src 'self'; style-src 'self'; img - src 'self' data:; media - src 'self'; frame - src 'self'; font - src 'self'; connect - src 'self'`);
        res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
        res.setHeader('X-DNS-Prefetch-Control', 'off');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('X-WebKit-CSP', `default-src 'self'; script-src 'self'; object-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; frame-src 'self'; font-src 'self'; connect-src 'self'`);
        res.removeHeader('server');
        res.removeHeader('X-Powered-By');
        res.setHeader('X-XSS-Protection', '1; mode=block');
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
CorsMiddleware = CorsMiddleware_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;


/***/ }),
/* 181 */
/***/ ((module) => {

"use strict";
module.exports = require("geoip-lite");

/***/ }),
/* 182 */
/***/ ((module) => {

"use strict";
module.exports = require("ip");

/***/ }),
/* 183 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppController_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const path_1 = __importDefault(__webpack_require__(73));
const geoip2_node_1 = __webpack_require__(184);
const rxjs_1 = __webpack_require__(65);
const express_1 = __webpack_require__(20);
const axios_1 = __webpack_require__(64);
const decorators_1 = __webpack_require__(93);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const throttler_1 = __webpack_require__(82);
let AppController = AppController_1 = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
        this.Logger = new common_1.Logger(AppController_1.name);
    }
    getLocation(request, response, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const ipAddress = request.headers['x-forwarded-for'];
                this.Logger.log(ipAddress);
                const reader = yield geoip2_node_1.Reader.open(path_1.default.join(__dirname, process.env.IP_ADDRESS_DB.trim()));
                const geoCountry = reader.country(request.ip);
                return response.json({
                    geoLocation: Object.assign({ currency: request['currency'], city: request['city'] }, geoCountry),
                });
            }
            catch (err) {
                this.Logger.error(err);
                next(err);
            }
        }))();
    }
    getCurrency(base) {
        try {
            return this.getCurrencies(base);
        }
        catch (err) {
            this.Logger.error(err);
            throw err;
        }
    }
    sse() {
        return (0, rxjs_1.timeout)(1000).apply((0, rxjs_1.map)((_) => ({ data: { hello: 'world' } })));
    }
    getCurrencies(base) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`${process.env.API_CURRENCIES.trim()}/${!base
                ? process.env.BASE_CURRENCY.toLowerCase().trim()
                : base.toLowerCase().trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } })
                .pipe((0, rxjs_1.map)((res) => res.data))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.Logger.error(error.response.data);
                throw error;
            })));
            return data;
        });
    }
};
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Get)('get-location'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLocation", null);
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Get)('get-currencies'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorators_1.Query)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCurrency", null);
__decorate([
    (0, common_1.Sse)('sse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], AppController.prototype, "sse", null);
AppController = AppController_1 = __decorate([
    (0, swagger_1.ApiTags)('/'),
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),
/* 184 */
/***/ ((module) => {

"use strict";
module.exports = require("@maxmind/geoip2-node");

/***/ }),
/* 185 */
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
const telegram_constants_1 = __webpack_require__(162);
const telegram_service_1 = __webpack_require__(160);
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
/* 186 */
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
/* 187 */
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
exports.ReviewsModule = void 0;
const common_1 = __webpack_require__(7);
const config_1 = __webpack_require__(108);
const sequelize_1 = __webpack_require__(8);
const categories_service_1 = __webpack_require__(133);
const initialize_user_middleware_1 = __webpack_require__(128);
const admin_module_1 = __webpack_require__(9);
const admin_model_1 = __webpack_require__(28);
const admin_refresh_token_model_1 = __webpack_require__(49);
const auth_module_1 = __webpack_require__(91);
const cart_module_1 = __webpack_require__(153);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(37);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const orders_module_1 = __webpack_require__(158);
const owner_model_1 = __webpack_require__(31);
const owner_refresh_token_model_1 = __webpack_require__(47);
const owner_module_1 = __webpack_require__(103);
const product_model_1 = __webpack_require__(32);
const product_service_1 = __webpack_require__(131);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const roles_module_1 = __webpack_require__(104);
const user_model_1 = __webpack_require__(38);
const user_refresh_token_model_1 = __webpack_require__(39);
const users_module_1 = __webpack_require__(122);
const product_reviews_model_1 = __webpack_require__(46);
const review_model_1 = __webpack_require__(45);
const reviews_controller_1 = __webpack_require__(188);
const reviews_service_1 = __webpack_require__(190);
const create_review_dto_1 = __webpack_require__(189);
const body_validator_pipe_1 = __importDefault(__webpack_require__(129));
const categories_colours_module_1 = __webpack_require__(147);
const product_module_1 = __webpack_require__(130);
let ReviewsModule = class ReviewsModule {
    configure(consumer) {
        consumer.apply(body_validator_pipe_1.default.validate(create_review_dto_1.CreateReviewDto)).forRoutes({
            path: 'reviews/create_review',
            method: common_1.RequestMethod.DELETE,
        });
        consumer.apply(initialize_user_middleware_1.InitializeUserMiddleware).forRoutes({
            path: 'reviews/delete_review',
            method: common_1.RequestMethod.DELETE,
        });
    }
};
ReviewsModule = __decorate([
    (0, common_1.Module)({
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService, product_service_1.ProductService, categories_service_1.CategoriesService],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                product_reviews_model_1.ProductReviews,
                review_model_1.Review,
                product_model_1.Product,
                colours_model_1.Colour,
                product_colour_model_1.ProductColours,
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
                cart_product_model_1.CartProduct,
            ]),
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => cart_module_1.CartModule),
            (0, common_1.forwardRef)(() => categories_colours_module_1.CategoriesColoursModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
        ],
    })
], ReviewsModule);
exports.ReviewsModule = ReviewsModule;


/***/ }),
/* 188 */
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewsController = void 0;
const common_1 = __webpack_require__(7);
const throttler_1 = __webpack_require__(82);
const roles_auth_decorator_1 = __webpack_require__(83);
const jw_refresh_guard_1 = __webpack_require__(86);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(85);
const roles_guard_1 = __webpack_require__(84);
const api_exception_filter_1 = __webpack_require__(90);
const error_handler_filter_1 = __webpack_require__(88);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const create_review_dto_1 = __webpack_require__(189);
const reviews_service_1 = __webpack_require__(190);
const edit_content_guard_1 = __webpack_require__(142);
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    createReview(createReviewDto, productId) {
        try {
            return this.reviewsService.createReview(createReviewDto, productId);
        }
        catch (error) {
            throw error;
        }
    }
    deleteReview(reviewId) {
        try {
            return this.reviewsService.deleteReview(reviewId);
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Put)('create_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_review_dto_1.CreateReviewDto !== "undefined" && create_review_dto_1.CreateReviewDto) === "function" ? _b : Object, Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_review'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)('reviewId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "deleteReview", null);
ReviewsController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [typeof (_a = typeof reviews_service_1.ReviewsService !== "undefined" && reviews_service_1.ReviewsService) === "function" ? _a : Object])
], ReviewsController);
exports.ReviewsController = ReviewsController;


/***/ }),
/* 189 */
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
exports.CreateReviewDto = void 0;
const class_validator_1 = __webpack_require__(18);
class CreateReviewDto {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.Matches)(/[a-zA-Z0-9а-яієїґА_ЯЇЄЇЁёА-яzžitisšte_-]/gi),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "review", void 0);
exports.CreateReviewDto = CreateReviewDto;


/***/ }),
/* 190 */
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
exports.ReviewsService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const product_service_1 = __webpack_require__(131);
const review_model_1 = __webpack_require__(45);
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.Logger = new common_1.Logger(product_service_1.ProductService.name);
    }
    createReview(createdReviewDto, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findById(productId);
            const review = yield this.reviewRepository.create(createdReviewDto);
            if (!product.reviews) {
                product.$set('reviews', review.id);
                product.reviews = [review];
            }
            else {
                product.$add('categories', review.id);
            }
            review.productId = product.id;
            review.$add('product', product.id);
            yield review.save();
            yield product.save();
            return review;
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield this.reviewRepository.findByPk(reviewId);
            const product = yield this.productService.findById(review.productId);
            product.$remove('reviews', review.id);
            yield product.save();
            const deleted = yield this.reviewRepository.destroy({
                where: {
                    id: review.id,
                    name: review.name,
                    surname: review.surname,
                    review: review.review,
                },
            });
            return deleted;
        });
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(review_model_1.Review)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ReviewsService);
exports.ReviewsService = ReviewsService;


/***/ }),
/* 191 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var LocationMiddleware_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocationMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const geoip_lite_1 = __importDefault(__webpack_require__(181));
const path_1 = __importDefault(__webpack_require__(73));
const geoip2_node_1 = __webpack_require__(184);
const currency_service_1 = __webpack_require__(63);
const currency_symbol_map_1 = __importDefault(__webpack_require__(67));
const country_to_currency_1 = __importDefault(__webpack_require__(66));
let LocationMiddleware = LocationMiddleware_1 = class LocationMiddleware {
    constructor(currencyService) {
        this.currencyService = currencyService;
        this.Logger = new common_1.Logger(LocationMiddleware_1.name);
    }
    use(req, res, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const reader = yield geoip2_node_1.Reader.open(path_1.default.join(__dirname, process.env.IP_ADDRESS_DB.trim()));
                const data = reader.country(req.ip);
                const geo = geoip_lite_1.default.lookup(req.ip);
                this.Logger.log(geo);
                req['countryIsoCode'] = data.country.isoCode;
                req['CLient-IP'] = data.traits.ipAddress;
                req['CLient-Network'] = data.traits.network;
                req['user-type'] = data.traits.userType;
                req['city'] = geo.city;
                req['geo'] = geo;
                res.setHeader('Client-IP-Address', `${data.traits.ipAddress}`);
                res.setHeader('Client-Network', `${data.traits.network}`);
                res.setHeader('Client-Location', `${data.country.isoCode}`);
                const currency = yield this.currencyService.getCurrentCurrency(data.country.isoCode);
                if (currency) {
                    req['currency'] = {
                        countryCode: data.country.isoCode,
                        currrencyCode: currency.currrencyCode,
                        symbol: currency.symbol,
                        rate: Number(currency.rate),
                    };
                    return next();
                }
                req['currency'] = {
                    countryCode: data.country.isoCode,
                    currencyCode: country_to_currency_1.default[data.country.isoCode],
                    symbol: (0, currency_symbol_map_1.default)(process.env.BASE_CURRENCY.toUpperCase().trim()),
                    rate: Number(1),
                };
                return next();
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        }))();
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], LocationMiddleware.prototype, "use", null);
LocationMiddleware = LocationMiddleware_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _a : Object])
], LocationMiddleware);
exports.LocationMiddleware = LocationMiddleware;


/***/ }),
/* 192 */
/***/ ((module) => {

"use strict";
module.exports = require("helmet");

/***/ }),
/* 193 */
/***/ ((module) => {

"use strict";
module.exports = require("compression");

/***/ }),
/* 194 */
/***/ ((module) => {

"use strict";
module.exports = require("cookie-parser");

/***/ }),
/* 195 */
/***/ ((module) => {

"use strict";
module.exports = require("serve-favicon");

/***/ }),
/* 196 */
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

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
/******/ 		__webpack_require__.h = () => ("71c448b0f32323248294")
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