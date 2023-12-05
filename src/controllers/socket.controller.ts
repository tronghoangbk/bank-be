import { Request, Response } from "express";

const sendSocket = (req: Request, res: Response) => {
  const toSocketId = req.body.socketId;
  const event = req.body.event;
  const data = req.body.data;

  const socket = req.app.get("socket");
  socket.to(toSocketId).emit(event, data);

  res.status(200).json();
};

export { sendSocket };
