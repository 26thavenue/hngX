"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
