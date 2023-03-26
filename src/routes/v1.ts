import { Router } from "express";

// categories
import categoryController from "../controllers/category.controller";
import { storeValidator } from "../validators/category.validator";

// products
import productController from "../controllers/product.controller";

const router: Router = Router();

// categories
router.get("/categories", categoryController.index);
router.post("/categories", storeValidator, categoryController.store);

// products
router.get("/products", productController.index);

export default router;
