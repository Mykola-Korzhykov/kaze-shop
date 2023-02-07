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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const roles_service_1 = require("../../roles/roles.service");
const user_constants_1 = require("../constants/user.constants");
const user_model_1 = require("../models/user.model");
const bcrypt = __importStar(require("bcrypt"));
const api_exception_1 = require("../../common/exceptions/api.exception");
let UsersService = class UsersService {
    constructor(userRepository, roleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }
    findUser(v, page, userPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = v.map((param) => {
                return param.toLowerCase();
            });
            const dbUsers = yield this.userRepository.findAll({
                include: { all: true },
                offset: (page - 1) * userPerPage,
                limit: userPerPage,
                attributes: [
                    'id',
                    'name',
                    'surname',
                    'email',
                    'phoneNumber',
                    'isAdmin',
                    'addContent',
                    'editContent',
                    'editWebsite',
                ],
            });
            if (dbUsers.length === 0) {
                return [];
            }
            const users = [];
            dbUsers.forEach((user) => {
                const dbArray = [];
                for (const key in user) {
                    dbArray.push(user[key]);
                }
                const isContained = params.some((param) => dbArray.indexOf(param) >= 0);
                if (isContained) {
                    users.push(user);
                }
            });
            return users;
        });
    }
    initializeUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [email, phoneNumber] = yield Promise.all([
                yield this.getUserByEmail(userDto.email),
                yield this.getUserByPhoneNumber(userDto.phoneNumber),
            ]);
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_EXIST);
            }
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_PHONENUMBER_EXIST);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(userDto.password, salt);
            const user = yield this.createUser(Object.assign(Object.assign({}, userDto), { password: hashedPassword }));
            return user.save();
        });
    }
    updateUser(userDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            user.setName(userDto.name);
            user.setSurname(userDto.surname);
            user.setCity(userDto.city);
            user.setCountry(userDto.country);
            user.setPostOffice(userDto.postOffice);
            return user.save();
        });
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create(dto);
            user.setIsActivated(false);
            user.setIsAdmin(false);
            user.setAddContent(false);
            user.setEditWebsite(false);
            user.setEditContent(false);
            const role = yield this.roleService.getRoleByValue('USER');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'USER',
                    description: 'simple user',
                });
                yield user.$set('roles', userRole.id);
                user.roles = [role];
                yield user.save();
                return user;
            }
            yield user.$set('roles', role.id);
            user.roles = [role];
            yield user.save();
            return user;
        });
    }
    getAllUsers(page, userPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll({
                include: { all: true },
                offset: (page - 1) * userPerPage,
                limit: userPerPage,
            });
            if (users.length === 0) {
                return [];
            }
            return users.map((user) => {
                return {
                    id: user.id,
                    name: user.getName(),
                    surname: user.getSurname(),
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    isAdmin: user.getIsAdmin(),
                    addContent: user.getAddContent(),
                    editContent: user.getEditContent(),
                    editWebsite: user.getEditWebSite(),
                };
            });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(id, {
                include: { all: true },
            });
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return user;
        });
    }
    getUserByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return user;
        });
    }
    addRole(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user, role] = yield Promise.all([
                yield this.userRepository.findByPk(dto.userId),
                yield this.roleService.getRoleByValue(dto.value),
            ]);
            if (role && user) {
                yield user.$add('role', role.id);
                return dto;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_OR_ROLE_NOT_FOUND);
        });
    }
    banUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByPk(dto.userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            user.banned = true;
            user.banReason = dto.banReason;
            yield user.save();
            return user;
        });
    }
    validateUser(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(userDto.email);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.USER_WITH_EMAIL_DOESNT_EXIST);
            }
            console.log('not done');
            const passwordEquals = yield bcrypt.compare(userDto.password, user.getPassword());
            console.log('done');
            if (passwordEquals) {
                return user;
            }
            throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', user_constants_1.INVALID_EMAIL_OR_PASSWORD);
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(codeDto.email);
            user.setConfirmCode(code);
            user.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield user.save();
            return user.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserByEmail(resetDto.email);
            if (resetDto.email !== user.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= user.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== user.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', user_constants_1.INVALID_CODE);
            }
            yield this.rewritePassword(user.id, resetDto.password);
            return user.email;
        });
    }
    changePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            return this.rewritePassword(user.id, password);
        });
    }
    rewritePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUserById(userId);
            if (!user) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', user_constants_1.USER_NOT_FOUND);
            }
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            user.setNewPasssword(hashedPassword);
            return user.save();
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object, roles_service_1.RolesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map