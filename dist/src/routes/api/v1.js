"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// middlewares
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
// controllers
const category_controller_1 = __importDefault(require("../../controllers/category.controller"));
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const product_validator_1 = __importDefault(require("../../validators/product.validator"));
// validators
const categaory_validator_1 = __importDefault(require("../../validators/categaory.validator"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
// products
router.get("/products", product_controller_1.default.index);
router.post("/products", product_validator_1.default, product_controller_1.default.store);
router.put("/products/:id", product_validator_1.default, product_controller_1.default.update);
router.delete("/products/:id", product_controller_1.default.destroy);
// categories
router.get("/categories", category_controller_1.default.index);
router.post("/categories", categaory_validator_1.default.validate, category_controller_1.default.store);
router.put("/categories/:id", categaory_validator_1.default.validate, category_controller_1.default.update);
router.delete("/categories/:id", category_controller_1.default.destroy);
exports.default = router;
