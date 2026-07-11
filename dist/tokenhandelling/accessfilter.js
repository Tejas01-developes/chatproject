"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessfilter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const accessfilter = (req, resp, next) => {
    const token = req.headers.authorization;
    const access = token?.split(" ")?.[1];
    if (!access) {
        return resp.status(400).send({ success: false, message: "access token is not there" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(access, process.env.ACCESS_KEY);
        req.userId = decode.id;
        console.log(req.userId);
        next();
    }
    catch (err) {
        console.log(err);
        return resp.status(400).send({ success: false, message: "access filter failed" });
    }
};
exports.accessfilter = accessfilter;
//# sourceMappingURL=accessfilter.js.map