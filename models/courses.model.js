const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
require("dotenv").config();

const Model = new Schema(
  {
    courseName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    courseCode: {
      type: String,
    },
    details: {
      type: String,
    },
    assignTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    local: {
      hash: { type: String },
      salt: { type: String },
    },
    // accessToken: { type: String },
    // refreshToken: { type: String },
    // resetPasswordToken: { type: String, required: false },
    // resetPasswordExpires: { type: Date, required: false },
  },
  {
    strict: false,
    versionKey: false,
    timestamps: true,
    // collection: "users",
  }
);
Model.methods.setPassword = function (password) {
  this.local.salt = crypto.randomBytes(16).toString("hex");
  this.local.hash = crypto
    .pbkdf2Sync(password, this.local.salt, 128, 128, "sha512")
    .toString("hex");
};

module.exports = mongoose.model("Course", Model);
