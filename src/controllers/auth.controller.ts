import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import prisma from "../database/client";
import type { UserType } from "../types";
import type { TokenList } from "../types";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { findUserById } from "../models/user.model";

const tokenLists: TokenList = {};

export default {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!(username && password)) {
        return res.status(400).json({
          message: "All input is required",
        });
      }

      const user: UserType | null = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user.id, username }, process.env.JWT_TOKEN, {
          expiresIn: process.env.TOKEN_EXPIRED_AT,
        });

        const refreshToken: string = jwt.sign({ userId: user.id, username }, process.env.JWT_REFRESH_TOKEN, {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_AT,
        });

        tokenLists[refreshToken] = {
          expiredIn: 604800000,
          refreshToken: refreshToken,
        };

        return res.status(200).json({
          user: {
            id: user.id,
            username: user.username,
          },
          token: {
            expiresIn: process.env.TOKEN_EXPIRED_AT,
            accessToken: token,
            refreshToken: refreshToken,
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
    const data: { refreshToken?: string } = req.body;

    if (data.refreshToken && data.refreshToken in tokenLists) {
      const decoded: JwtPayload = jwt.verify(data.refreshToken, process.env.JWT_REFRESH_TOKEN);
      const user: User | null = await findUserById(decoded.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const credentials = {
        username: user.username,
        password: user.password,
      };

      const token = jwt.sign(credentials, process.env.JWT_TOKEN, { expiresIn: process.env.TOKEN_EXPIRED_AT });
      const refreshToken: string = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_REFRESH_TOKEN,
        {
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_AT,
        },
      );

      return res.status(200).json({
        user: {
          id: user.id,
          username: user.username,
        },
        token: {
          expiresIn: process.env.TOKEN_EXPIRED_AT,
          accessToken: token,
          refreshToken: refreshToken,
        },
      });
    }

    return res.status(400).json({
      message: "Bad Request",
      error: "Invalid Refresh Token",
    });
  },
};
