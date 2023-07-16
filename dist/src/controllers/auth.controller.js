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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = __importDefault(require("../database/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const tokenLists = {};
exports.default = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                if (!(username && password)) {
                    return res.status(400).json({
                        message: "All input is required",
                    });
                }
                const user = yield client_1.default.user.findFirst({
                    where: {
                        username: username,
                    },
                });
                if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
                    const token = jsonwebtoken_1.default.sign({ userId: user.id, username }, process.env.JWT_TOKEN, {
                        expiresIn: process.env.JWT_TOKEN_EXPIRED_AT,
                    });
                    const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, username }, process.env.JWT_REFRESH_TOKEN, {
                        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_AT,
                    });
                    tokenLists[refreshToken] = {
                        expiredIn: 604800000,
                        refreshToken: refreshToken,
                    };
                    return res.status(200).json({
                        user: {
                            id: user.id,
                            username: user.username,
                        },
                        token: {
                            expiresIn: process.env.JWT_TOKEN_EXPIRED_AT,
                            accessToken: token,
                            refreshToken: refreshToken,
                        },
                    });
                }
                return res.status(400).json({
                    message: "Invalid Credentials",
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            if (data.refreshToken && data.refreshToken in tokenLists) {
                const decoded = jsonwebtoken_1.default.verify(data.refreshToken, process.env.JWT_REFRESH_TOKEN);
                const user = yield (0, user_model_1.findUserById)(decoded.userId);
                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }
                const credentials = {
                    username: user.username,
                    password: user.password,
                };
                const token = jsonwebtoken_1.default.sign(credentials, process.env.JWT_TOKEN, { expiresIn: process.env.JWT_TOKEN_EXPIRED_AT });
                const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, process.env.JWT_REFRESH_TOKEN, {
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_AT,
                });
                return res.status(200).json({
                    user: {
                        id: user.id,
                        username: user.username,
                    },
                    token: {
                        expiresIn: process.env.JWT_TOKEN_EXPIRED_AT,
                        accessToken: token,
                        refreshToken: refreshToken,
                    },
                });
            }
            return res.status(400).json({
                message: "Bad Request",
                error: "Invalid Refresh Token",
            });
        });
    },
};
