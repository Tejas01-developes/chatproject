"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message_collection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messageschema = new mongoose_1.default.Schema({
    message_id: {
        type: String,
        unique: true,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    send_at: {
        type: Date,
        default: Date.now()
    }
});
exports.message_collection = mongoose_1.default.model("messages", messageschema);
//# sourceMappingURL=messageschema.js.map