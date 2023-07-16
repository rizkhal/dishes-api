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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_validator_1 = require("express-validator");
const product_model_1 = require("../models/product.model");
const prisma = new client_1.PrismaClient();
const store = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
const isExists = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield prisma.category.findFirst({
        where: {
            id: Number(value),
        },
    });
    if (exists)
        return true;
    throw Error("Category does't exists");
});
const unique = (value, req) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, product_model_1.findByName)(value).then((product) => {
        var _a;
        if (product && ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id) != product.id) {
            throw new Error(`Product name ${value} already taken.`);
        }
    });
});
exports.default = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .escape()
        .custom((value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
        return unique(value, req);
    })),
    (0, express_validator_1.body)("price").isNumeric().notEmpty(),
    (0, express_validator_1.body)("category_id")
        .notEmpty()
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        return isExists(value);
    })),
    store,
];
