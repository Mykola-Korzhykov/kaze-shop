"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 87:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(7);
const decorators_1 = __webpack_require__(88);
const auth_service_1 = __webpack_require__(13);
const login_dto_1 = __webpack_require__(89);
const reset_password_dto_1 = __webpack_require__(90);
const signup_dto_1 = __webpack_require__(17);
const swagger_1 = __webpack_require__(5);
const express_1 = __webpack_require__(20);
const jwt_auth_guard_1 = __webpack_require__(11);
const throttler_1 = __webpack_require__(77);
const throttler_behind_proxy_guard_1 = __webpack_require__(76);
const user_type_decorator_1 = __webpack_require__(91);
const user_agent_decorator_1 = __webpack_require__(92);
const validation_pipe_1 = __webpack_require__(74);
const refresh_guard_1 = __webpack_require__(93);
const auth_interfaces_1 = __webpack_require__(94);
const jw_refresh_guard_1 = __webpack_require__(81);
const change_password_dto_1 = __webpack_require__(72);
const user_id_decorator_1 = __webpack_require__(95);
const error_handler_filter_1 = __webpack_require__(83);
const api_exception_filter_1 = __webpack_require__(85);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
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
    __metadata("design:paramtypes", [typeof (_b = typeof signup_dto_1.SignupDto !== "undefined" && signup_dto_1.SignupDto) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _e : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_f = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _f : Object, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, typeof (_h = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _h : Object, typeof (_j = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _j : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object, typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _m : Object, String, String]),
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
    __metadata("design:paramtypes", [typeof (_o = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _o : Object, typeof (_p = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _p : Object, typeof (_q = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _q : Object, String]),
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
    __metadata("design:paramtypes", [typeof (_r = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _r : Object, String]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
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
    __metadata("design:paramtypes", [typeof (_t = typeof reset_password_dto_1.ResetDto !== "undefined" && reset_password_dto_1.ResetDto) === "function" ? _t : Object, typeof (_u = typeof auth_interfaces_1.CodeDto !== "undefined" && auth_interfaces_1.CodeDto) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
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
    __metadata("design:paramtypes", [typeof (_w = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _w : Object, typeof (_x = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _x : Object, typeof (_y = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _y : Object, typeof (_z = typeof change_password_dto_1.ChangeDto !== "undefined" && change_password_dto_1.ChangeDto) === "function" ? _z : Object, Number, String]),
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
    __metadata("design:paramtypes", [String, Number, typeof (_0 = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _0 : Object, typeof (_1 = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _1 : Object, typeof (_2 = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _2 : Object, String, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
AuthController = __decorate([
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, decorators_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, decorators_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e4e786b23c593d3fa801")
/******/ })();
/******/ 
/******/ }
;