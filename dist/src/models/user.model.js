"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = void 0;
const client_1 = __importDefault(require("../database/client"));
const findUserById = (id) => {
    return client_1.default.user.findFirst({
        where: { id: id },
    });
};
exports.findUserById = findUserById;
