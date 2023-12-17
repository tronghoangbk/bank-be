import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const uuid = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
