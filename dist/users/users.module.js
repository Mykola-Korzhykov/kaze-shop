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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./services/users.service");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const roles_module_1 = require("../roles/roles.module");
const auth_module_1 = require("../auth/auth.module");
const user_refresh_token_model_1 = require("./models/user.refresh.token.model");
const jwt_1 = require("@nestjs/jwt");
const jwt_refresh_service_1 = require("./services/jwt-refresh.service");
const user_middleware_1 = require("../common/middlewares/user.middleware");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const admin_model_1 = require("../admin/models/admin.model");
const admin_module_1 = require("../admin/admin.module");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const owner_module_1 = require("../owner/owner.module");
const body_validator_pipe_1 = __importDefault(require("../common/pipes/body-validator.pipe"));
const update_user_dto_1 = require("./dto/update-user.dto");
const config_1 = require("@nestjs/config");
const scedule_service_1 = require("../core/services/scedule.service");
const core_module_1 = require("../core/core.module");
const product_module_1 = require("../product/product.module");
const cart_item_model_1 = require("../cart/models/cart-item.model");
const cart_model_1 = require("../cart/models/cart.model");
const category_model_1 = require("../categories/models/category.model");
const product_categories_model_1 = require("../categories/models/product.categories.model");
const order_model_1 = require("../orders/models/order.model");
const order_product_model_1 = require("../orders/models/order.product.model");
const product_model_1 = require("../product/product.model");
const auth_service_1 = require("../auth/auth.service");
const mail_module_1 = require("../mail/mail.module");
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
            jwt_1.JwtModule.register({
                secret: process.env.JWT_REFRESH_USER_SECRET.toString().trim() ||
                    'knfdgfhRRljhtop6hfdghshfdshfohjlymhnhgnljjukfty6yujhjbjlvcglkidrtujhtrfujuj',
                signOptions: {
                    expiresIn: 604800000,
                },
            }),
            (0, common_1.forwardRef)(() => mail_module_1.MailModule),
            (0, common_1.forwardRef)(() => product_module_1.ProductModule),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => roles_module_1.RolesModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => UsersModule_1),
        ],
        providers: [
            users_service_1.UsersService,
            jwt_refresh_service_1.UserJwtRefreshTokenService,
            scedule_service_1.TasksService,
            auth_service_1.AuthService,
        ],
        exports: [users_service_1.UsersService, jwt_refresh_service_1.UserJwtRefreshTokenService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map