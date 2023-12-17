import { Request, Response } from "express";

const sendSocket = async (req: Request, res: Response) => {
  try {
    const toSocketId = req.body.socketId;
    const event = req.body.event;
    const data = req.body.data;

    io.to(toSocketId).emit(event, data);

    res.status(200).json();
  } catch (error: any) {
    console.log("error", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { sendSocket };
