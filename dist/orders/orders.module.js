"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_controller_1 = require("./orders.controller");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const users_module_1 = require("../users/users.module");
const categories_module_1 = require("../categories/categories.module");
const config_1 = require("@nestjs/config");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const cart_module_1 = require("../cart/cart.module");
const cart_item_model_1 = require("../cart/models/cart-item.model");
const cart_model_1 = require("../cart/models/cart.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./models/order.model");
const order_product_model_1 = require("./models/order.product.model");
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
//# sourceMappingURL=orders.module.js.map