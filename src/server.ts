import express, { Express, Request, Response } from "express";

import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";

import apiV1 from "./routes/v1";
import auth from "./routes/auth";

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

server.use("/api/v1/auth", auth);
server.use("/api/v1", apiV1);

server.use(errorHandler);
server.use(notFoundHandler);

export default server;
