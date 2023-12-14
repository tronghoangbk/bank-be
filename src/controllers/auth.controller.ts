import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      res.status(200).json({
        token: jwt.sign({ id: user._id }, JWT_SECRET),
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.body.userId;

      const user = await User.findOne({ _id: userId, password: oldPassword });

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      await User.findByIdAndUpdate(userId, { password: newPassword });

      res.status(200).json({
        message: "Change password successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
