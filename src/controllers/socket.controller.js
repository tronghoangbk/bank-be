"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSocket = void 0;
const sendSocket = (req, res) => {
    try {
        const toSocketId = req.body.socketId;
        const event = req.body.event;
        const data = req.body.data;
        io.to(toSocketId).emit(event, data);
        res.status(200).json();
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
exports.sendSocket = sendSocket;
