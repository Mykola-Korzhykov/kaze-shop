"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 169:
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
var LocationMiddleware_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocationMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const geoip_lite_1 = __importDefault(__webpack_require__(170));
const ip_1 = __importDefault(__webpack_require__(155));
const path_1 = __importDefault(__webpack_require__(113));
const geoip2_node_1 = __webpack_require__(157);
const country_to_currency_1 = __importDefault(__webpack_require__(158));
const currency_service_1 = __webpack_require__(60);
let LocationMiddleware = LocationMiddleware_1 = class LocationMiddleware {
    constructor(currencyService) {
        this.currencyService = currencyService;
        this.Logger = new common_1.Logger(LocationMiddleware_1.name);
    }
    use(req, res, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                const ipAddress = ip_1.default.address();
                const reader = yield geoip2_node_1.Reader.open(path_1.default.join(__dirname, 'GeoLite2-Country.mmdb'));
                const data = reader.country('62.122.202.29');
                const geo = geoip_lite_1.default.lookup(req.headers['x-forwarded-for'][0]);
                console.log(geo, ipAddress);
                req['countryIsoCode'] = data.country.isoCode;
                req['CLient-IP'] = data.traits.ipAddress;
                req['CLient-Network'] = data.traits.network;
                req['user-type'] = data.traits.userType;
                res.setHeader('Client-IP-Address', `${data.traits.ipAddress}`);
                res.setHeader('Client-Network', `${data.traits.network}`);
                res.setHeader('Client-Location', `${data.country.isoCode}`);
                res.setHeader('Client-userType', `${data.traits.userType}`);
                const currency = yield this.currencyService.getCurrencyIndex(country_to_currency_1.default[data.country.isoCode]);
                if (currency) {
                    req['currencyRate'] = currency;
                    return next();
                }
                req['currencyRate'] = 1;
                return next();
            }
            catch (err) {
                console.log(err);
                this.Logger.error(err);
                return next(err);
            }
        }))();
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], LocationMiddleware.prototype, "use", null);
LocationMiddleware = LocationMiddleware_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __metadata("design:paramtypes", [typeof (_a = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _a : Object])
], LocationMiddleware);
exports.LocationMiddleware = LocationMiddleware;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("a088ec31e7083c7010a9")
/******/ })();
/******/ 
/******/ }
;