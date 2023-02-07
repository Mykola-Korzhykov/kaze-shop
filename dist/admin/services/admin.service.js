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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = __importStar(require("bcrypt"));
const admin_constants_1 = require("../constants/admin.constants");
const admin_model_1 = require("../models/admin.model");
const users_service_1 = require("../../users/services/users.service");
const roles_service_1 = require("../../roles/roles.service");
const api_exception_1 = require("../../common/exceptions/api.exception");
let AdminService = class AdminService {
    constructor(adminRepository, userService, roleService) {
        this.adminRepository = adminRepository;
        this.userService = userService;
        this.roleService = roleService;
    }
    findAdmin(v, page, adminPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = v.map((param) => {
                return param.toLowerCase();
            });
            const dbAdmins = yield this.adminRepository.findAll({
                include: { all: true },
                offset: (page - 1) * adminPerPage,
                limit: adminPerPage,
                attributes: [
                    'id',
                    'name',
                    'surname',
                    'email',
                    'phoneNumber',
                    'userId',
                    'addContent',
                    'editContent',
                    'editWebsite',
                ],
            });
            if (dbAdmins.length === 0) {
                return [];
            }
            const admins = [];
            dbAdmins.forEach((admin) => {
                const dbArray = [];
                for (const key in admin) {
                    dbArray.push(admin[key]);
                }
                const isContained = params.some((param) => dbArray.indexOf(param) >= 0);
                if (isContained) {
                    admins.push(admin);
                }
            });
            return admins;
        });
    }
    createAdmin(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(dto.email);
            if (!dto.isAdmin) {
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                return JSON.parse(JSON.stringify(user));
            }
            if (user.getIsAdmin()) {
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                const admin = yield this.getAdminByEmail(dto.email);
                admin.setAddContent(dto.addContent);
                admin.setEditContent(dto.editWebSite);
                admin.setEditWebsite(dto.editWebSite);
                yield admin.save();
                return JSON.parse(JSON.stringify(admin));
            }
            const [phoneNumber, email] = yield Promise.all([
                yield this.getAdminByPhoneNumber(dto.phoneNumber),
                yield this.getAdminByEmail(dto.email),
            ]);
            if (phoneNumber) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_PHONENUMBER_EXIST);
            }
            if (email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.ADMIN_WITH_EMAIL_EXIST);
            }
            const [admin] = yield Promise.all([yield this.adminRepository.create(dto)]);
            const role = yield this.roleService.getRoleByValue('ADMIN');
            if (!role) {
                const userRole = yield this.roleService.createRole({
                    value: 'ADMIN',
                    description: 'User with rights',
                });
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                yield user.save();
                admin.setIsActivated(user.getIsActivated());
                admin.userId = user.id;
                yield admin.$set('roles', userRole.id);
                admin.roles = [role];
                yield admin.save();
                return JSON.parse(JSON.stringify(admin));
            }
            user.setIsAdmin(dto.isAdmin);
            user.setAddContent(dto.addContent);
            user.setEditContent(dto.editContent);
            user.setEditWebsite(dto.editWebSite);
            yield user.save();
            admin.setIsActivated(user.getIsActivated());
            yield admin.$set('roles', role.id);
            admin.roles = [role];
            admin.userId = user.id;
            yield admin.save();
            return JSON.parse(JSON.stringify(admin));
        });
    }
    updateAdmin(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const [admin, user] = yield Promise.all([
                yield this.getAdminByEmail(dto.email),
                yield this.userService.getUserByEmail(dto.email),
            ]);
            if (dto.isAdmin) {
                user.setIsAdmin(dto.isAdmin);
                user.setAddContent(dto.addContent);
                user.setEditContent(dto.editContent);
                user.setEditWebsite(dto.editWebSite);
                admin.userId = user.id;
                admin.setAddContent(dto.addContent);
                admin.setEditContent(dto.editContent);
                admin.setEditWebsite(dto.editWebSite);
                yield Promise.all([yield user.save(), yield admin.save()]);
                return JSON.parse(JSON.stringify(admin));
            }
            user.setIsAdmin(dto.isAdmin);
            user.setAddContent(dto.addContent);
            user.setEditContent(dto.editContent);
            user.setEditWebsite(dto.editWebSite);
            const [deletedAdmin] = yield Promise.all([
                yield this.adminRepository.destroy({
                    where: {
                        userId: user.id,
                        email: dto.email,
                        phoneNumber: dto.phoneNumber,
                    },
                }),
                yield user.save(),
            ]);
            return deletedAdmin;
        });
    }
    findByActivationLink(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = this.adminRepository.findOne({
                where: { activationLink: activationLink },
            });
            if (!admin) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_LINK);
            }
            return admin;
        });
    }
    getAllAdmins(page, adminPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield this.adminRepository.findAll({
                include: { all: true },
                offset: (page - 1) * adminPerPage,
                limit: adminPerPage,
            });
            if (admins.length === 0) {
                return [];
            }
            return admins.map((admin) => {
                return {
                    id: admin.id,
                    name: admin.getName(),
                    surname: admin.getSurname(),
                    email: admin.email,
                    phoneNumber: admin.phoneNumber,
                    userId: admin.userId,
                    addContent: admin.getAddContent(),
                    editContent: admin.getEditContent(),
                    editWebsite: admin.getEditWebSite(),
                };
            });
        });
    }
    getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findByPk(id, {
                include: { all: true },
            });
            if (!admin) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.NOT_FOUND, 'Not found!', admin_constants_1.ADMIN_NOT_FOUND);
            }
            return admin;
        });
    }
    getAdminByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findOne({
                where: { email: email },
                include: { all: true },
            });
            return admin;
        });
    }
    checkAdmin(payload, activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!activationLink) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.UNAUTHORIZED, 'Unathorized!', admin_constants_1.ADMIN_ID_NOT_PROVIDED);
            }
            const admin = yield this.getAdminById(payload.userId);
            if (!admin.getIsActivated()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.FORBIDDEN, 'Forbidden!', admin_constants_1.NOT_ACTIVATED);
            }
            if (admin.activationLink === activationLink &&
                payload.userActivationLink === activationLink) {
                return true;
            }
            return false;
        });
    }
    getAdminByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.adminRepository.findOne({
                where: { phoneNumber: phoneNumber },
                include: { all: true },
            });
            return admin;
        });
    }
    validateAdmin(adminDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(adminDto.email);
            if (!admin) {
                return false;
            }
            const passwordEquals = yield bcrypt.compare(adminDto.password, admin.getPassword());
            if (passwordEquals) {
                return admin;
            }
            return false;
        });
    }
    setConfirmCode(codeDto, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(codeDto.email);
            admin.setConfirmCode(code);
            admin.setResetTokenExpiration(Number(Date.now() + 3600000));
            yield admin.save();
            return admin.email;
        });
    }
    resetPassword(resetDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminByEmail(resetDto.email);
            if (resetDto.email !== admin.email) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_EMAIL);
            }
            if (Number(Date.now()) >= admin.getResetTokenExpiration()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.RESET_TIME_EXPIRED);
            }
            if (Number(resetDto.code) !== admin.getConfirmCode()) {
                throw new api_exception_1.ApiException(common_1.HttpStatus.BAD_REQUEST, 'Bad request', admin_constants_1.INVALID_CODE);
            }
            yield this.userService.rewritePassword(admin.userId, resetDto.password);
            yield this.rewritePassword(admin, resetDto.password);
            return admin.email;
        });
    }
    changePassword(adminId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.getAdminById(adminId);
            yield this.userService.rewritePassword(admin.userId, password);
            return this.rewritePassword(admin, password);
        });
    }
    rewritePassword(admin, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
            const salt = yield bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = yield bcrypt.hash(password, salt);
            admin.setNewPasssword(hashedPassword);
            return admin.save();
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, sequelize_1.InjectModel)(admin_model_1.Admin)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService,
        roles_service_1.RolesService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map