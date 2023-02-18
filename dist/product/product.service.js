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
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_constants_1 = require("./product.constants");
const sequelize_1 = require("@nestjs/sequelize");
const fs_1 = require("fs");
const path_1 = require("path");
const admin_service_1 = require("../admin/services/admin.service");
const api_exception_1 = require("../common/exceptions/api.exception");
const owner_service_1 = require("../owner/services/owner.service");
const categories_service_1 = require("../categories/categories.service");
const product_model_1 = require("./models/product.model");
const users_service_1 = require("../users/services/users.service");
const user_constants_1 = require("../users/constants/user.constants");
let ProductService = ProductService_1 = class ProductService {
    constructor(productRepository, userService, ownerService, adminService, categoriesService) {
        this.productRepository = productRepository;
        this.userService = userService;
        this.ownerService = ownerService;
        this.adminService = adminService;
        this.categoriesService = categoriesService;
        this.Logger = new common_1.Logger(ProductService_1.name);
    }
    getBookmarks(page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const products = user.bookmarks
                .slice((page - 1) * productPerPage, productPerPage * page)
                .map(product => {
                return {
                    id: product.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    price: product.price,
                    quantity: product.quantity,
                    images: product.images,
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
                    })
                };
            });
            return {
                products: products,
                totalItems: user.bookmarks.length,
            };
        });
    }
    getWatchedProducts(page, productPerPage, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const products = user.watched
                .slice((page - 1) * productPerPage, productPerPage * page)
                .map(product => {
                return {
                    id: product.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    price: product.price,
                    quantity: product.quantity,
                    images: product.images,
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
                    })
                };
            });
            return {
                products: products,
                totalItems: user.watched.length,
            };
        });
    }
    addWatchedProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    addBookmarkProduct(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    getProductsByIds(productIds, page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCount = yield this.productRepository.count();
            const products = yield this.productRepository.findAll({
                include: { all: true },
                offset: (page - 1) * productPerPage,
                limit: productPerPage,
                attributes: [
                    'id',
                    'title',
                    'price',
                    'decription',
                    'quantity',
                    'colours',
                    'sizes',
                    'categories',
                    'images',
                    'sizeChartImage'
                ],
                where: {
                    id: productIds,
                }
            });
            const returnedProducts = products.map(product => {
                return {
                    id: product.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    price: product.price,
                    quantity: product.quantity,
                    images: product.images,
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
                    })
                };
            });
            return {
                products: returnedProducts,
                totalItems: totalCount,
            };
        });
    }
    getProducts(page, productPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count();
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    offset: (page - 1) * productPerPage,
                    order: [['updatedAt', 'DESC']],
                    limit: productPerPage,
                    attributes: [
                        'id',
                        'title',
                        'price',
                        'decription',
                        'quantity',
                        'colours',
                        'sizes',
                        'categories',
                        'images',
                        'sizeChartImage'
                    ]
                });
                const returnedProducts = products.map(product => {
                    return {
                        id: product.id,
                        title: product.getTitle(),
                        description: product.getDescription(),
                        price: product.price,
                        quantity: product.quantity,
                        images: product.images,
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
                        })
                    };
                });
                return {
                    products: returnedProducts,
                    totalItems: totalCount,
                };
            }
            catch (error) {
                this.Logger.error(error);
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND);
            }
        });
    }
    filterProducts(page, productPerPage, order, sizes, colours, categories) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCount = yield this.productRepository.count({
                    where: {
                        sizes: sizes ? sizes : [],
                        colours: colours ? colours : [],
                    }
                });
                const products = yield this.productRepository.findAll({
                    include: { all: true },
                    offset: (page - 1) * productPerPage,
                    limit: productPerPage,
                    attributes: [
                        'id',
                        'title',
                        'price',
                        'decription',
                        'quantity',
                        'colours',
                        'sizes',
                        'categories',
                        'images',
                        'sizeChartImage'
                    ],
                    where: {
                        sizes: { include: sizes },
                        colours: { include: colours },
                    }
                });
                if (categories.length === 0 || !categories) {
                    const returnedProducts = products.map((product) => {
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            price: product.price,
                            quantity: product.quantity,
                            images: product.images,
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
                            })
                        };
                    });
                    return {
                        products: returnedProducts,
                        totalItems: totalCount,
                    };
                }
                const returnedProducts = products.map((product) => {
                    var _a;
                    if (product.categories.some((category) => categories.indexOf(category.id) >= 0)) {
                        return {
                            id: product.id,
                            title: product.getTitle(),
                            description: product.getDescription(),
                            price: product.price,
                            quantity: product.quantity,
                            images: product.images,
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
                            reviews: (_a = product === null || product === void 0 ? void 0 : product.reviews) === null || _a === void 0 ? void 0 : _a.map((review) => {
                                return {
                                    id: review.id,
                                    name: review.name,
                                    surname: review.surname,
                                    review: review.review,
                                    createdAt: review.createdAt,
                                    updatedAt: review.updatedAt,
                                };
                            })
                        };
                    }
                });
                return {
                    products: returnedProducts,
                    totalItems: totalCount,
                };
            }
            catch (error) {
                this.Logger.error(error);
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCTS_NOT_FOUND);
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findByPk(productId, {
                include: {
                    all: true,
                },
                attributes: [
                    'id',
                    'title',
                    'price',
                    'description',
                    'quantity',
                    'colours',
                    'sizes',
                    'images',
                    'sizeChartImage'
                ],
            });
            if (!product) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
            }
            return {
                id: product.id,
                title: product.getTitle(),
                description: product.getDescription(),
                price: product.price,
                quantity: product.quantity,
                images: product.images,
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
                })
            };
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findByPk(productId);
            if (!product) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', product_constants_1.PRODUCT_NOT_FOUND);
            }
            return product;
        });
    }
    createProduct(createProductDto, userId, type, images, sizeChartImage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!type && !userId) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', product_constants_1.NOT_AUTHORIZED);
                }
                if (!images || images.length === 0 || !sizeChartImage || sizeChartImage.length === 0) {
                    throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', product_constants_1.NO_IMAGES_PROVIDED);
                }
                const imagesPaths = images.map((image) => {
                    return '/' + image
                        .path.split('\\')
                        .slice(image.path.split('\\')
                        .indexOf('products'))
                        .join('/');
                });
                const sizeChartImagePath = '/' + sizeChartImage[0].path
                    .split('\\').slice(sizeChartImage[0]
                    .path.split('\\').indexOf('products')).join('/');
                const product = yield this.productRepository.create(Object.assign(Object.assign({}, createProductDto), { title: JSON.stringify(createProductDto.title), description: JSON.stringify(createProductDto.description), images: imagesPaths, sizeChartImage: sizeChartImagePath }));
                for (const category of createProductDto.categories) {
                    const productCategory = yield this.categoriesService.getCategoryById(Number(category));
                    if (!product.categories) {
                        product.$set('categories', productCategory.id);
                        product.categories = [productCategory];
                    }
                    else {
                        product.$add('categories', productCategory.id);
                    }
                    yield product.save();
                }
                if (type && type === 'OWNER') {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        const owner = yield this.ownerService.getOwnerById(userId);
                        product.setOwnerId(userId);
                        product.$set('owner', userId);
                        product.owner = owner;
                        owner.$add('products', product.id);
                        owner.addProduct(product);
                        yield Promise.all([
                            yield product.save(),
                            yield owner.save(),
                        ]);
                    }), 0);
                }
                if (type && type === 'ADMIN') {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        product.setAdminId(userId);
                        product.$set('admin', userId);
                        const admin = yield this.adminService.getAdminById(userId);
                        product.admin = admin;
                        admin.$add('products', product.id);
                        admin.addProduct(product);
                        yield Promise.all([
                            yield product.save(),
                            yield admin.save(),
                        ]);
                    }), 0);
                }
                const dbProduct = yield this.getProductById(product.id);
                const Product = {
                    id: dbProduct.id,
                    title: product.getTitle(),
                    description: product.getDescription(),
                    price: dbProduct.price,
                    quantity: dbProduct.quantity,
                    images: dbProduct.images,
                    sizeChartImage: dbProduct.sizeChartImage,
                    sizes: dbProduct.sizes,
                    colours: dbProduct.colours,
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
    updateProduct(updateProductDto, productId, userId, type, images, sizeChartImage) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.productRepository.findByPk(productId, {
                    include: { all: true }
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
                        yield Promise.all([
                            yield existingProduct.save(),
                            yield admin.save(),
                        ]);
                    }), 0);
                }
                existingProduct.setTitle(updateProductDto.title);
                existingProduct.setDescription(updateProductDto.description);
                existingProduct.quantity = updateProductDto.quantity;
                existingProduct.price = updateProductDto.price;
                existingProduct.sizes = [...updateProductDto.sizes];
                existingProduct.colours = [...updateProductDto.colours];
                for (const category of existingProduct.categories) {
                    existingProduct.$remove('categories', category.id);
                    yield existingProduct.save();
                }
                for (const category of updateProductDto.categories) {
                    const productCategory = yield this.categoriesService.getCategoryById(Number(category));
                    if (existingProduct.categories.length === 0) {
                        existingProduct.$set('categories', productCategory.id);
                        existingProduct.categories = [productCategory];
                    }
                    else {
                        existingProduct.$add('categories', productCategory.id);
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
                        return '/' + image.path.split('\\')
                            .slice(image.path.split('\\')
                            .indexOf('products')).join('/');
                    });
                    existingProduct.images = [...imagesPaths];
                }
                if (sizeChartImage && sizeChartImage.length > 0) {
                    const sizeChartImagePath = '/' + sizeChartImage[0].path
                        .split('\\').slice(sizeChartImage[0].path
                        .split('\\').indexOf('products')).join('/');
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
                const dbProduct = yield this.getProductById(existingProduct.id);
                const Product = {
                    id: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.id,
                    title: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.title,
                    description: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.description,
                    price: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.price,
                    quantity: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.quantity,
                    images: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.images,
                    sizeChartImage: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizeChartImage,
                    sizes: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.sizes,
                    colours: dbProduct === null || dbProduct === void 0 ? void 0 : dbProduct.colours,
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
                    include: { all: true }
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
                const folderPath = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0].split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 2));
                const imagesFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.images[0].split('/')
                    .slice(0, existingProduct.images[0].split('/').length - 1));
                const sizeChartImageFolder = (0, path_1.join)(__dirname, 'static', ...existingProduct.sizeChartImage
                    .split('/').slice(0, existingProduct.sizeChartImage.split('/').length - 1));
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
                    yield this.productRepository.findAll({ where: { sizeChartImage: filePath } }),
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
};
ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        owner_service_1.OwnerService,
        admin_service_1.AdminService,
        categories_service_1.CategoriesService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map