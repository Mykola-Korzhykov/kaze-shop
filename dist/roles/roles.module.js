"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RolesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModule = void 0;
const common_1 = require("@nestjs/common");
const roles_controller_1 = require("./roles.controller");
const roles_service_1 = require("./roles.service");
const sequelize_1 = require("@nestjs/sequelize");
const roles_model_1 = require("./models/roles.model");
const user_model_1 = require("../users/models/user.model");
const user_roles_model_1 = require("./models/user.roles.model");
const config_1 = require("@nestjs/config");
const order_product_model_1 = require("../orders/models/order.product.model");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const cart_product_model_1 = require("../cart/models/cart.product.model");
const cart_model_1 = require("../cart/models/cart.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const order_model_1 = require("../orders/models/order.model");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const product_model_1 = require("../product/models/product.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const auth_service_1 = require("../auth/auth.service");
const admin_module_1 = require("../admin/admin.module");
const auth_module_1 = require("../auth/auth.module");
const core_module_1 = require("../core/core.module");
const mail_module_1 = require("../mail/mail.module");
const owner_module_1 = require("../owner/owner.module");
const product_module_1 = require("../product/product.module");
const users_service_1 = require("../users/services/users.service");
const scedule_service_1 = require("../core/services/scedule.service");
const jwt_refresh_service_1 = require("../users/services/jwt-refresh.service");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
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
                cart_product_model_1.CartProduct,
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
//# sourceMappingURL=roles.module.js.map