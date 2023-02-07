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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const user_model_1 = require("./models/user.model");
const users_service_1 = require("./services/users.service");
const roles_guard_1 = require("../common/guards/roles.guard");
const ban_user_dto_1 = require("./dto/ban-user.dto");
const throttler_1 = require("@nestjs/throttler");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const auth_service_1 = require("../auth/auth.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_agent_decorator_1 = require("../common/decorators/user-agent.decorator");
const user_id_decorator_1 = require("../common/decorators/user.id.decorator");
const user_guard_1 = require("../common/guards/user.guard");
const owner_admin_guard_1 = require("../common/guards/owner-admin.guard");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
let UsersController = class UsersController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    getAllUsers(page, pageSize) {
        return this.userService.getAllUsers(page, pageSize);
    }
    findUser(v, page, pageSize) {
        return this.userService.findUser(v, page, pageSize);
    }
    banUser(dto) {
        return this.userService.banUser(dto);
    }
    update(response, request, next, userId, userDto, userAgent) {
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.userService.updateUser(userDto, userId);
            return this.authService.refresh(response, request, next, null, userAgent);
        }))();
    }
};
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, swagger_1.ApiOperation)({ summary: 'Getting Users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_model_1.User] }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('/get_users'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, throttler_1.Throttle)(60, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Getting User' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('/find_users'),
    __param(0, (0, common_1.Query)('v', common_1.ParseArrayPipe)),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, swagger_1.ApiOperation)({ summary: 'Ban a user' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Post)('/ban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ban_user_dto_1.BanUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "banUser", null);
__decorate([
    (0, throttler_1.Throttle)(40, 400),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(4, (0, common_1.Body)()),
    __param(5, (0, user_agent_decorator_1.UserAgent)('USER-AGENT')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function, Number, update_user_dto_1.UpdateUserDto, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
UsersController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map