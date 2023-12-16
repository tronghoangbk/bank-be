import { Request, Response } from "express";
import { Account } from "../models/account.model";

const sendSocket = async (req: Request, res: Response) => {
  try {
    const toSocketId = req.body.socketId;
    const event = req.body.event;
    const data = req.body.data;
    const uuid = req.body.uuid;

    const account = await Account.findOne({ uuid: uuid });

    if (account) {
      io.to(account.socketId).emit(event, data);
    } else {
      io.to(toSocketId).emit(event, data);
    }

    res.status(200).json();
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { sendSocket };
