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
var GarbageCollectingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GarbageCollectingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let GarbageCollectingProcessor = GarbageCollectingProcessor_1 = class GarbageCollectingProcessor {
    constructor() {
        this.logger = new common_1.Logger(GarbageCollectingProcessor_1.name);
    }
    handleTranscode(job) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
    }
};
__decorate([
    (0, bull_1.Process)('transcode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GarbageCollectingProcessor.prototype, "handleTranscode", null);
GarbageCollectingProcessor = GarbageCollectingProcessor_1 = __decorate([
    (0, bull_1.Processor)('garbageCollecting')
], GarbageCollectingProcessor);
exports.GarbageCollectingProcessor = GarbageCollectingProcessor;
//# sourceMappingURL=garbage.processor.js.map