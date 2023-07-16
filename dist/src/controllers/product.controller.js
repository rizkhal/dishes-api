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
const client_1 = __importDefault(require("../database/client"));
exports.default = {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, product } = req.query;
                const filters = {};
                if (category) {
                    Object.assign(filters, {
                        category: {
                            id: Number(category),
                        },
                    });
                }
                if (product) {
                    Object.assign(filters, {
                        product: {
                            id: Number(product),
                        },
                    });
                }
                const query = yield client_1.default.product.findMany({
                    include: {
                        category: true,
                    },
                    where: filters,
                });
                return res.status(200).json({
                    data: query,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                    error: error,
                });
            }
        });
    },
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, category_id } = req.body;
            try {
                const product = yield client_1.default.product.create({
                    include: {
                        category: true,
                    },
                    data: {
                        name: name,
                        price: price,
                        categoryId: Number(category_id),
                    },
                });
                const response = {
                    message: "Prodcuct created",
                    data: product,
                };
                return res.status(200).json(response);
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                    error: error,
                });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, category_id } = req.body;
            try {
                const product = yield client_1.default.product.update({
                    where: { id: Number(id) },
                    data: {
                        name: name,
                        price: price,
                        categoryId: Number(category_id),
                    },
                });
                return res.status(200).json({
                    message: "Prodcuct updated",
                    data: product,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                    error: error,
                });
            }
        });
    },
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield client_1.default.product.delete({
                    where: {
                        id: Number(id),
                    },
                });
                return res.status(200).json({
                    message: "Product deleted",
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                    error: error,
                });
            }
        });
    },
};
