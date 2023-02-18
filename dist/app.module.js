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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const admin_model_1 = require("./admin/models/admin.model");
const auth_module_1 = require("./auth/auth.module");
const cluster_service_1 = require("./core/services/cluster.service");
const throttler_1 = require("@nestjs/throttler");
const path_1 = __importDefault(require("path"));
const admin_refresh_token_model_1 = require("./admin/models/admin.refresh.token.model");
const mail_module_1 = require("./mail/mail.module");
const cors_middleware_1 = require("./core/middlewares/cors.middleware");
const core_1 = require("@nestjs/core");
const all_exceptions_filter_1 = require("./core/filters/all-exceptions.filter");
const global_interceptor_1 = require("./core/interceptors/global.interceptor");
const core_module_1 = require("./core/core.module");
const product_module_1 = require("./product/product.module");
const users_module_1 = require("./users/users.module");
const owner_module_1 = require("./owner/owner.module");
const orders_module_1 = require("./orders/orders.module");
const cart_module_1 = require("./cart/cart.module");
const owner_model_1 = require("./owner/models/owner.model");
const owner_refresh_token_model_1 = require("./owner/models/owner.refresh.token.model");
const user_model_1 = require("./users/models/user.model");
const user_refresh_token_model_1 = require("./users/models/user.refresh.token.model");
const roles_model_1 = require("./roles/models/roles.model");
const user_roles_model_1 = require("./roles/models/user.roles.model");
const app_controller_1 = require("./app.controller");
const telegram_module_1 = require("./telegram/telegram.module");
const telegram_config_1 = require("./telegram/telegram.config");
const categories_module_1 = require("./categories/categories.module");
const product_model_1 = require("./product/models/product.model");
const category_model_1 = require("./categories/models/category.model");
const product_categories_model_1 = require("./categories/models/product.categories.model");
const cart_product_model_1 = require("./cart/models/cart.product.model");
const cart_model_1 = require("./cart/models/cart.model");
const order_model_1 = require("./orders/models/order.model");
const order_product_model_1 = require("./orders/models/order.product.model");
const platform_express_1 = require("@nestjs/platform-express");
const bull_1 = require("@nestjs/bull");
const reviews_module_1 = require("./reviews/reviews.module");
const review_model_1 = require("./reviews/models/review.model");
const product_reviews_model_1 = require("./reviews/models/product.reviews.model");
const bookmark_products_1 = require("./product/models/bookmark.products");
const watched_products_model_1 = require("./product/models/watched.products.model");
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
                },
                settings: {
                    lockDuration: 30000,
                    lockRenewTime: 15000,
                    stalledInterval: 30000,
                    maxStalledCount: 1,
                    guardInterval: 5000,
                    retryProcessDelay: 5000,
                    drainDelay: 5,
                }
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
                }
            }),
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
            reviews_module_1.ReviewsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map