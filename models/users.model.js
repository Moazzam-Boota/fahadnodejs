const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Model = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
        type: String,
      },
    email: {
      type: String,
      required: true,
    },

    userRole: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],

    local: {
      hash: { type: String },
      salt: { type: String },
    },
    accessToken: { type: String },
    refreshToken: { type: String },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: true,
    collection: "users",
  }
);



module.exports = mongoose.model("User", Model);
