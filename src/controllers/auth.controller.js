"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield user_model_1.User.findOne({ username, password });
                if (!user) {
                    return res.status(401).json({
                        message: "Unauthorized",
                    });
                }
                res.status(200).json({
                    token: jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET),
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPassword, newPassword } = req.body;
                const userId = req.body.userId;
                const user = yield user_model_1.User.findOne({ _id: userId, password: oldPassword });
                if (!user) {
                    return res.status(401).json({
                        message: "Unauthorized",
                    });
                }
                yield user_model_1.User.findByIdAndUpdate(userId, { password: newPassword });
                res.status(200).json({
                    message: "Change password successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
}
exports.AuthController = AuthController;
