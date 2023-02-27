"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 139:
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
exports.ColoursService = void 0;
const common_1 = __webpack_require__(7);
const interfaces_1 = __webpack_require__(137);
const sequelize_1 = __webpack_require__(8);
const api_exception_1 = __webpack_require__(52);
const category_colour_constants_1 = __webpack_require__(138);
const colours_model_1 = __webpack_require__(34);
let ColoursService = class ColoursService {
    constructor(colourRepository) {
        this.colourRepository = colourRepository;
    }
    setColours() {
        return __awaiter(this, void 0, void 0, function* () {
            const colours = yield this.colourRepository.bulkCreate([{}]);
            return colours;
        });
    }
    getColourByValue(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findOne({
                where: { ua: value },
            });
            if (!colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColoursByIds(colourIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findAll({
                where: {
                    id: colourIds,
                },
            });
            if (colour.length === 0 || !colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColourById(colourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const colour = yield this.colourRepository.findByPk(colourId);
            if (!colour) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            return colour;
        });
    }
    getColours() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.colourRepository.findAll();
            return categories.map((colour) => {
                return {
                    id: colour.id,
                    ua: colour.ua,
                    en: colour.en,
                    rs: colour.rs,
                    ru: colour.ru,
                    hex: colour.hex,
                    type: 'colour',
                    createdAt: colour.createdAt,
                    updatedAt: colour.updatedAt,
                };
            });
        });
    }
    createColour(colourDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findOne({
                where: {
                    ua: colourDto.ua,
                    en: colourDto.en,
                    rs: colourDto.rs,
                    ru: colourDto.ru,
                    hex: colourDto.hex,
                },
            });
            if (isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', category_colour_constants_1.ALREADY_EXIST_COLOUR);
            }
            const colour = yield this.colourRepository.create(Object.assign({}, colourDto));
            return {
                id: colour.id,
                ua: colour.ua,
                en: colour.en,
                rs: colour.rs,
                ru: colour.ru,
                hex: colour.hex,
                type: 'colour',
                createdAt: colour.createdAt,
                updatedAt: colour.updatedAt,
            };
        });
    }
    deleteColour(colourId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findByPk(colourId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            const deleted = yield this.colourRepository.destroy({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                    hex: isExist.hex,
                },
            });
            return deleted;
        });
    }
    updateColour(colourId, updateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.colourRepository.findByPk(colourId);
            if (!isExist) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', category_colour_constants_1.NOT_FOUND_COLOUR);
            }
            isExist.ua = updateDto.ua;
            isExist.ru = updateDto.ru;
            isExist.rs = updateDto.rs;
            isExist.en = updateDto.en;
            isExist.hex = updateDto.hex;
            yield isExist.save();
            const colour = yield this.colourRepository.findOne({
                where: {
                    id: isExist.id,
                    ua: isExist.ua,
                    en: isExist.en,
                    rs: isExist.rs,
                    ru: isExist.ru,
                },
            });
            return {
                id: colour.id,
                ua: colour.ua,
                en: colour.en,
                rs: colour.rs,
                ru: colour.ru,
                hex: colour.hex,
                type: 'colour',
                createdAt: colour.createdAt,
                updatedAt: colour.updatedAt,
            };
        });
    }
};
ColoursService = __decorate([
    (0, common_1.Injectable)({ scope: interfaces_1.Scope.REQUEST }),
    __param(0, (0, sequelize_1.InjectModel)(colours_model_1.Colour)),
    __metadata("design:paramtypes", [Object])
], ColoursService);
exports.ColoursService = ColoursService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("90ed9baa34a70cf64d09")
/******/ })();
/******/ 
/******/ }
;