import { Router } from "express";

// middlewares
import authHandler from "../middlewares/authHandler";

// categories
import categoryController from "../controllers/category.controller";
import categoryRequestValidator from "../validators/category.validator";

// products
import productController from "../controllers/product.controller";
import productRequestValidator from "../validators/product.validator";

const router: Router = Router();

router.use(authHandler);

// products
router.get("/products", productController.index);
router.post("/products", productRequestValidator, productController.store);
router.put("/products/:id", productRequestValidator, productController.update);
router.delete("/products/:id", productController.destroy);

// categories
router.get("/categories", categoryController.index);
router.post("/categories", categoryRequestValidator, categoryController.store);
router.put("/categories/:id", categoryRequestValidator, categoryController.update);
router.delete("/categories/:id", categoryController.destroy);

export default router;
