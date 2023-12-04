"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const FILE_UPLOAD_MAX_SIZE = Number(process.env.FILE_UPLOAD_MAX_SIZE) || 5000000; // 5MB
const FILE_UPLOAD_PATH = process.env.FILE_UPLOAD_PATH || path_1.default.join(__dirname, "../../uploads");
const FILE_UPLOAD_TYPE = process.env.FILE_UPLOAD_TYPE || "image/jpeg|image/png|image/jpg|image/gif|application/pdf";
const FILE_UPLOAD_TYPE_ARRAY = FILE_UPLOAD_TYPE.split("|");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, FILE_UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, (0, uuid_1.v4)() + "-" + Date.now());
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: FILE_UPLOAD_MAX_SIZE },
    fileFilter: function (req, file, cb) {
        if (FILE_UPLOAD_TYPE_ARRAY.indexOf(file.mimetype) === -1) {
            return cb(new Error("Only " + FILE_UPLOAD_TYPE + " files are allowed!"));
        }
        cb(null, true);
    },
});
//# sourceMappingURL=multer.config.js.map