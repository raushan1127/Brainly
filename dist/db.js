"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect('mongodb+srv://kumarraushan2615:Raushan8100.@cluster0.zuwxq.mongodb.net/');
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
