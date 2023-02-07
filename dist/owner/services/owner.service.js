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
exports.OwnerService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const owner_constants_1 = require("../constants/owner.constants");
const owner_model_1 = require("../models/owner.model");
const roles_service_1 = require("../../roles/roles.service");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const roles_model_1 = require("../../roles/models/roles.model");
const api_exception_1 = require("../../common/exceptions/api.exception");
let OwnerService = class OwnerService {
    constructor(ownerRepository, roleService) {
        this.ownerRepository = ownerRepository;
        this.roleService = roleService;
    }
    static creatingOwner(OWNER) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingOwners = yield owner_model_1.Owner.findAll();
            console.log(existingOwners);
            if (existingOwners.length > 0) {
                return;
            }
            console.log('Creating');
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS || 10);
            const hashedPassword = yield bcrypt.hash(OWNER[4], salt);
            const ownerDto = {
                name: OWNER[0],
                surname: OWNER[1],
                phoneNumber: OWNER[2],
                email: OWNER[3],
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
    validateOwner(ownerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const owner = yield this.getOwnerByEmail(ownerDto.email);
            if (!owner) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(ownerDto.password, owner.getPassword());
            if (passwordEquals) {
                return owner;
            }
            return false;
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
};
OwnerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(owner_model_1.Owner)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], OwnerService);
exports.OwnerService = OwnerService;
//# sourceMappingURL=owner.service.js.map