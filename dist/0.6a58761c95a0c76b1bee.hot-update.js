"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 135:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const common_1 = __webpack_require__(7);
const express_1 = __webpack_require__(20);
const platform_express_1 = __webpack_require__(136);
const throttler_behind_proxy_guard_1 = __webpack_require__(78);
const error_handler_filter_1 = __webpack_require__(85);
const create_product_dto_1 = __webpack_require__(137);
const throttler_1 = __webpack_require__(79);
const product_service_1 = __webpack_require__(129);
const roles_auth_decorator_1 = __webpack_require__(80);
const add_content_guard_1 = __webpack_require__(103);
const jw_refresh_guard_1 = __webpack_require__(83);
const jwt_auth_guard_1 = __webpack_require__(11);
const owner_admin_guard_1 = __webpack_require__(82);
const roles_guard_1 = __webpack_require__(81);
const multer_1 = __webpack_require__(138);
const path_1 = __importStar(__webpack_require__(115));
const update_product_dto_1 = __webpack_require__(139);
const user_type_decorator_1 = __webpack_require__(93);
const user_id_decorator_1 = __webpack_require__(97);
const api_exception_filter_1 = __webpack_require__(87);
const fs_1 = __webpack_require__(114);
const uuid_1 = __webpack_require__(60);
const edit_content_guard_1 = __webpack_require__(140);
const formdata_pipe_1 = __webpack_require__(141);
const user_guard_1 = __webpack_require__(124);
const query_filter_dto_1 = __webpack_require__(144);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(response, request, next, page, pageSize) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProducts(request, response, next, page, pageSize);
        }))();
    }
    getProductsByIds(response, request, next, page, pageSize, productIds) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.productService.getProductsByIds(request, response, productIds, page, pageSize);
            }
            catch (err) {
                return next(err);
            }
        }))();
    }
    filterProducts(response, request, next, queryFilterDto) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.productService.filterProducts(request, response, queryFilterDto);
            }
            catch (err) {
                return next(err);
            }
        }))();
    }
    getById(response, request, next, productId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            return this.productService.getProductById(request, response, next, productId);
        }))();
    }
    getBookmarkProducts(response, request, next, page, pageSize, userId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.productService.getBookmarks(request, response, page, pageSize, userId);
            }
            catch (err) {
                return next(err);
            }
        }))();
    }
    getWatchedProducts(response, request, next, page, pageSize, userId) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                return this.productService.getWatchedProducts(request, response, page, pageSize, userId);
            }
            catch (err) {
                return next(err);
            }
        }))();
    }
    addWatchedProduct(next, productId, userId) {
        try {
            return this.productService.addWatchedProduct(productId, userId);
        }
        catch (err) {
            return next(err);
        }
    }
    addBookmark(next, productId, userId) {
        try {
            return this.productService.addBookmarkProduct(productId, userId);
        }
        catch (err) {
            return next(err);
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
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _d : Object, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, common_1.Query)('productIds', common_1.ParseArrayPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _f : Object, typeof (_g = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _g : Object, Number, Number, Array]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProductsByIds", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _k : Object, typeof (_l = typeof query_filter_dto_1.QueryFilterDto !== "undefined" && query_filter_dto_1.QueryFilterDto) === "function" ? _l : Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "filterProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Get)('/:productId'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object, typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _p : Object, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getById", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('bookmarkProducts'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _q : Object, typeof (_r = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _r : Object, typeof (_s = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _s : Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getBookmarkProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Get)('watchedProducts'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Next)()),
    __param(3, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('pageSize', common_1.ParseIntPipe)),
    __param(5, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object, typeof (_u = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _u : Object, typeof (_v = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _v : Object, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getWatchedProducts", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addWatchedProduct'),
    __param(0, (0, common_1.Next)()),
    __param(1, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _w : Object, Number, Number]),
    __metadata("design:returntype", Object)
], ProductController.prototype, "addWatchedProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, roles_auth_decorator_1.Roles)('USER'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, user_guard_1.UserGuard),
    (0, common_1.Post)('addBookmarkProduct'),
    __param(0, (0, common_1.Next)()),
    __param(1, (0, common_1.Query)('productId', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_y = typeof express_1.NextFunction !== "undefined" && express_1.NextFunction) === "function" ? _y : Object, Number, Number]),
    __metadata("design:returntype", Object)
], ProductController.prototype, "addBookmark", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.Put)('create_product'),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
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
        }),
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_0 = typeof create_product_dto_1.CreateProductDto !== "undefined" && create_product_dto_1.CreateProductDto) === "function" ? _0 : Object, Object, Number, String]),
    __metadata("design:returntype", typeof (_1 = typeof Promise !== "undefined" && Promise) === "function" ? _1 : Object)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
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
        }),
    })),
    __param(0, (0, common_1.Body)(new formdata_pipe_1.ParseFormDataJsonPipe({ except: ['images', 'sizeChartImage'] }))),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, user_id_decorator_1.UserId)('USER-ID')),
    __param(3, (0, user_type_decorator_1.Type)('REFRESHTOKEN')),
    __param(4, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_2 = typeof update_product_dto_1.UpdateProductDto !== "undefined" && update_product_dto_1.UpdateProductDto) === "function" ? _2 : Object, Number, Number, String, Object]),
    __metadata("design:returntype", typeof (_3 = typeof Promise !== "undefined" && Promise) === "function" ? _3 : Object)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Delete)('delete_product/:productId'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(202),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, throttler_1.Throttle)(70, 700),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.Delete)('delete_image'),
    (0, roles_auth_decorator_1.Roles)('OWNER', 'ADMIN'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard, owner_admin_guard_1.OwnerAdminGuard, jw_refresh_guard_1.AuthFerfershGuard, edit_content_guard_1.EditContentGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)('filePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_5 = typeof Promise !== "undefined" && Promise) === "function" ? _5 : Object)
], ProductController.prototype, "deleteFile", null);
ProductController = __decorate([
    (0, common_1.UseGuards)(throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard),
    (0, common_1.UseFilters)(error_handler_filter_1.ApiErrorExceptionFilter, api_exception_filter_1.ApiExceptionFilter),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor, common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d373da0920a03c3ce3dd")
/******/ })();
/******/ 
/******/ }
;