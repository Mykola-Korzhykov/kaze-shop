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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const uuid = __importStar(require("uuid"));
const path_1 = __importStar(require("path"));
const fs_1 = require("fs");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    createFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = uuid.v4() + '.jpg';
                const filePath = path_1.default.resolve(__dirname, '..', 'static');
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }
                fs.writeFileSync(path_1.default.join(filePath, fileName), file.buffer);
                return { fileName: fileName, filePath: filePath };
            }
            catch (e) {
                throw new common_1.HttpException('Error occured while writing file.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    unlinkFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            filePath = path_1.default.join(__dirname, 'static', filePath);
            fs.unlink(filePath, (err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            });
        });
    }
    createfileName(req, file, callback) {
        const name = file.originalname.split('.')[0];
        const ext = (0, path_1.extname)(file.originalname);
        const randomName = (0, uuid_1.v4)();
        callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
    }
    fileFilter(req, file, callback) {
        const filetypes = /\.(jpg|jpeg|png|gif)$/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return callback(null, true);
        }
        return callback(new Error('Only image files are allowed!'), false);
    }
    destination(req, file, callback) {
        var _a, _b;
        const destination = path_1.default.join(__dirname, 'static', 'products', `${(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title}`);
        const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${(_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.title}`, file.fieldname);
        if (!(0, fs_1.existsSync)(destination)) {
            (0, fs_1.mkdirSync)(destination, { recursive: true });
        }
        if (!(0, fs_1.existsSync)(imagesPath)) {
            (0, fs_1.mkdirSync)(imagesPath, { recursive: true });
        }
        callback(null, imagesPath);
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT })
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=file.service.js.map