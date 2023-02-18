"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const roles_auth_decorator_1 = require("../common/decorators/roles-auth.decorator");
const add_content_guard_1 = require("../common/guards/add-content.guard");
const jw_refresh_guard_1 = require("../common/guards/jw-refresh.guard");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const owner_admin_guard_1 = require("../common/guards/owner-admin.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const multer_1 = require("multer");
const path_1 = __importStar(require("path"));
const update_product_dto_1 = require("./dto/update.product.dto");
const user_type_decorator_1 = require("../common/decorators/user-type.decorator");
const user_id_decorator_1 = require("../common/decorators/user.id.decorator");
const api_exception_filter_1 = require("../common/filters/api-exception.filter");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const edit_content_guard_1 = require("../common/guards/edit-content.guard");
const formdata_pipe_1 = require("../common/pipes/formdata.pipe");
const user_guard_1 = require("../common/guards/user.guard");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(page, pageSize) {
        try {
            return this.productService.getProducts(page, pageSize);
        }
        catch (err) {
            throw err;
        }
    }
    getProductsByIds(page, pageSize, productIds) {
        try {
            return this.productService.getProductsByIds(productIds, page, pageSize);
        }
        catch (err) {
            throw err;
        }
    }
    filterProducts(page, pageSize, order, sizes, colours, categories) {
        try {
            return this.productService.filterProducts(page, pageSize, order, sizes, colours, categories);
        }
        catch (err) {
            throw err;
        }
    }
    getById(productId) {
        try {
            return this.productService.getProductById(productId);
        }
        catch (err) {
            throw err;
        }
    }
    getBookmarkProducts(page, pageSize, userId) {
        try {
            return this.getBookmarkProducts(page, pageSize, userId);
        }
        catch (err) {
            throw err;
        }
    }
    getWatchedProducts(page, pageSize, userId) {
        try {
            return this.getWatchedProducts(page, pageSize, userId);
        }
        catch (err) {
            throw err;
        }
    }
    addWatchedProduct(productId, userId) {
        try {
            return this.addWatchedProduct(productId, userId);
        }
        catch (err) {
            throw err;
        }
    }
    addBookmark(productId, userId) {
        try {
            return this.addBookmark(productId, userId);
        }
        catch (err) {
            throw err;
        }
    }
    createProduct(createProductDto, files, userId, type) {
        try {
            return this.productService.createProduct(createProductDto, userId, type, files.images, files.sizeChartImage);
        }
        catch (error) {
            throw error;
        }
    }
    updateProduct(updateProductDto, productId, userId, type, files) {
        try {
            return this.productService.updateProduct(updateProductDto, productId, userId, type, files.images, files.sizeChartImage);
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
        return this.productService.deleteImage(filePath);
    }
};
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('productIds', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductsByIds", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('order')),
    __param(3, (0, common_1.Query)('sizes', common_1.ParseArrayPipe)),
    __param(4, (0, common_1.Query)('colours', common_1.ParseArrayPipe)),
    __param(5, (0, common_1.Query)('categories', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Array, Array, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "filterProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getById", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('bookmarkProducts'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBookmarkProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('watchedProducts'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getWatchedProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addWatchedProduct'),
    __param(0, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addWatchedProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addBookmarkProduct'),
    __param(0, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(1, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addBookmark", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Put)('create_product'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, add_content_guard_1.AddContentGuard),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: (req, file, callback) => {
            const filetypes = /jpeg|jpg|png|gif|svg/;
            const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Only image files are allowed!'), false);
            }
        },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                var _a, _b, _c;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const destination = path_1.default.join(__dirname, 'static', 'products', `${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}`);
                const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_c = JSON.parse(req.body.title)) === null || _c === void 0 ? void 0 : _c.en.split(' ').join('_')}`, file.fieldname);
                if (!(0, fs_1.existsSync)(destination)) {
                    (0, fs_1.mkdirSync)(destination, { recursive: true });
                }
                if (!(0, fs_1.existsSync)(imagesPath)) {
                    (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
                }
                callback(null, imagesPath);
            },
            filename: (req, file, callback) => {
                var _a, _b;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const name = file.originalname.split('.')[0];
                const ext = (0, path_1.extname)(file.originalname);
                const randomName = (0, uuid_1.v4)();
                callback(null, `${randomName}--${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}--${name}${ext}`);
            },
        })
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object, Number, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Patch)('update_product/:productId'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(202),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 20 },
        { name: 'sizeChartImage', maxCount: 1 },
    ], {
        fileFilter: (req, file, callback) => {
            const filetypes = /jpeg|jpg|png|gif|svg/;
            const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
            if (mimetype && extname) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Only image files are allowed!'), false);
            }
        },
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, callback) => {
                var _a, _b, _c;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const destination = path_1.default.join(__dirname, 'static', 'products', `${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}`);
                const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_c = JSON.parse(req.body.title)) === null || _c === void 0 ? void 0 : _c.en.split(' ').join('_')}`, file.fieldname);
                if (!(0, fs_1.existsSync)(destination)) {
                    (0, fs_1.mkdirSync)(destination, { recursive: true });
                }
                if (!(0, fs_1.existsSync)(imagesPath)) {
                    (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
                }
                callback(null, imagesPath);
            },
            filename: (req, file, callback) => {
                var _a, _b;
                if (!((_a = JSON.parse(req.body.title)) === null || _a === void 0 ? void 0 : _a.en)) {
                    return callback(new Error('Invalid params!'), null);
                }
                const name = file.originalname.split('.')[0];
                const ext = (0, path_1.extname)(file.originalname);
                const randomName = (0, uuid_1.v4)();
                callback(null, `${randomName}--${(_b = JSON.parse(req.body.title)) === null || _b === void 0 ? void 0 : _b.en.split(' ').join('_')}--${name}${ext}`);
            },
        })
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __param(4, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_product_dto_1.UpdateProductDto, Number, Number, String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_product/:productId'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(202),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Delete)('delete_image'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteFile", null);
ProductController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map