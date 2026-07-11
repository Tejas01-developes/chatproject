"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const refreshschema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userid: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    added_at: {
        type: Date,
        default: Date.now()
    },
    expired_at: {
        type: Date,
        required: true
    }
});
const refresh_collection = mongoose_1.default.model("refresh", refreshschema);
exports.default = refresh_collection;
//# sourceMappingURL=refreshschema.js.map