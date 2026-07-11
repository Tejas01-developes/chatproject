"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshfilter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatetoken_1 = require("./generatetoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface customreq extends Request{
//     id?:string
// }
const refreshfilter = (req, resp) => {
    const token = req.cookies.refresh;
    if (!token) {
        return resp.status(400).send({ success: false, message: "refresh token is not there" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.REFRESH_KEY);
        const id = decode.id;
        if (!id) {
            return resp.status(400).send({ success: false, message: "userid is not decoded" });
        }
        const access = (0, generatetoken_1.accesstoken)(id);
        return resp.status(200).send({ success: true, access, id });
    }
    catch (err) {
        return resp.status(400).send({ success: false, message: "refresh filter failed" });
    }
};
exports.refreshfilter = refreshfilter;
//# sourceMappingURL=refreshfilter.js.map