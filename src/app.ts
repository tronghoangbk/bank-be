// app.ts with express, mongoose, socket.io, body-parser, cookie-parser, express-validator , multer, cloudinary, cloudinary-storage-cloudinary-v2, and dotenv

import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { Server } from "socket.io";
import bodyParser from "body-parser";

import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import http from "http";
import { corsOptions } from "./config/cors.config";
import routes from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

export const io = new Server(server);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Configure Express
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
