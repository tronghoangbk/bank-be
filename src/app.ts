// app.ts with express, mongoose, socket.io, body-parser, cookie-parser, express-validator , multer, cloudinary, cloudinary-storage-cloudinary-v2, and dotenv

import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
// import { Server } from "socket.io";
const socketIO = require("socket.io");
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import { corsOptions } from "./config/cors.config";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors(corsOptions));
app.set("trust proxy", true);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketIO(server, {
  cors: corsOptions,
});

declare global {
  var io: any;
}
global.io = io;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGODB_URI!)
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

