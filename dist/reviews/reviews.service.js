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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const product_service_1 = require("../product/product.service");
const review_model_1 = require("./models/review.model");
let ReviewsService = class ReviewsService {
    constructor(reviewRepository, productService) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.Logger = new common_1.Logger(product_service_1.ProductService.name);
    }
    createReview(createdReviewDto, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findById(productId);
            const review = yield this.reviewRepository.create(createdReviewDto);
            if (!product.reviews) {
                product.$set('reviews', review.id);
                product.reviews = [review];
            }
            else {
                product.$add('categories', review.id);
            }
            review.productId = product.id;
            review.$add('product', product.id);
            yield review.save();
            yield product.save();
            return review;
        });
    }
    deleteReview(reviewId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield this.reviewRepository.findByPk(reviewId);
            const product = yield this.productService.findById(review.productId);
            product.$remove('reviews', review.id);
            yield product.save();
            const deleted = yield this.reviewRepository.destroy({
                where: {
                    id: review.id,
                    name: review.name,
                    surname: review.surname,
                    review: review.review,
                }
            });
            return deleted;
        });
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(review_model_1.Review)),
    __metadata("design:paramtypes", [Object, product_service_1.ProductService])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map