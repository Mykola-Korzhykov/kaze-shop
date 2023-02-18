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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth.decorator");
const add_content_guard_1 = require("../common/guards/add-content.guard");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const owner_admin_guard_1 = require("../common/guards/owner-admin.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const create_role_dto_1 = require("./dto/create.role.dto");
const roles_model_1 = require("./models/roles.model");
const roles_service_1 = require("./roles.service");
const throttler_1 = require("@nestjs/throttler");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
let RolesController = class RolesController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    createRole(roleDto) {
        try {
            return this.roleService.createRole(roleDto);
        }
        catch (error) {
            throw error;
        }
    }
    getRoleByValue(value) {
        try {
            return this.roleService.getRoleByValue(value);
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating Roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: roles_model_1.Role }),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Put)('/create_role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_dto_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "createRole", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Getting Roles' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: roles_model_1.Role }),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Get)('get/:value'),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRoleByValue", null);
RolesController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, swagger_1.ApiTags)('roles'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Controller)('/roles'),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesController);
exports.RolesController = RolesController;
//# sourceMappingURL=roles.controller.js.map