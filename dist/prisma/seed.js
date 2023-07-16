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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userPassword = yield bcryptjs_1.default.hash("secret", 10);
        yield prisma.user.create({
            data: {
                username: "rizkhal",
                password: userPassword,
            },
        });
        yield prisma.category.createMany({
            data: [{ name: "Desert" }, { name: "Food" }, { name: "Drink" }],
            skipDuplicates: true,
        });
        yield prisma.product.createMany({
            data: [
                {
                    name: "Americano",
                    price: 1000,
                    categoryId: 3,
                },
                {
                    name: "Capucino",
                    price: 1000,
                    categoryId: 3,
                },
                {
                    name: "Salad",
                    price: 1000,
                    categoryId: 2,
                },
            ],
            skipDuplicates: true,
        });
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
