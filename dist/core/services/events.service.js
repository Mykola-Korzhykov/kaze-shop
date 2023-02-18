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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppListener = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("@nestjs/common/interfaces");
const event_emitter_1 = require("@nestjs/event-emitter");
const jwt_refresh_token_deleted_evet_1 = require("../events/jwt-refresh-token-deleted.evet");
let AppListener = class AppListener {
    handleTokenDeletedEvent(event) {
        return event;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('refreshtoken.deleted'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jwt_refresh_token_deleted_evet_1.JwtRefreshTokenDeletedEvent]),
    __metadata("design:returntype", void 0)
], AppListener.prototype, "handleTokenDeletedEvent", null);
AppListener = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.DEFAULT })
], AppListener);
exports.AppListener = AppListener;
//# sourceMappingURL=events.service.js.map