"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// routes
const v1_1 = __importDefault(require("../routes/api/v1"));
const auth_1 = __importDefault(require("../routes/api/auth"));
// middleware
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const not_found_middleware_1 = __importDefault(require("../middlewares/not-found.middleware"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json({
        message: "Welcome to Resto API",
    });
});
router.use("/api/v1/auth", auth_1.default);
router.use("/api/v1", v1_1.default);
router.use(error_middleware_1.default);
router.use(not_found_middleware_1.default);
exports.default = router;
