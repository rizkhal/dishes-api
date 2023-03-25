import { Router, Request, Response } from "express";
import categoryController from "../controllers/category.controller";

const router: Router = Router();

router.get("/categories", categoryController.index);
router.post("/categories", categoryController.store);

export default router;
