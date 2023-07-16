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
const joi_1 = __importDefault(require("joi"));
const unique = (value, { error }) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.findFirst({ where: { name: value } });
    if (category) {
        return error(`"${value}" is already taken.`);
    }
});
const schema = joi_1.default.object({
    name: joi_1.default.string().external(unique).required(),
});
exports.default = {
    validate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            schema
                .validateAsync(req.body)
                .then(() => next())
                .catch((error) => {
                res.status(422).json({
                    message: "Unprocessable Content",
                    errors: error.details,
                });
            });
        });
    },
};
