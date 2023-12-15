"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account.controller");
const upload_config_1 = require("../config/upload.config");
const socket_controller_1 = require("../controllers/socket.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const APIRouter = express_1.default.Router();
const accountController = new account_controller_1.AccountController();
const authController = new auth_controller_1.AuthController();
APIRouter.get("/", (req, res) => {
    res.send("Hello World!");
});
APIRouter.post("/account/signup", upload_config_1.upload.fields([
    { name: "frontIdCard", maxCount: 1 },
    { name: "backIdCard", maxCount: 1 },
    { name: "frontCard", maxCount: 1 },
    { name: "backCard", maxCount: 1 },
]), accountController.signup);
APIRouter.get("/account", auth_middleware_1.authMiddleware, accountController.getAll);
APIRouter.delete("/account/:id", accountController.delete);
APIRouter.put("/account/:id", accountController.updateOTP);
APIRouter.post("/auth/login", authController.login);
APIRouter.put("/auth/change-password", auth_middleware_1.authMiddleware, authController.changePassword);
APIRouter.post("/socket", auth_middleware_1.authMiddleware, socket_controller_1.sendSocket);
exports.default = APIRouter;
