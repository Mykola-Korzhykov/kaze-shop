"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 60:
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
var OwnerService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OwnerService = void 0;
const common_1 = __webpack_require__(7);
const sequelize_1 = __webpack_require__(8);
const owner_constants_1 = __webpack_require__(54);
const owner_model_1 = __webpack_require__(31);
const roles_service_1 = __webpack_require__(25);
const bcrypt = __importStar(__webpack_require__(51));
const uuid_1 = __webpack_require__(61);
const roles_model_1 = __webpack_require__(26);
const api_exception_1 = __webpack_require__(52);
const schedule_1 = __webpack_require__(62);
const currency_service_1 = __webpack_require__(63);
const cart_model_1 = __webpack_require__(36);
const cart_constants_1 = __webpack_require__(58);
let OwnerService = OwnerService_1 = class OwnerService {
    constructor(schedulerRegistry, currencyService, cartRepository, ownerRepository, roleService) {
        this.schedulerRegistry = schedulerRegistry;
        this.currencyService = currencyService;
        this.cartRepository = cartRepository;
        this.ownerRepository = ownerRepository;
        this.roleService = roleService;
        this.Logger = new common_1.Logger(OwnerService_1.name);
    }
    setUp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Logger.warn(`time (${1}) second for job setting-up to run!`);
            const owner = yield OwnerService_1.creatingOwner({
                name: process.env.OWNER.toString().trim().split(',')[0],
                surname: process.env.OWNER.toString().trim().split(',')[1],
                phoneNumber: process.env.OWNER.toString().trim().split(',')[2],
                email: process.env.OWNER.toString().trim().split(',')[3],
                password: process.env.OWNER.toString().trim().split(',')[4],
            });
            if (owner) {
                return this.currencyService.setCurrencies(owner.id);
            }
            return this.deleteCron('setting-up');
        });
    }
    deleteCron(name) {
        this.schedulerRegistry.deleteCronJob(name);
        this.Logger.warn(`job ${name} deleted!`);
        return;
    }
    static creatingOwner(OWNER) {
        return __awaiter(this, void 0, void 0, function* () {
            const [phoneNumber, email] = yield Promise.all([
                yield owner_model_1.Owner.findOne({
                    where: { phoneNumber: OWNER.phoneNumber },
                    include: { all: true },
                }),
                yield owner_model_1.Owner.findOne({
                    where: { email: OWNER.email },
                    include: { all: true },
                }),
            ]);
            if (phoneNumber || email) {
                return false;
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS || 10);
            const hashedPassword = yield bcrypt.hash(OWNER.password, salt);
            const ownerDto = {
                name: OWNER.name,
                surname: OWNER.surname,
                phoneNumber: OWNER.phoneNumber,
                email: OWNER.email,
                password: hashedPassword,
                activationLink: (0, uuid_1.v4)(),
            };
            const owner = yield owner_model_1.Owner.create(ownerDto);
            owner.setIsActivated(false);
            const role = yield roles_model_1.Role.findOne({ where: { value: 'OWNER' } });
            if (!role) {
                const ownerRole = yield roles_model_1.Role.create({
                    value: 'OWNER',
                    description: 'Owner owns website',
                });
                yield owner.$set('roles', ownerRole.id);
                owner.roles = [ownerRole];
                yield owner.save();
                return owner;
            }
            yield owner.$set('roles', role.id);
            owner.roles = [role];
            yield owner.save();
            return owner;
        });
    }
    createOwner(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [phoneNumber, email] = yield Promise.all([
                yield this.getOwnerByPhoneNumber(dto.phoneNumber),
                yield this.getOwnerByEmail(dto.email),
            ]);
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_PHONENUMBER_EXIST);
            }
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.OWNER_WITH_EMAIL_EXIST);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(dto.password, salt);
            const owner = yield this.create(Object.assign(Object.assign({}, dto), { password: hashedPassword, activationLink: (0, uuid_1.v4)() }));
            return owner.save();
        });
    }
    create(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.create(dto);
            owner.setIsActivated(false);
            const role = yield this.roleService.getRoleByValue('OWNER');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'OWNER',
                    description: 'Owner owns website',
                });
                yield owner.$set('roles', userRole.id);
                owner.roles = [userRole];
                yield owner.save();
                return owner;
            }
            yield owner.$set('roles', role.id);
            owner.roles = [role];
            yield owner.save();
            return owner;
        });
    }
    findByActivationLink(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = this.ownerRepository.findOne({
                where: { activationLink: activationLink },
            });
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_LINK);
            }
            return owner;
        });
    }
    getOwnerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findByPk(id, {
                include: { all: true },
            });
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
            }
            return owner;
        });
    }
    getOwnerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return owner;
        });
    }
    getOwnerByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.ownerRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return owner;
        });
    }
    validateOwner(ownerDto, cartIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(ownerDto.email);
            if (!owner) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(ownerDto.password, owner.getPassword());
            if (!passwordEquals) {
                return false;
            }
            if (!owner.cart) {
                const newCart = yield this.createCart(cartIdentifier);
                owner.$set('cart', newCart);
                newCart.ownerId = owner.id;
                owner.cart = newCart;
                yield newCart.save();
            }
            const cart = yield this.findCartByIdentifier(cartIdentifier);
            if (cart && cart.cartProducts.length > 0) {
                cart.ownerId = owner.id;
                cart.set('owner', owner);
                owner.$add('leftCarts', cart);
                yield cart.save();
            }
            yield owner.save();
            return owner;
        });
    }
    checkOwner(payload, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!activationLink) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', owner_constants_1.OWNER_ID_NOT_PROVIDED);
            }
            const owner = yield this.getOwnerById(payload.userId);
            if (owner instanceof owner_model_1.Owner && !owner.getIsActivated()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.NOT_ACTIVATED);
            }
            if (owner instanceof owner_model_1.Owner && owner.activationLink === activationLink) {
                return true;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', owner_constants_1.ACCESS_DENIED);
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(codeDto.email);
            owner.setConfirmCode(code);
            owner.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield owner.save();
            return owner.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(resetDto.email);
            if (resetDto.email !== owner.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= owner.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== owner.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', owner_constants_1.INVALID_CODE);
            }
            yield this.rewritePassword(owner, resetDto.password);
            return owner.email;
        });
    }
    changePassword(ownerId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerById(ownerId);
            if (!owner) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', owner_constants_1.OWNER_NOT_FOUND);
            }
            return this.rewritePassword(owner, password);
        });
    }
    rewritePassword(owner, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            owner.setNewPasssword(hashedPassword);
            return owner.save();
        });
    }
    createCart(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.create({
                cartStatus: 'Open',
                totalPrice: 0,
                products: [],
                cartProducts: [],
                identifier: identifier,
            });
            return cart;
        });
    }
    findCartByIdentifier(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.cartRepository.findOne({
                where: {
                    identifier: identifier,
                },
                include: {
                    all: true,
                },
            });
            if (!cart) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', cart_constants_1.CART_NOT_FOUND);
            }
            return cart;
        });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS, {
        name: 'setting-up',
        unrefTimeout: true,
        utcOffset: 1,
        disabled: true,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OwnerService.prototype, "setUp", null);
OwnerService = OwnerService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(2, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __param(3, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [typeof (_a = typeof schedule_1.SchedulerRegistry !== "undefined" && schedule_1.SchedulerRegistry) === "function" ? _a : Object, typeof (_b = typeof currency_service_1.CurrencyService !== "undefined" && currency_service_1.CurrencyService) === "function" ? _b : Object, Object, Object, typeof (_c = typeof roles_service_1.RolesService !== "undefined" && roles_service_1.RolesService) === "function" ? _c : Object])
], OwnerService);
exports.OwnerService = OwnerService;


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("84ae2a9a36662effe464")
/******/ })();
/******/ 
/******/ }
;