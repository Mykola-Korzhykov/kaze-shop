"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 136:
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoriesService = void 0;
const common_1 = __webpack_require__(7);
const interfaces_1 = __webpack_require__(137);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const category_colour_constants_1 = __webpack_require__(138);
const category_model_1 = __webpack_require__(43);
let CategoriesService = class CategoriesService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    setCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.bulkCreate([{}]);
            return categories;
        });
    }
    getCategoryByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findOne({
                where: { ua: value },
            });
            if (!category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategoriesByIds(categoryIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findAll({
                where: {
                    id: categoryIds,
                },
            });
            if (category.length === 0 || !category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findByPk(categoryId);
            if (!category) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            return category;
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryRepository.findAll();
            return categories.map((category) => {
                return {
                    id: category.id,
                    ua: category.ua,
                    en: category.en,
                    rs: category.rs,
                    ru: category.ru,
                    type: 'category',
                    createdAt: category.createdAt,
                    updatedAt: category.updatedAt,
                };
            });
        });
    }
    createCategory(categoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findOne({
                where: {
                    ua: categoryDto.ua,
                    en: categoryDto.en,
                    rs: categoryDto.rs,
                    ru: categoryDto.ru,
                },
            });
            if (isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', category_colour_constants_1.ALREADY_EXIST_CATEGORY);
            }
            const category = yield this.categoryRepository.create(Object.assign({}, categoryDto));
            return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            };
        });
    }
    deleteCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findByPk(categoryId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            const deleted = yield this.categoryRepository.destroy({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return deleted;
        });
    }
    updateCategory(categoryId, updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.categoryRepository.findByPk(categoryId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_CATEGORY);
            }
            isExist.ua = updateDto.ua;
            isExist.ru = updateDto.ru;
            isExist.rs = updateDto.rs;
            isExist.en = updateDto.en;
            yield isExist.save();
            const category = yield this.categoryRepository.findOne({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
            };
        });
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(category_model_1.Category)),
    __metadata("design:paramtypes", [Object])
], CategoriesService);
exports.CategoriesService = CategoriesService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bf250aa11cb746d7a353")
/******/ })();
/******/ 
/******/ }
;