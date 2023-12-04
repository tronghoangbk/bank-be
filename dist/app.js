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
Object.defineProperty(exports, "__esModule", { value: true });
// Import các module
const express_1 = require("express");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const mongoose_1 = require("mongoose");
// Tạo một ứng dụng Express
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = (0, socket_io_1.default)(server);
// Kết nối tới MongoDB
mongoose_1.default.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});
// Định nghĩa một mô hình đơn giản
const Message = mongoose_1.default.model("Message", { content: String });
// Thiết lập Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");
    // Gửi tin nhắn đến tất cả các người dùng khi có tin nhắn mới
    socket.on("chat message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const message = new Message({ content: msg });
        yield message.save();
        io.emit("chat message", msg);
    }));
    // Ngắt kết nối
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
// Routing cho trang web
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// Khởi động server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map