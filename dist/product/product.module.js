"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const sequelize_1 = require("@nestjs/sequelize");
const admin_module_1 = require("../admin/admin.module");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const auth_module_1 = require("../auth/auth.module");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const owner_module_1 = require("../owner/owner.module");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const users_module_1 = require("../users/users.module");
const config_1 = require("@nestjs/config");
const product_model_1 = require("./models/product.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const categories_module_1 = require("../categories/categories.module");
const cart_module_1 = require("../cart/cart.module");
const cart_product_model_1 = require("../cart/models/cart.product.model");
const cart_model_1 = require("../cart/models/cart.model");
const order_model_1 = require("../orders/models/order.model");
const order_product_model_1 = require("../orders/models/order.product.model");
const orders_module_1 = require("../orders/orders.module");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
const categories_service_1 = require("../categories/categories.service");
const file_service_1 = require("../core/services/file.service");
const product_middleware_1 = require("../common/middlewares/product.middleware");
const product_reviews_model_1 = require("../reviews/models/product.reviews.model");
const bookmark_products_1 = require("./models/bookmark.products");
const watched_products_model_1 = require("./models/watched.products.model");
const user_middleware_1 = require("../common/middlewares/user.middleware");
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
        providers: [product_service_1.ProductService, categories_service_1.CategoriesService, file_service_1.FilesService],
        controllers: [product_controller_1.ProductController],
        imports: [
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
                bookmark_products_1.BookmarksProducts,
                watched_products_model_1.WatchedProducts,
                user_roles_model_1.UserRoles,
                cart_model_1.Cart,
                cart_product_model_1.CartProduct,
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
//# sourceMappingURL=product.module.js.map