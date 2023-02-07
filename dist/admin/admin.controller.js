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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const admin_model_1 = require("./models/admin.model");
const admin_service_1 = require("./services/admin.service");
const validation_pipe_1 = require("../common/pipes/validation.pipe");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth.decorator");
const roles_guard_1 = require("../common/guards/roles.guard");
const owner_admin_guard_1 = require("../common/guards/owner-admin.guard");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const throttler_1 = require("@nestjs/throttler");
const pipes_1 = require("@nestjs/common/pipes");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    createAdmin(adminDto) {
        return this.adminService.createAdmin(adminDto);
    }
    updateAdmin(adminDto) {
        return this.adminService.updateAdmin(adminDto);
    }
    findAdmin(v, page, pageSize) {
        return this.adminService.findAdmin(v, page, pageSize);
    }
    getAllUsers(page, pageSize) {
        return this.adminService.getAllAdmins(page, pageSize);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Creating Admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)('create_admin'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Updating Admin' }),
    (0, swagger_1.ApiResponse)({ status: 202, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.Patch)('update_admin'),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidateDto())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting Admins' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: admin_model_1.Admin }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('find_admin'),
    __param(0, (0, common_1.Query)('v', pipes_1.ParseArrayPipe)),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Getting Admins' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [admin_model_1.Admin] }),
    (0, throttler_1.Throttle)(60, 700),
    (0, roles_auth_decorator_1.Roles)('OWNER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard),
    (0, common_1.Get)('get_admins'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map