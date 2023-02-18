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
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const roles_auth_decorator_1 = require("../common/decorators/roles-auth.decorator");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const owner_admin_guard_1 = require("../common/guards/owner-admin.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const create_review_dto_1 = require("./create.review.dto");
const reviews_service_1 = require("./reviews.service");
const edit_content_guard_1 = require("../common/guards/edit-content.guard");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    createReview(createReviewDto, productId) {
        try {
            return this.reviewsService.createReview(createReviewDto, productId);
        }
        catch (error) {
            throw error;
        }
    }
    deleteReview(reviewId) {
        try {
            return this.reviewsService.deleteReview(reviewId);
        }
        catch (error) {
            throw error;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Put)('create_review'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto, Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_review'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Query)('reviewId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReviewsController.prototype, "deleteReview", null);
ReviewsController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map