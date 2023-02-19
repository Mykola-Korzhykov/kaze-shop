"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 151:
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CorsMiddleware_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsMiddleware = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const ip_1 = __importDefault(__webpack_require__(152));
let CorsMiddleware = CorsMiddleware_1 = class CorsMiddleware {
    constructor() {
        this.Logger = new common_1.Logger(CorsMiddleware_1.name);
    }
    use(req, res, next) {
        const headers = JSON.parse(JSON.stringify(req.headers));
        const isEmpty = this.isEmpty(headers);
        const ipAddress = ip_1.default.address();
        this.Logger.log(ipAddress);
        this.Logger.log();
        if (isEmpty) {
            throw new common_1.BadRequestException({
                message: 'No request headers were provided!',
            });
        }
        res.setHeader('Access-Control-Allow-Origin', `${process.env.CLIENT_URL.toString().trim()}`);
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.setHeader('Content-Security-Policy', 'default-src \'self\'; font-src \'self\'; img-src \'self\'; script-src \'self\'; style-src \'self\'; frame-src \'self\'');
        if (req.method === 'OPTIONS') {
            return res.status(204).end();
        }
        return next();
    }
    isEmpty(object) {
        for (const prop in object) {
            if (Object.prototype.hasOwnProperty.call(object, prop)) {
                return false;
            }
        }
        return JSON.stringify(object) === JSON.stringify({});
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CorsMiddleware.prototype, "use", null);
CorsMiddleware = CorsMiddleware_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], CorsMiddleware);
exports.CorsMiddleware = CorsMiddleware;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e18ed7b55d28fc70ec4e")
/******/ })();
/******/ 
/******/ }
;