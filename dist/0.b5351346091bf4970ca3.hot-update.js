"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 60:
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
var CurrencyService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrencyService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const owner_model_1 = __webpack_require__(31);
const currencies_model_1 = __webpack_require__(46);
const axios_1 = __webpack_require__(61);
const rxjs_1 = __webpack_require__(62);
const schedule_1 = __webpack_require__(59);
let CurrencyService = CurrencyService_1 = class CurrencyService {
    constructor(currenciesRepository, ownerRepository, httpService) {
        this.currenciesRepository = currenciesRepository;
        this.ownerRepository = ownerRepository;
        this.httpService = httpService;
        this.Logger = new common_1.Logger(CurrencyService_1.name);
    }
    setCurrencies(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield currencies_model_1.Currencies.findAll();
            if (currencies.length > 0) {
                console.log(currencies);
                return false;
            }
            let data;
            try {
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`, {
                    headers: {
                        'apikey': process.env.CURRENCIES_API_KEY.trim(),
                        'Accept-Encoding': 'gzip,deflate,compress',
                    },
                }).pipe((0, rxjs_1.map)(res => res.data)).pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                const currency = yield currencies_model_1.Currencies.create({
                    base: data.data.base,
                    date: data.data.date,
                    rates: JSON.stringify(data.data.rates),
                });
                currency.setOwnerId(ownerId);
                const owner = yield owner_model_1.Owner.findByPk(ownerId);
                currency.setAuthor(owner);
                yield currency.save();
            }
            catch (error) {
                this.Logger.error(error);
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }).pipe((0, rxjs_1.map)(res => res.data)).pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                const currency = yield currencies_model_1.Currencies.create({
                    base: Object.keys(data.data)[1].toUpperCase().trim(),
                    date: data.data.date,
                    rates: JSON.stringify(data.data[process.env.BASE_CURRENCY.toLowerCase().trim()]),
                });
                currency.setOwnerId(ownerId);
                const owner = yield owner_model_1.Owner.findByPk(ownerId);
                currency.setAuthor(owner);
                yield currency.save();
            }
        });
    }
    renewCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield this.currenciesRepository.findAll({
                include: { all: true },
            });
            const currency = currencies[0];
            let data;
            try {
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.CURRENCIES_URL.trim()}/latest?base=${process.env.BASE_CURRENCY.trim()}`, {
                    headers: {
                        'apikey': process.env.CURRENCIES_API_KEY.trim(),
                        'Accept-Encoding': 'gzip,deflate,compress',
                    },
                }).pipe((0, rxjs_1.map)(res => res.data)).pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                currency.base = data.data.base;
                currency.date = data.data.date;
                currency.rates = JSON.stringify(data.data.rates);
                yield currency.save();
            }
            catch (error) {
                this.Logger.error(error);
                data = yield (0, rxjs_1.firstValueFrom)(this.httpService.get(`${process.env.API_CURRENCIES.trim()}/${process.env.BASE_CURRENCY.trim()}.json`, { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } }).pipe((0, rxjs_1.map)(res => res.data)).pipe((0, rxjs_1.catchError)((error) => {
                    this.Logger.error(error.response.data);
                    throw error;
                })));
                currency.base = Object.keys(data.data)[1].toUpperCase().trim();
                currency.date = data.data.date;
                currency.rates = JSON.stringify(data.data[process.env.BASE_CURRENCY.toLowerCase().trim()]);
                yield currency.save();
                return currency;
            }
        });
    }
    getCurrencyIndex(currrencyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const currencies = yield this.currenciesRepository.findAll({});
            if (currencies.length === 0) {
                return null;
            }
            const currency = currencies[0];
            const availableCurrencies = JSON.parse(currency.rates);
            console.log(availableCurrencies['UAH'], availableCurrencies);
            if (currrencyCode.toLowerCase() in availableCurrencies) {
                return availableCurrencies[currrencyCode.toLowerCase()];
            }
            if (currrencyCode in availableCurrencies) {
                return availableCurrencies[currrencyCode];
            }
            return false;
        });
    }
    renewCurrenciesCron() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.renewCurrencies();
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CurrencyService.prototype, "renewCurrenciesCron", null);
CurrencyService = CurrencyService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(currencies_model_1.Currencies)),
    __param(1, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, Object, typeof (_a = typeof axios_1.HttpService !== "undefined" && axios_1.HttpService) === "function" ? _a : Object])
], CurrencyService);
exports.CurrencyService = CurrencyService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c3d9574a316bbbcf42d3")
/******/ })();
/******/ 
/******/ }
;