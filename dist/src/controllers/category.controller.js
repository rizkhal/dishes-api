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
                const query = yield client_1.default.category.findMany();
                res.status(200).json({
                    data: query,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                });
            }
        });
    },
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield client_1.default.category.create({
                    data: {
                        name: req.body.name,
                    },
                });
                return res.status(200).json({
                    message: "Category created",
                    data: category,
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const category = yield client_1.default.category.update({
                    where: { id: Number(id) },
                    data: {
                        name: req.body.name,
                    },
                });
                return res.status(200).json({
                    message: "Category updated",
                    data: category,
                });
            }
            catch (error) {
                return res.status(400).json({
                    message: "Bad Request",
                });
            }
        });
    },
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleteProduct = client_1.default.product.deleteMany({
                    where: {
                        categoryId: Number(id),
                    },
                });
                const deleteCategory = client_1.default.category.delete({
                    where: { id: Number(id) },
                });
                yield client_1.default.$transaction([deleteProduct, deleteCategory]);
                return res.status(200).json({
                    message: "Category deleted",
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
