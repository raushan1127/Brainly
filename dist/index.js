"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_2 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.userModel.create({
            username: username,
            password: password
        });
        res.json({
            message: "signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            message: "User already exist "
        });
    }
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const Isuser = yield db_1.userModel.findOne({
            username: username,
            password: password
        });
        if (Isuser) {
            const token = jsonwebtoken_1.default.sign({
                id: Isuser._id
            }, config_1.JWT_PASSWORD);
            res.json({
                token
            });
        }
        else {
            res.status(411).json({
                message: "Incorrect user crendentials"
            });
        }
    }
    catch (e) {
        res.json({
            message: 'Please signin first'
        });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    //@ts-ignore
    const userId = req.userId;
    yield db_2.contentModel.create({
        link: link,
        title: title,
        type: type,
        userId: userId,
        tag: []
    });
    res.json({
        message: " content added"
    });
}));
app.get('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_2.contentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content: content
    });
}));
app.get('/api/v1/brain/share', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existinglink = yield db_1.linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existinglink) {
            res.json({
                hash: existinglink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash: hash
        });
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get('/api/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.linkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "sorry incorrect input"
        });
        return;
    }
    const content = yield db_2.contentModel.find({
        userId: link.userId
    });
    const user = yield db_1.userModel.find({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found"
        });
        return;
    }
    res.json({
        username: "username",
        content: content
    });
}));
app.listen(3000);
