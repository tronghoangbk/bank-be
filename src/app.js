"use strict";
// app.ts with express, mongoose, socket.io, body-parser, cookie-parser, express-validator , multer, cloudinary, cloudinary-storage-cloudinary-v2, and dotenv
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { Server } from "socket.io";
const socketIO = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const cors_config_1 = require("./config/cors.config");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.set("trust proxy", true);
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = socketIO(server, {
    cors: cors_config_1.corsOptions,
});
global.io = io;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use("/api", routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
    const io = require("./socket");
})
    .catch((err) => {
    console.log(err);
});
