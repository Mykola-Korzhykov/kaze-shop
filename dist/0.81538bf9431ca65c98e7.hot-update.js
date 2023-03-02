"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 6:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const user_model_1 = __webpack_require__(37);
const user_refresh_token_model_1 = __webpack_require__(39);
const roles_model_1 = __webpack_require__(26);
const user_roles_model_1 = __webpack_require__(30);
const app_controller_1 = __webpack_require__(178);
const telegram_module_1 = __webpack_require__(180);
const telegram_config_1 = __webpack_require__(181);
const categories_colours_module_1 = __webpack_require__(147);
const product_model_1 = __webpack_require__(32);
const category_model_1 = __webpack_require__(43);
const product_categories_model_1 = __webpack_require__(44);
const cart_product_model_1 = __webpack_require__(33);
const cart_model_1 = __webpack_require__(38);
const order_model_1 = __webpack_require__(36);
const order_product_model_1 = __webpack_require__(35);
const platform_express_1 = __webpack_require__(138);
const bull_1 = __webpack_require__(166);
const reviews_module_1 = __webpack_require__(182);
const review_model_1 = __webpack_require__(45);
const product_reviews_model_1 = __webpack_require__(46);
const bookmark_products_1 = __webpack_require__(40);
const watched_products_model_1 = __webpack_require__(41);
const currencies_model_1 = __webpack_require__(48);
const axios_1 = __webpack_require__(64);
const scedule_service_1 = __webpack_require__(69);
const colours_model_1 = __webpack_require__(34);
const product_colour_model_1 = __webpack_require__(42);
const file_service_1 = __webpack_require__(116);
let AppModule = class AppModule {
    configure(consumer) {
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


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d81182596a86b18d5651")
/******/ })();
/******/ 
/******/ }
;