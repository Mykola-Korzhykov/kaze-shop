"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 173:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AppController_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(7);
const swagger_1 = __webpack_require__(5);
const path_1 = __importDefault(__webpack_require__(73));
const geoip2_node_1 = __webpack_require__(174);
const rxjs_1 = __webpack_require__(65);
const express_1 = __webpack_require__(20);
const axios_1 = __webpack_require__(64);
const decorators_1 = __webpack_require__(93);
const throttler_behind_proxy_guard_1 = __webpack_require__(81);
const throttler_1 = __webpack_require__(82);
let AppController = AppController_1 = class AppController {
    constructor(httpService) {
        this.httpService = httpService;
        this.Logger = new common_1.Logger(AppController_1.name);
    }
    getLocation(request, response, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const ipAddress = request.headers['x-forwarded-for'];
                this.Logger.log(ipAddress);
                const reader = yield geoip2_node_1.Reader.open(path_1.default.join(__dirname, 'GeoLite2-Country.mmdb'));
                const geoCountry = reader.country('62.122.202.29');
                return response.json({
                    geoLocation: Object.assign({ currency: request['currency'], city: request['city'] }, geoCountry),
                });
            }
            catch (err) {
                this.Logger.error(err);
                next(err);
            }
        }))();
    }
    getCurrency(base) {
        try {
            return this.getCurrencies(base);
        }
        catch (err) {
            this.Logger.error(err);
            throw err;
        }
    }
    sse() {
        return (0, rxjs_1.timeout)(1000).apply((0, rxjs_1.map)((_) => ({ data: { hello: 'world' } })));
    }
    getCurrencies(base) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`${process.env.API_CURRENCIES.trim()}/${!base
                ? process.env.BASE_CURRENCY.toLowerCase().trim()
                : base.toLowerCase().trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } })
                .pipe((0, rxjs_1.map)((res) => res.data))
                .pipe((0, rxjs_1.catchError)((error) => {
                this.Logger.error(error.response.data);
                throw error;
            })));
            return data;
        });
    }
};
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Get)('get-location'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLocation", null);
__decorate([
    (0, throttler_1.Throttle)(20, 500),
    (0, common_1.Get)('get-currencies'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, decorators_1.Query)('base')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCurrency", null);
__decorate([
    (0, common_1.Sse)('sse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_e = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _e : Object)
], AppController.prototype, "sse", null);
AppController = AppController_1 = __decorate([
    (0, swagger_1.ApiTags)('/'),
    (0, decorators_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("37164e94a2900e507fc8")
/******/ })();
/******/ 
/******/ }
;