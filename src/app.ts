import express, { Express, Request, Response } from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

import apiV1 from "./api/v1";

dotenv.config();

const app: Express = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Resto API",
  });
});

app.use("/api/v1", apiV1);

app.use(notFound);
app.use(errorHandler);

export default app;
