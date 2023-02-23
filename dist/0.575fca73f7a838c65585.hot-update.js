"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 129:
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ProductService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const common_1 = __webpack_require__(7);
const product_constants_1 = __webpack_require__(130);
const sequelize_1 = __webpack_require__(8);
const fs_1 = __webpack_require__(114);
const path_1 = __webpack_require__(115);
const admin_service_1 = __webpack_require__(58);
const api_exception_1 = __webpack_require__(52);
const owner_service_1 = __webpack_require__(59);
const categories_service_1 = __webpack_require__(131);
const product_model_1 = __webpack_require__(32);
const users_service_1 = __webpack_require__(24);
const user_constants_1 = __webpack_require__(50);
const colours_service_1 = __webpack_require__(134);
let ProductService = ProductService_1 = class ProductService {
    constructor(productRepository, userService, ownerService, adminService, categoriesService, coloursService) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.categoriesService = categoriesService;
        this.coloursService = coloursService;
        this.Logger = new common_1.Logger(ProductService_1.name);
    }
    getProductsByCategory(request, response, next, page, pageSize, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const currency = request['currency'];
                let products = yield this.productRepository.findAll({
                    include: { all: true },
                });
                if (categories && categories.length > 0) {
                    products = products.filter((product) => {
                        if (product.categories.some((category) => categories.map((category) => Number(category)).includes(category.id))) {
                            return product;
                        }
                    });
                }
                return response.json({
                    products: products
                        .map((product) => {
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            price: Math.round(product.price * currency.rate) + currency.symbol,
                            quantity: product.quantity,
                            images: product.images,
                            hexes: product.hexes,
                            sizeChartImage: product.sizeChartImage,
                            sizes: product.sizes,
                            colours: product.colours,
                            categories: product.categories.map((category) => {
                                return {
                                    id: category.id,
                                    ua: category.ua,
                                    en: category.en,
                                    rs: category.rs,
                                    ru: category.ru,
                                    createdAt: category.createdAt,
                                    updatedAt: category.updatedAt,
                                };
                            }),
                            reviews: product.reviews.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            }),
                        };
                    })
                        .slice((page - 1) * pageSize, pageSize * page),
                    totalProducts: products.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getBookmarks(request, response, next, page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const currency = request['currency'];
                const products = user.bookmarks
                    .slice((page - 1) * productPerPage, productPerPage * page)
                    .map((product) => {
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images,
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours,
                        categories: product.categories.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: products,
                    totalProducts: user.bookmarks.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getWatchedProducts(request, response, next, page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const currency = request['currency'];
                const products = user.watched
                    .slice((page - 1) * productPerPage, productPerPage * page)
                    .map((product) => {
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images,
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours,
                        categories: product.categories.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: products,
                    totalProducts: user.bookmarks.length,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getProductsByIds(request, response, next, productIds, page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count();
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    offset: (page - 1) * productPerPage,
                    limit: productPerPage,
                    where: {
                        id: productIds,
                    },
                });
                const currency = request['currency'];
                const returnedProducts = products.map((product) => {
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images,
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours,
                        categories: product.categories.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                });
                return response.json({
                    products: returnedProducts,
                    totalProducts: totalCount,
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(err);
            }
        });
    }
    getProducts(request, response, next, page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count();
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    order: [['updatedAt', 'DESC']],
                });
                const currency = request['currency'];
                const returnedProducts = products
                    .map((product) => {
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price * currency.rate + currency.symbol,
                        quantity: product.quantity,
                        images: product.images,
                        hexes: product.hexes,
                        sizeChartImage: product.sizeChartImage,
                        sizes: product.sizes,
                        colours: product.colours,
                        categories: product.categories.map((category) => {
                            return {
                                id: category.id,
                                ua: category.ua,
                                en: category.en,
                                rs: category.rs,
                                ru: category.ru,
                                createdAt: category.createdAt,
                                updatedAt: category.updatedAt,
                            };
                        }),
                        reviews: product.reviews.map((review) => {
                            return {
                                id: review.id,
                                name: review.name,
                                surname: review.surname,
                                review: review.review,
                                createdAt: review.createdAt,
                                updatedAt: review.updatedAt,
                            };
                        }),
                    };
                })
                    .slice((page - 1) * productPerPage, productPerPage * page);
                return response.json({
                    products: returnedProducts,
                    totalProducts: totalCount,
                });
            }
            catch (error) {
                this.Logger.error(error);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    getProductById(request, response, next, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.findByPk(productId, {
                    include: {
                        all: true,
                    },
                });
                if (!product) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
                }
                const currency = request['currency'];
                return response.json({
                    id: product.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    price: Math.floor(product.price * currency.rate) + currency.symbol,
                    quantity: product.quantity,
                    images: product.images,
                    sizeChartImage: product.sizeChartImage,
                    sizes: product.sizes,
                    hexes: product.hexes,
                    colours: product.colours,
                    categories: product.categories.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: product.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    }),
                });
            }
            catch (err) {
                this.Logger.error(err);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    filterProducts(request, response, next, queryFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let products = yield this.productRepository.findAll({
                    include: { all: true },
                });
                if (queryFilterDto.order && queryFilterDto.order === 'ASC') {
                    products.sort((firstProduct, secondProduct) => {
                        return firstProduct.price - secondProduct.price;
                    });
                }
                if (queryFilterDto.order && queryFilterDto.order === 'DESC') {
                    products.sort((firstProduct, secondProduct) => {
                        return secondProduct.price - firstProduct.price;
                    });
                }
                if (queryFilterDto.categories && queryFilterDto.categories.length > 0) {
                    products = products.filter((product) => {
                        if (product.categories.some((category) => queryFilterDto.categories.includes(category.id))) {
                            return product;
                        }
                    });
                }
                if (queryFilterDto.sizes && queryFilterDto.sizes.length > 0) {
                    products = products.filter((product) => {
                        if (product.sizes.some((size) => queryFilterDto.sizes.includes(size))) {
                            return product;
                        }
                    });
                }
                if (queryFilterDto.colours && queryFilterDto.colours.length > 0) {
                    products = products.filter((product) => {
                        if (product.colours.some((colour) => queryFilterDto.colours.includes(colour.id))) {
                            return product;
                        }
                    });
                }
                const currency = request['currency'];
                return response.json({
                    products: products
                        .map((product) => {
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            price: Math.round(product.price * currency.rate) + currency.symbol,
                            quantity: product.quantity,
                            images: product.images,
                            hexes: product.hexes,
                            sizeChartImage: product.sizeChartImage,
                            sizes: product.sizes,
                            colours: product.colours,
                            categories: product.categories.map((category) => {
                                return {
                                    id: category.id,
                                    ua: category.ua,
                                    en: category.en,
                                    rs: category.rs,
                                    ru: category.ru,
                                    createdAt: category.createdAt,
                                    updatedAt: category.updatedAt,
                                };
                            }),
                            reviews: product.reviews.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            }),
                        };
                    })
                        .slice((queryFilterDto.page - 1) * queryFilterDto.pageSize, queryFilterDto.pageSize * queryFilterDto.page),
                    totalProducts: products.length,
                });
            }
            catch (error) {
                this.Logger.error(error);
                return next(new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND));
            }
        });
    }
    addWatchedProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const product = yield this.findById(productId);
                if (!user.watched || user.watched.length === 0) {
                    user.$set('watched', product.id);
                    user.watched = [product];
                }
                else {
                    user.$add('watched', product.id);
                }
                yield user.save();
                return productId;
            }
            catch (err) {
                this.Logger.error(err);
                throw err;
            }
        });
    }
    addBookmarkProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUserById(userId);
                if (!user) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
                }
                const product = yield this.findById(productId);
                if (!user.bookmarks || user.bookmarks.length === 0) {
                    user.$set('bookmarks', product.id);
                    user.bookmarks = [product];
                }
                else {
                    user.$add('bookmarks', product.id);
                }
                yield user.save();
                return productId;
            }
            catch (err) {
                this.Logger.error(err);
                throw err;
            }
        });
    }
    createProduct(createProductDto, userId, type, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!type && !userId) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', product_constants_1.NOT_AUTHORIZED);
                }
                if (!images ||
                    images.length === 0 ||
                    !sizeChartImage ||
                    sizeChartImage.length === 0) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', product_constants_1.NO_IMAGES_PROVIDED);
                }
                const imagesPaths = images.map((image) => {
                    return ('/' +
                        image.path
                            .split('\\')
                            .slice(image.path.split('\\').indexOf('products'))
                            .join('/'));
                });
                const sizeChartImagePath = '/' +
                    sizeChartImage[0].path
                        .split('\\')
                        .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
                        .join('/');
                const product = yield this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { title: JSON.stringify(createProductDto.title), description: JSON.stringify(createProductDto.description), images: imagesPaths, sizeChartImage: sizeChartImagePath }));
                product.reviews = [];
                for (const category of createProductDto.categories) {
                    const productCategory = yield this.categoriesService.getCategoryById(Number(category));
                    if (!product.categories) {
                        product.$add('categories', productCategory.id);
                        product.categories = [productCategory];
                    }
                    else {
                        product.$add('categories', productCategory.id);
                    }
                    yield product.save();
                }
                for (const colour of createProductDto.colours) {
                    const productColour = yield this.coloursService.getColourById(Number(colour));
                    if (!product.colours) {
                        product.$add('colours', productColour.id);
                        product.colours = [productColour];
                    }
                    else {
                        product.$add('colours', productColour.id);
                    }
                    if (!product.hexes) {
                        product.hexes = [productColour.hex];
                    }
                    else {
                        product.hexes.push(productColour.hex);
                    }
                    yield product.save();
                }
                if (type && type === 'OWNER') {
                    const owner = yield this.ownerService.getOwnerById(userId);
                    product.setOwnerId(userId);
                    product.$set('owner', userId);
                    product.owner = owner;
                    owner.$add('products', product.id);
                    owner.addProduct(product);
                    yield Promise.all([yield product.save(), yield owner.save()]);
                }
                if (type && type === 'ADMIN') {
                    product.setAdminId(userId);
                    product.$set('admin', userId);
                    const admin = yield this.adminService.getAdminById(userId);
                    product.admin = admin;
                    admin.$add('products', product.id);
                    admin.addProduct(product);
                    yield Promise.all([yield product.save(), yield admin.save()]);
                }
                yield product.save();
                const dbProduct = yield this.findById(product.id);
                const Product = {
                    id: dbProduct.id,
                    title: dbProduct.getTitle(),
                    description: dbProduct.getDescription(),
                    price: dbProduct.price,
                    quantity: dbProduct.quantity,
                    images: dbProduct.images,
                    sizeChartImage: dbProduct.sizeChartImage,
                    sizes: dbProduct.sizes,
                    colours: dbProduct.colours.map((colour) => {
                        return {
                            id: colour.id,
                            ua: colour.ua,
                            en: colour.en,
                            rs: colour.rs,
                            ru: colour.ru,
                            hex: colour.hex,
                            createdAt: colour.createdAt,
                            updatedAt: colour.updatedAt,
                        };
                    }),
                    categories: dbProduct.categories.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: dbProduct.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    }),
                };
                return Product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    updateProduct(updateProductDto, productId, userId, type, images, sizeChartImage) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.productRepository.findByPk(productId, {
                    include: { all: true },
                });
                if (!existingProduct) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
                }
                if (type && type === 'OWNER') {
                    existingProduct.setOwnerId(userId);
                }
                if (type && type === 'ADMIN' && !existingProduct.getAdminId()) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        existingProduct.setAdminId(userId);
                        existingProduct.$set('admin', userId);
                        const admin = yield this.adminService.getAdminById(userId);
                        existingProduct.admin = admin;
                        admin.$add('products', existingProduct.id);
                        admin.addProduct(existingProduct);
                        yield Promise.all([yield existingProduct.save(), yield admin.save()]);
                    }), 0);
                }
                existingProduct.setTitle(updateProductDto.title);
                existingProduct.setDescription(updateProductDto.description);
                existingProduct.quantity = updateProductDto.quantity;
                existingProduct.price = updateProductDto.price;
                existingProduct.sizes = [...updateProductDto.sizes];
                existingProduct.hexes = [];
                for (const category of existingProduct.categories) {
                    existingProduct.$remove('categories', category.id);
                    yield existingProduct.save();
                }
                for (const category of updateProductDto.categories) {
                    const existingProductCategory = yield this.categoriesService.getCategoryById(Number(category));
                    if (!existingProduct.categories) {
                        existingProduct.$add('categories', existingProductCategory.id);
                        existingProduct.categories = [existingProductCategory];
                    }
                    else {
                        existingProduct.$add('categories', existingProductCategory.id);
                    }
                    yield existingProduct.save();
                }
                for (const colour of existingProduct.colours) {
                    existingProduct.$remove('colours', colour.id);
                    yield existingProduct.save();
                }
                for (const colour of updateProductDto.colours) {
                    const existingProductColour = yield this.coloursService.getColourById(Number(colour));
                    if (!existingProduct.colours) {
                        existingProduct.$add('colours', existingProductColour.id);
                        existingProduct.colours = [existingProductColour];
                    }
                    else {
                        existingProduct.$add('colours', existingProductColour.id);
                    }
                    if (!existingProduct.hexes) {
                        existingProduct.hexes = [existingProductColour.hex];
                    }
                    else {
                        existingProduct.hexes.push(existingProductColour.hex);
                    }
                    yield existingProduct.save();
                }
                if (images && images.length > 0) {
                    for (const image of existingProduct.images) {
                        const file = (0, path_1.join)(__dirname, 'static' + image);
                        (0, fs_1.unlink)(file, (err) => {
                            if (err) {
                                this.Logger.error(err.message);
                            }
                        });
                    }
                    const imagesPaths = images.map((image) => {
                        return ('/' +
                            image.path
                                .split('\\')
                                .slice(image.path.split('\\').indexOf('products'))
                                .join('/'));
                    });
                    existingProduct.images = [...imagesPaths];
                }
                if (sizeChartImage && sizeChartImage.length > 0) {
                    const sizeChartImagePath = '/' +
                        sizeChartImage[0].path
                            .split('\\')
                            .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
                            .join('/');
                    const file = (0, path_1.join)(__dirname, 'static' + existingProduct.sizeChartImage);
                    if ((0, fs_1.existsSync)(file)) {
                        (0, fs_1.unlink)(file, (err) => {
                            if (err) {
                                this.Logger.error(err.message);
                            }
                        });
                    }
                    existingProduct.sizeChartImage = sizeChartImagePath;
                }
                yield existingProduct.save();
                const dbProduct = yield this.findById(existingProduct.id);
                const Product = {
                    id: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.id,
                    title: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.getTitle(),
                    description: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.getDescription(),
                    price: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.price,
                    quantity: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity,
                    images: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.images,
                    sizeChartImage: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizeChartImage,
                    sizes: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizes,
                    colours: dbProduct.colours.map((colour) => {
                        return {
                            id: colour.id,
                            ua: colour.ua,
                            en: colour.en,
                            rs: colour.rs,
                            ru: colour.ru,
                            hex: colour.hex,
                            createdAt: colour.createdAt,
                            updatedAt: colour.updatedAt,
                        };
                    }),
                    categories: (_a = dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.categories) === null || _a === void 0 ? void 0 : _a.map((category) => {
                        return {
                            id: category.id,
                            ua: category.ua,
                            en: category.en,
                            rs: category.rs,
                            ru: category.ru,
                            createdAt: category.createdAt,
                            updatedAt: category.updatedAt,
                        };
                    }),
                    reviews: [],
                };
                if (dbProduct.reviews.length !== 0) {
                    Product.reviews = dbProduct.reviews.map((review) => {
                        return {
                            id: review.id,
                            name: review.name,
                            surname: review.surname,
                            review: review.review,
                            createdAt: review.createdAt,
                            updatedAt: review.updatedAt,
                        };
                    });
                }
                return Product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.productRepository.findByPk(productId, {
                    include: { all: true },
                });
                if (!existingProduct) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND);
                }
                for (const image of existingProduct.images) {
                    const file = (0, path_1.join)(__dirname, 'static' + image);
                    (0, fs_1.unlink)(file, (err) => {
                        if (err) {
                            this.Logger.error(err.message);
                        }
                    });
                }
                const sizeChartImage = (0, path_1.join)(__dirname, 'static', ...existingProduct.sizeChartImage.split('/'));
                (0, fs_1.unlink)(sizeChartImage, (err) => {
                    if (err) {
                        this.Logger.error(err.message);
                    }
                });
                const folderPath = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0]
                    .split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 2));
                const imagesFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0]
                    .split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 1));
                const sizeChartImageFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.sizeChartImage
                    .split('/')
                    .slice(0, existingProduct.sizeChartImage.split('/').length - 1));
                if ((0, fs_1.readdirSync)(imagesFolder).length === 0 &&
                    (0, fs_1.readdirSync)(sizeChartImageFolder).length === 0) {
                    (0, fs_1.rmSync)(folderPath, { recursive: true, force: true });
                }
                const product = yield this.productRepository.destroy({
                    where: {
                        id: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.id,
                        quantity: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.quantity,
                        price: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.price,
                        sizes: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.sizes,
                        images: existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.images,
                    },
                });
                return product;
            }
            catch (error) {
                this.Logger.error(error);
                throw error;
            }
        });
    }
    deleteImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = (0, path_1.join)(__dirname, 'static' + filePath);
                this.Logger.log(file);
                if (!(0, fs_1.existsSync)(file)) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.FILE_NOT_FOUND);
                }
                (0, fs_1.unlink)(file, (err) => {
                    if (err) {
                        this.Logger.error(err.message);
                    }
                });
                const [productsImages, sizeChartImageProducts] = yield Promise.all([
                    yield this.productRepository.findAll({ where: { images: [filePath] } }),
                    yield this.productRepository.findAll({
                        where: { sizeChartImage: filePath },
                    }),
                ]);
                if ((productsImages === null || productsImages === void 0 ? void 0 : productsImages.length) !== 0) {
                    for (const product of productsImages) {
                        const index = product.images.indexOf(filePath);
                        product.images.splice(index, 1);
                        yield product.save();
                    }
                }
                if ((sizeChartImageProducts === null || sizeChartImageProducts === void 0 ? void 0 : sizeChartImageProducts.length) !== 0) {
                    for (const product of sizeChartImageProducts) {
                        product.sizeChartImage = null;
                        yield product.save();
                    }
                }
                return filePath;
            }
            catch (error) {
                console.log(error);
                this.Logger.error(error);
                throw error;
            }
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne({
                where: {
                    id: productId,
                },
                include: {
                    all: true,
                },
            });
            if (!product) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
            }
            return product;
        });
    }
};
ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof owner_service_1.OwnerService !== "undefined" && owner_service_1.OwnerService) === "function" ? _b : Object, typeof (_c = typeof admin_service_1.AdminService !== "undefined" && admin_service_1.AdminService) === "function" ? _c : Object, typeof (_d = typeof categories_service_1.CategoriesService !== "undefined" && categories_service_1.CategoriesService) === "function" ? _d : Object, typeof (_e = typeof colours_service_1.ColoursService !== "undefined" && colours_service_1.ColoursService) === "function" ? _e : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ff7d2809eab0f5cc30e7")
/******/ })();
/******/ 
/******/ }
;