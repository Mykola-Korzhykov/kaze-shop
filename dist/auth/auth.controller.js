"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const reset_password_dto_1 = require("./dto/reset.password.dto");
const signup_dto_1 = require("./dto/signup.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const throttler_1 = require("@nestjs/throttler");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const user_type_decorator_1 = require("../common/decorators/user-type.decorator");
const user_agent_decorator_1 = require("../common/decorators/user-agent.decorator");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const refresh_guard_1 = require("../common/guards/refresh.guard");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const change_password_dto_1 = require("./dto/change.password.dto");
const user_id_decorator_1 = require("../common/decorators/user.id.decorator");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const events_service_1 = require("../core/services/events.service");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
let AuthController = class AuthController {
    constructor(authService, appListener) {
        this.authService = authService;
        this.appListener = appListener;
    }
    signup(userDto, response, request, next, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.signup(userDto, response, request, next, userAgent);
        }))();
    }
    login(userDto, response, request, next, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.login(userDto, response, request, next, userAgent);
        }))();
    }
    refresh(response, request, next, type, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.refresh(response, request, next, type, userAgent);
        }))();
    }
    logout(response, request, next, type) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.logout(response, request, next, type);
        }))();
    }
    fetchRenewalCode(codeDto, locale) {
        try {
            return this.authService.setCode(codeDto, locale);
        }
        catch (error) {
            throw error;
        }
    }
    resetPassword(resetDto, codeDto) {
        try {
            return this.authService.resetPassword(resetDto, codeDto);
        }
        catch (error) {
            throw error;
        }
    }
    changePassword(response, request, next, changeDto, userId, type) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.changePassword(response, request, next, changeDto, userId, type);
        }))();
    }
    activate(activationLink, code, request, response, next, type, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.authService.activate(request, response, next, activationLink, code, type, userAgent);
        }))();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Signing up users' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, throttler_1.Throttle)(50, 600),
    (0, common_1.Post)('signup'),
    (0, decorators_1.HttpCode)(201),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object, Object, Function, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Logging in users' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, decorators_1.UseFilters)(api_exception_filter_1.ApiExceptionFilter),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Next)()),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object, Function, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Refreshing users' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.UseGuards)(refresh_guard_1.RefreshAuthGuard),
    (0, decorators_1.HttpCode)(202),
    (0, decorators_1.Patch)('refresh'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __param(4, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Loggigng out users' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, decorators_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, decorators_1.HttpCode)(202),
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting code' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(40, 400),
    (0, common_1.Post)('code'),
    (0, decorators_1.HttpCode)(202),
    __param(0, (0, user_type_decorator_1.Type)('CODEDTO')),
    __param(1, (0, decorators_1.Query)('locale')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "fetchRenewalCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Resetting password' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, throttler_1.Throttle)(45, 450),
    (0, decorators_1.Patch)('reset'),
    (0, decorators_1.HttpCode)(201),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __param(1, (0, user_type_decorator_1.Type)('CODEDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Changing password' }),
    (0, swagger_1.ApiResponse)({ status: 202 }),
    (0, throttler_1.Throttle)(70, 700),
    (0, decorators_1.Patch)('change'),
    (0, decorators_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, decorators_1.HttpCode)(202),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(5, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, change_password_dto_1.ChangeDto, Number, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Activating users' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    (0, throttler_1.Throttle)(70, 700),
    (0, decorators_1.Get)('activate/:link'),
    (0, decorators_1.HttpCode)(204),
    __param(0, (0, decorators_1.Param)('link')),
    __param(1, (0, decorators_1.Query)('code', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __param(4, (0, common_1.Next)()),
    __param(5, (0, user_type_decorator_1.Type)('ACTIVATE')),
    __param(6, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object, Object, Function, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
AuthController = __decorate([
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, decorators_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, decorators_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        events_service_1.AppListener])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map