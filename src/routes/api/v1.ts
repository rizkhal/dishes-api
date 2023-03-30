import { Router } from "express";

// middlewares
import authMiddleware from "../../middlewares/auth.middleware";

// controllers
import categoryController from "../../controllers/category.controller";
import productController from "../../controllers/product.controller";
import productRequestValidator from "../../validators/product.validator";

// validators
import categaoryValidator from "../../validators/categaory.validator";

const router: Router = Router();

router.use(authMiddleware);

// products
router.get("/products", productController.index);
router.post("/products", productRequestValidator, productController.store);
router.put("/products/:id", productRequestValidator, productController.update);
router.delete("/products/:id", productController.destroy);

// categories
router.get("/categories", categoryController.index);
router.post("/categories", categaoryValidator.validate, categoryController.store);
router.put("/categories/:id", categaoryValidator.validate, categoryController.update);
router.delete("/categories/:id", categoryController.destroy);

export default router;
