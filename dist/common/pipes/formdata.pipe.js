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
exports.ParseFormDataJsonPipe = void 0;
const deep_parse_json_1 = require("deep-parse-json");
const _ = __importStar(require("lodash"));
class ParseFormDataJsonPipe {
    constructor(options) {
        this.options = options;
    }
    transform(value, _metadata) {
        const { except } = this.options;
        const serializedValue = value;
        const originProperties = {};
        if (except === null || except === void 0 ? void 0 : except.length) {
            _.merge(originProperties, _.pick(serializedValue, ...except));
        }
        const deserializedValue = (0, deep_parse_json_1.deepParseJson)(value);
        console.log(`deserializedValue`, deserializedValue);
        return Object.assign(Object.assign({}, deserializedValue), originProperties);
    }
}
exports.ParseFormDataJsonPipe = ParseFormDataJsonPipe;
//# sourceMappingURL=formdata.pipe.js.map