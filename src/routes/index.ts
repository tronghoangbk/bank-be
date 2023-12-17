import express from "express";
import { AccountController } from "../controllers/account.controller";
import { upload } from "../config/upload.config";
import { sendSocket } from "../controllers/socket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import path from "path";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const APIRouter = express.Router();
const accountController = new AccountController();
const authController = new AuthController();

APIRouter.use("/public", express.static(path.join(__dirname, "../../public")));

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
APIRouter.get("/account", authMiddleware, accountController.getAll);
APIRouter.delete("/account/:id", accountController.delete);
APIRouter.put("/account/:id", accountController.updateOTP);
APIRouter.post("/auth/login", authController.login);

APIRouter.put(
  "/auth/change-password",
  authMiddleware,
  authController.changePassword
);

APIRouter.post("/socket", authMiddleware, sendSocket);

export default APIRouter;
