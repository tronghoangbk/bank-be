import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
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
      required: true,
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
      type: Date,
      required: true,
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
      type: Number,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Account = mongoose.model("Account", accountSchema);
