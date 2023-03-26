import { Router } from "express";

// categories
import categoryController from "../controllers/category.controller";
import { storeValidator } from "../validators/category.validator";

// products
import productController from "../controllers/product.controller";

const router: Router = Router();

// products
router.get("/products", productController.index);

// categories
router.get("/categories", categoryController.index);
router.post("/categories", storeValidator, categoryController.store);
router.put("/categories/:id", storeValidator, categoryController.update);
router.delete("/categories/:id", categoryController.destroy);

export default router;
