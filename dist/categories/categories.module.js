"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_controller_1 = require("./categories.controller");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const admin_module_1 = require("../admin/admin.module");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const auth_module_1 = require("../auth/auth.module");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const owner_module_1 = require("../owner/owner.module");
const product_model_1 = require("../product/product.model");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const users_module_1 = require("../users/users.module");
const category_model_1 = require("./models/category.model");
const product_categories_model_1 = require("./models/product.categories.model");
const product_module_1 = require("../product/product.module");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
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
//# sourceMappingURL=categories.module.js.map