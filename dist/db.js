"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.userModel = exports.linkModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
mongoose_2.default.connect("mongodb+srv://kumarraushan2615:Raushan8100.@cluster0.zuwxq.mongodb.net/Brainly");
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: String
});
const contentSchema = new mongoose_1.Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose_2.default.Types.ObjectId, ref: 'Tag' }],
    userId: [{ type: mongoose_2.default.Types.ObjectId, ref: 'user', required: true }]
});
const LinkSchema = new mongoose_1.Schema({
    hash: String,
    userId: { type: mongoose_2.default.Types.ObjectId, ref: 'user', required: true }
});
exports.linkModel = (0, mongoose_1.model)("links", LinkSchema);
exports.userModel = (0, mongoose_1.model)("user", userSchema);
exports.contentModel = (0, mongoose_1.model)('content', contentSchema);
