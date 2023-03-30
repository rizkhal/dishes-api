import { Router, Request, Response } from "express";

// routes
import apiV1 from "../routes/api/v1";
import auth from "../routes/api/auth";

// middleware
import errorMiddleware from "../middlewares/error.middleware";
import notFoundMiddleware from "../middlewares/not-found.middleware";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Resto API",
  });
});

router.use("/api/v1/auth", auth);
router.use("/api/v1", apiV1);

router.use(errorMiddleware);
router.use(notFoundMiddleware);

export default router;
