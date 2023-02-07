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
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const admin_module_1 = require("../admin/admin.module");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("../common/filters/http-exception.filter");
const auth_middleware_1 = require("../common/middlewares/auth.middleware");
const throttler_1 = require("@nestjs/throttler");
const owner_module_1 = require("../owner/owner.module");
const jwt_refresh_service_1 = require("../admin/services/jwt-refresh.service");
const jwt_refresh_service_2 = require("../owner/services/jwt-refresh.service");
const users_module_1 = require("../users/users.module");
const initialize_user_middleware_1 = require("../common/middlewares/initialize-user.middleware");
const initialize_email_middleware_1 = require("../common/middlewares/initialize-email.middleware");
const activate_middleware_1 = require("../common/middlewares/activate.middleware");
const body_validator_pipe_1 = __importDefault(require("../common/pipes/body-validator.pipe"));
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const reset_password_dto_1 = require("./dto/reset.password.dto");
const change_password_dto_1 = require("./dto/change.password.dto");
const sequelize_1 = require("@nestjs/sequelize");
const admin_model_1 = require("../admin/models/admin.model");
const admin_refresh_token_model_1 = require("../admin/models/admin.refresh.token.model");
const owner_model_1 = require("../owner/models/owner.model");
const owner_refresh_token_model_1 = require("../owner/models/owner.refresh.token.model");
const roles_model_1 = require("../roles/models/roles.model");
const user_roles_model_1 = require("../roles/models/user.roles.model");
const user_model_1 = require("../users/models/user.model");
const user_refresh_token_model_1 = require("../users/models/user.refresh.token.model");
const config_1 = require("@nestjs/config");
const scedule_service_1 = require("../core/services/scedule.service");
const core_module_1 = require("../core/core.module");
const events_service_1 = require("../core/services/events.service");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'auth/signup', method: common_1.RequestMethod.POST }, { path: 'auth/refresh', method: common_1.RequestMethod.PATCH }, { path: 'auth/change', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(initialize_user_middleware_1.InitializeUserMiddleware)
            .forRoutes({ path: 'auth/logout', method: common_1.RequestMethod.POST }, { path: 'auth/refresh', method: common_1.RequestMethod.PATCH }, { path: 'auth/change', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(initialize_email_middleware_1.InitializeEmailMiddleware)
            .forRoutes({ path: 'auth/code', method: common_1.RequestMethod.POST }, { path: 'auth/reset', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(activate_middleware_1.ActivateMiddleware)
            .forRoutes({ path: 'auth/activate/:link', method: common_1.RequestMethod.GET });
        consumer
            .apply(body_validator_pipe_1.default.validate(login_dto_1.LoginDto))
            .forRoutes({ path: 'auth/login', method: common_1.RequestMethod.POST });
        consumer
            .apply(body_validator_pipe_1.default.validate(signup_dto_1.SignupDto))
            .forRoutes({ path: 'auth/signup', method: common_1.RequestMethod.PUT });
        consumer
            .apply(body_validator_pipe_1.default.validate(reset_password_dto_1.ResetDto))
            .forRoutes({ path: 'auth/reset', method: common_1.RequestMethod.PATCH });
        consumer
            .apply(body_validator_pipe_1.default.validate(change_password_dto_1.ChangeDto))
            .forRoutes({ path: 'auth/change', method: common_1.RequestMethod.PATCH });
    }
};
AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [
            events_service_1.AppListener,
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            jwt_refresh_service_1.AdminJwtRefreshService,
            jwt_refresh_service_2.OwnerJwtRefreshService,
            mail_service_1.MailService,
            scedule_service_1.TasksService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
        controllers: [auth_controller_1.AuthController],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`,
                expandVariables: true,
                isGlobal: true,
            }),
            sequelize_1.SequelizeModule.forFeature([
                user_model_1.User,
                user_refresh_token_model_1.UserRefreshToken,
                admin_model_1.Admin,
                admin_refresh_token_model_1.AdminRefreshToken,
                owner_model_1.Owner,
                roles_model_1.Role,
                user_roles_model_1.UserRoles,
                owner_refresh_token_model_1.OwnerRefreshToken,
            ]),
            (0, common_1.forwardRef)(() => core_module_1.CoreModule),
            (0, common_1.forwardRef)(() => admin_module_1.AdminModule),
            (0, common_1.forwardRef)(() => owner_module_1.OwnerModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET.toString().trim() ||
                    'knfdljhtop6hohjlymhnhgnljjukfty6yujhjbjlvcglki',
                signOptions: {
                    expiresIn: 3600000,
                },
            }),
        ],
        exports: [
            auth_service_1.AuthService,
            jwt_1.JwtModule,
            jwt_refresh_service_1.AdminJwtRefreshService,
            jwt_refresh_service_2.OwnerJwtRefreshService,
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map