"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ");
    if (!token) {
        return res.status(403).json({
            message: "Authorization token is required for authentication",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token[1], process.env.JWT_TOKEN);
        console.log(decoded);
    }
    catch (err) {
        return res.status(401).json({
            message: "Authorization token is invalid",
        });
    }
    next();
};
