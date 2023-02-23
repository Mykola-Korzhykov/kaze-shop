"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 148:
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
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ColoursController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const throttler_1 = __webpack_require__(79);
const roles_auth_decorator_1 = __webpack_require__(80);
const add_content_guard_1 = __webpack_require__(103);
const jw_refresh_guard_1 = __webpack_require__(83);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(82);
const roles_guard_1 = __webpack_require__(81);
const throttler_behind_proxy_guard_1 = __webpack_require__(78);
const error_handler_filter_1 = __webpack_require__(85);
const create_colour_dto_1 = __webpack_require__(149);
const colours_model_1 = __webpack_require__(45);
const api_exception_filter_1 = __webpack_require__(87);
const colours_service_1 = __webpack_require__(134);
let ColoursController = class ColoursController {
    constructor(coloursService) {
        this.coloursService = coloursService;
    }
    getcolours() {
        return this.coloursService.getColours();
    }
    createcolour(colourDto) {
        return this.coloursService.createColour(colourDto);
    }
    updatecolour(colourId, colourDto) {
        return this.coloursService.updateColour(colourId, colourDto);
    }
    deletecolour(colourId) {
        return this.coloursService.deleteColour(colourId);
    }
};
__decorate([
    (0, throttler_1.Throttle)(700, 7000),
    (0, common_1.CacheTTL)(200),
    (0, common_1.Get)('get_colours'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ColoursController.prototype, "getcolours", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating colours' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: colours_model_1.Colour }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Put)('create_colour'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_colour_dto_1.CreateColourDto !== "undefined" && create_colour_dto_1.CreateColourDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ColoursController.prototype, "createcolour", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, swagger_1.ApiOperation)({ summary: 'Creating colours' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: colours_model_1.Colour }),
    (0, common_1.HttpCode)(201),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Patch)('update_colour/:colourId'),
    __param(0, (0, common_1.Param)('colourId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_e = typeof create_colour_dto_1.CreateColourDto !== "undefined" && create_colour_dto_1.CreateColourDto) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ColoursController.prototype, "updatecolour", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.HttpCode)(200),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.Delete)('delete_colour/:colourId'),
    __param(0, (0, common_1.Param)('colourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ColoursController.prototype, "deletecolour", null);
ColoursController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('colours'),
    __metadata("design:paramtypes", [typeof (_a = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _a : Object])
], ColoursController);
exports.ColoursController = ColoursController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("38be865f57af83cc4d93")
/******/ })();
/******/ 
/******/ }
;