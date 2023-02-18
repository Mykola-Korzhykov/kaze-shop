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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destination = exports.fileFilter = exports.fileName = void 0;
const path_1 = __importStar(require("path"));
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const fileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const ext = (0, path_1.extname)(file.originalname);
    const randomName = (0, uuid_1.v4)();
    callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
};
exports.fileName = fileName;
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    const filetypes = /\.(jpg|jpeg|png|gif)$/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return callback(null, true);
    }
    return callback(new Error('Only image files are allowed!'), false);
};
exports.fileFilter = fileFilter;
const destination = (req, file, callback) => {
    try {
        const destination = path_1.default.join(__dirname, 'static', 'products', `${req.body.title}`);
        const imagesPath = path_1.default.join(__dirname, 'static', 'products', `${req.body.title}`, file.fieldname);
        if (!(0, fs_1.existsSync)(destination)) {
            (0, fs_1.mkdirSync)(destination);
        }
        if (!(0, fs_1.existsSync)(imagesPath)) {
            (0, fs_1.mkdirSync)(imagesPath);
        }
        callback(null, imagesPath);
    }
    catch (err) {
        throw err;
    }
};
exports.destination = destination;
//# sourceMappingURL=file-upload.config.js.map