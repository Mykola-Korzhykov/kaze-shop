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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./services/admin.service");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("./models/admin.model");
const auth_module_1 = require("../auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const admin_refresh_token_model_1 = require("./models/admin.refresh.token.model");
const jwt_refresh_service_1 = require("./services/jwt-refresh.service");
const owner_module_1 = require("../owner/owner.module");
const mail_service_1 = require("../mail/mail.service");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
const owner_service_1 = require("../owner/services/owner.service");
const owner_model_1 = require("../owner/models/owner.model");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const users_module_1 = require("../users/users.module");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const user_admin_middleware_1 = require("../common/middlewares/user-admin.middleware");
const body_validator_pipe_1 = __importDefault(require("../common/pipes/body-validator.pipe"));
const create_admin_dto_1 = require("./dto/create-admin.dto");
const config_1 = require("@nestjs/config");
const admin_user_middleware_1 = require("../common/middlewares/admin-user.middleware");
const core_module_1 = require("../core/core.module");
const scedule_service_1 = require("../core/services/scedule.service");
const cart_product_model_1 = require("../cart/models/cart.product.model");
const cart_model_1 = require("../cart/models/cart.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const order_model_1 = require("../orders/models/order.model");
const order_product_model_1 = require("../orders/models/order.product.model");
const product_model_1 = require("../product/models/product.model");
const users_service_1 = require("../users/services/users.service");
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
            users_service_1.UsersService,
        ],
        exports: [admin_service_1.AdminService, jwt_refresh_service_1.AdminJwtRefreshService],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map