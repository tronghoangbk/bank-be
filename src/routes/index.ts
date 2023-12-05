import express from "express";
import { AccountController } from "../controllers/account.controller";
import { upload } from "../config/upload.config";
import { sendSocket } from "../controllers/socket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const APIRouter = express.Router();
const accountController = new AccountController();

APIRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

APIRouter.post(
  "/account/signup",
  upload.fields([
    { name: "frontIdCard", maxCount: 1 },
    { name: "backIdCard", maxCount: 1 },
    { name: "frontCard", maxCount: 1 },
    { name: "backCard", maxCount: 1 },
  ]),
  accountController.signup
);
APIRouter.get("/account", accountController.getAll);
APIRouter.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin" || password !== "admin") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  res.status(200).json({
    token: jwt.sign({ id: 1 }, JWT_SECRET),
  });
});

APIRouter.post("/socket", sendSocket);

export default APIRouter;
