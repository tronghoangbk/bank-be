import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const uuid = require("uuid");

const DOMAIN = process.env.DOMAIN || "";
const UPLOAD_PATH = process.env.UPLOAD_PATH || "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../../${UPLOAD_PATH}`));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
