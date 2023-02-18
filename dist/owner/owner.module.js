"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OwnerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerModule = void 0;
const common_1 = require("@nestjs/common");
const owner_service_1 = require("./services/owner.service");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const auth_module_1 = require("../auth/auth.module");
const owner_model_1 = require("./models/owner.model");
const owner_refresh_token_model_1 = require("./models/owner.refresh.token.model");
const jwt_refresh_service_1 = require("./services/jwt-refresh.service");
const admin_module_1 = require("../admin/admin.module");
const mail_service_1 = require("../mail/mail.service");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const config_1 = require("@nestjs/config");
const core_module_1 = require("../core/core.module");
const scedule_service_1 = require("../core/services/scedule.service");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const cart_product_model_1 = require("../cart/models/cart.product.model");
const cart_model_1 = require("../cart/models/cart.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const order_model_1 = require("../orders/models/order.model");
const order_product_model_1 = require("../orders/models/order.product.model");
const product_model_1 = require("../product/models/product.model");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const users_service_1 = require("../users/services/users.service");
const admin_service_1 = require("../admin/services/admin.service");
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
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
        ],
        providers: [owner_service_1.OwnerService, jwt_refresh_service_1.OwnerJwtRefreshService, mail_service_1.MailService, scedule_service_1.TasksService, users_service_1.UsersService, admin_service_1.AdminService],
        exports: [owner_service_1.OwnerService, jwt_refresh_service_1.OwnerJwtRefreshService],
    })
], OwnerModule);
exports.OwnerModule = OwnerModule;
//# sourceMappingURL=owner.module.js.map