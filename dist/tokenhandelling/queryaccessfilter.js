"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryaccessfilter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const queryaccessfilter = (req, resp) => {
    const token = req.headers.authorization;
    const access = token?.split(" ")?.[1];
    if (!access) {
        return {
            userId: null
        };
    }
    try {
        const decode = jsonwebtoken_1.default.verify(access, process.env.ACCESS_KEY);
        return {
            userId: decode.id
        };
    }
    catch (err) {
        console.log(err);
        return {
            userId: null
        };
    }
};
exports.queryaccessfilter = queryaccessfilter;
//# sourceMappingURL=queryaccessfilter.js.map