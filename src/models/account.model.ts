import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
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
      required: true,
      trim: true,
    },
    backIdCard: {
      type: String,
      required: true,
      trim: true,
    },
    idCard: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    frontCard: {
      type: String,
      required: true,
      trim: true,
    },
    backCard: {
      type: String,
      required: true,
      trim: true,
    },
    cardLimit: {
      type: Number,
      required: true,
    },
    cardBalance: {
      type: Number,
      required: true,
    },
    proposeLimit: {
      type: Number,
      required: true,
    },
    cardType: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Account = mongoose.model("Account", accountSchema);
