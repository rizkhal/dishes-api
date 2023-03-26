import express, { Express, Request, Response } from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

import apiV1 from "./routes/v1";

dotenv.config();

const server: Express = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Resto API",
  });
});

server.use("/api/v1", apiV1);

server.use(notFound);
server.use(errorHandler);

export default server;
