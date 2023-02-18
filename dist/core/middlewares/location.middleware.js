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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const ip_1 = __importDefault(require("ip"));
const path_1 = __importDefault(require("path"));
const geoip2_node_1 = require("@maxmind/geoip2-node");
let LocationMiddleware = class LocationMiddleware {
    use(req, res, next) {
        (() => __awaiter(this, void 0, void 0, function* () {
            const ipAddress = ip_1.default.address();
            const reader = yield geoip2_node_1.Reader.open(path_1.default.join(__dirname, 'GeoLite2-Country.mmdb'));
            const data = reader.country(ipAddress);
            const geo = geoip_lite_1.default.lookup(ipAddress);
            console.log(geo, ipAddress);
            req['location'] = data.country.isoCode;
            res.setHeader('Location', `${req['location']}`);
            return next();
        }))();
    }
};
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], LocationMiddleware.prototype, "use", null);
LocationMiddleware = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST })
], LocationMiddleware);
exports.LocationMiddleware = LocationMiddleware;
//# sourceMappingURL=location.middleware.js.map