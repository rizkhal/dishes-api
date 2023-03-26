import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, User } from "@prisma/client";
import { Router, Response, Request } from "express";

const router: Router = Router();
const prisma: PrismaClient = new PrismaClient();

type UserType = {
  id: number;
  username: string;
  password: string;
} | null;

router.post("/login", async (req: Request, res: Response) => {
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
    const user: UserType = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user.id, username }, process.env.TOKEN_KEY || "", {
        expiresIn: "2h",
      });

      // save user token
      // user.token = token;

      return res.status(200).json({
        user: Object.keys(user)
          .filter((key) => key !== "password")
          .reduce((obj: any, key: string | number) => {
            obj[key] = user[key];
            return obj;
          }, {}),

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
});

export default router;
