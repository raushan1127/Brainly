"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    const header = req.headers['authorization'];
    //@ts-ignore
    const decoded = jsonwebtoken_1.Jwt.verify(header, config_1.JWT_PASSWORD);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded._id;
        next();
    }
    else {
        res.json({
            message: "you are not loggedin"
        });
    }
};
exports.userMiddleware = userMiddleware;
