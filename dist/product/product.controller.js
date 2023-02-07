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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_behind_proxy_guard_1 = require("../common/guards/throttler-behind-proxy.guard");
const error_handler_filter_1 = require("../common/filters/error-handler.filter");
const create_product_dto_1 = require("./dto/create.product.dto");
const throttler_1 = require("@nestjs/throttler");
const product_service_1 = require("./product.service");
const multer_1 = require("multer");
const file_upload_config_1 = require("./file-upload.config");
const update_product_dto_1 = require("./dto/update.product.dto");
const user_type_decorator_1 = require("../common/decorators/user-type.decorator");
const user_id_decorator_1 = require("../common/decorators/user.id.decorator");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    createProduct(createProductDto, files, userId, type) {
        try {
            return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
        }
        catch (error) {
            throw error;
        }
    }
    updateProduct(updateProductDto, files) {
        try {
            return this.productService.updateProduct(updateProductDto, files.images, files.sizeChartImage);
        }
        catch (err) {
            throw err;
        }
    }
    deleteProduct(productId) {
        try {
            return this.productService.deleteProduct(productId);
        }
        catch (err) {
            throw err;
        }
    }
    deleteFile(filePath) {
        try {
        }
        catch (err) {
            throw err;
        }
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Post)('create_product'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: file_upload_config_1.destination,
            filename: file_upload_config_1.fileName,
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Number, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Patch)('update_product'),
    (0, common_1.HttpCode)(202),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: file_upload_config_1.fileFilter,
        storage: (0, multer_1.diskStorage)({
            destination: file_upload_config_1.destination,
            filename: file_upload_config_1.fileName,
        })
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            new common_1.FileTypeValidator({ fileType: /\.(jpg|jpeg|png|gif)$/ }),
        ],
    }), new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: /\.(jpg|jpeg|png|gif)$/,
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 4,
    })
        .build({
        errorHttpStatusCode: common_1.HttpStatus.UNPROCESSABLE_ENTITY,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_product/:productId'),
    (0, common_1.HttpCode)(202),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_file/:filePath'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteFile", null);
ProductController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map