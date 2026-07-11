"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshtoken = exports.accesstoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accesstoken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.ACCESS_KEY, { expiresIn: "15m" });
};
exports.accesstoken = accesstoken;
const refreshtoken = (id) => {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.REFRESH_KEY, { expiresIn: "7d" });
};
exports.refreshtoken = refreshtoken;
//# sourceMappingURL=generatetoken.js.map