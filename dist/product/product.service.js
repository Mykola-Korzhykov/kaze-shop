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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const sequelize_1 = require("@nestjs/sequelize");
const categories_service_1 = require("../categories/categories.service");
const owner_service_1 = require("../owner/services/owner.service");
const product_model_1 = require("./product.model");
let ProductService = class ProductService {
    constructor(productRepository, ownerService, categoriesService) {
        this.productRepository = productRepository;
        this.ownerService = ownerService;
        this.categoriesService = categoriesService;
    }
    createProduct(createProductDto, userId, type, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!type) {
                throw new exceptions_1.UnauthorizedException('User is not authorized to create product!');
            }
            const imagesPaths = images.map((image) => {
                return image.path.split('\\')
                    .slice(image.path.split('\\')
                    .indexOf('static')).join('/');
            });
            const sizeChartImagePath = sizeChartImage[0].path
                .split('\\').slice(sizeChartImage[0]
                .path.split('\\').indexOf('static')).join('/');
            const productDto = Object.assign(Object.assign({}, createProductDto), { colours: new Array(JSON.parse(createProductDto.colours)), sizes: new Array(JSON.parse(createProductDto.sizes)), categories: new Array(JSON.parse(createProductDto.categories)) });
            const product = yield this.productRepository.create(Object.assign(Object.assign({}, productDto), { images: imagesPaths, sizeChartImage: sizeChartImagePath }));
            return product;
        });
    }
    updateProduct(updateProductDto, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const imagesPaths = images.map((image) => {
                return image.path.split('\\')
                    .slice(image.path.split('\\')
                    .indexOf('static')).join('/');
            });
            const sizeChartImagePath = sizeChartImage[0].path
                .split('\\').slice(sizeChartImage[0].path
                .split('\\').indexOf('static')).join('/');
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, owner_service_1.OwnerService,
        categories_service_1.CategoriesService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map