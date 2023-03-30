import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../database/client";
import type { UserType } from "../types";
import { Request, Response } from "express";

export default {
  async login(req: Request, res: Response) {
    try {
      // Get user input
      const { username, password } = req.body;

      // Validate user input
      if (!(username && password)) {
        return res.status(400).json({
          message: "All input is required",
        });
      }

      // Validate if user exist in our database
      const user: UserType | null = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign({ userId: user.id, username }, process.env.TOKEN_KEY || "", {
          // expiresIn: "15s",
          expiresIn: "2h",
        });

        // save user token
        // user.token = token;
        return res.status(200).json({
          user: {
            id: user.id,
            username: user.username,
          },
          token: {
            expiresIn: "2h",
            access_token: token,
          },
        });
      }

      return res.status(400).json({
        message: "Invalid Credentials",
      });
    } catch (err) {
      console.log(err);
    }
  },
  async refresh(req: Request, res: Response) {
    //
  },
};
