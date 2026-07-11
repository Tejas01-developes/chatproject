"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact_collection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contactschema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        required: true
    },
    contact_id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    added_at: {
        type: Date,
        default: Date.now()
    }
});
exports.contact_collection = mongoose_1.default.model("contacts", contactschema);
//# sourceMappingURL=contactschema.js.map