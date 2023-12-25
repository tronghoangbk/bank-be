import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import sharp from "sharp";
dotenv.config();

const uuid = require("uuid");

const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../../public/uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${uuid.v4()}-${file.originalname}`);
//   },
// });

const resizeImage = async (file: any) => {
  if (!file) return "";
  const { buffer } = file;
  const filename = `${uuid.v4()}.jpeg`;
  const filepath = path.join(__dirname, "../../public/uploads", filename);
  await sharp(buffer)
    .resize({ width: 500, fit: "contain" })
    .jpeg({ quality: 80 })
    .toFile(filepath);
  return filename;
};

export const upload = multer({ storage });
export const resize = resizeImage;
