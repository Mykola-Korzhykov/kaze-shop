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
const serve_static_1 = require("@nestjs/serve-static");
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
const product_model_1 = require("./product/product.model");
const category_model_1 = require("./categories/models/category.model");
const product_categories_model_1 = require("./categories/models/product.categories.model");
const cart_item_model_1 = require("./cart/models/cart-item.model");
const cart_model_1 = require("./cart/models/cart.model");
const order_model_1 = require("./orders/models/order.model");
const order_product_model_1 = require("./orders/models/order.product.model");
const platform_express_1 = require("@nestjs/platform-express");
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
//# sourceMappingURL=app.module.js.map