const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

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
    details: {
      type: String,
    },

    userType:{
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
      },

    // local: {
    //   hash: { type: String },
    //   salt: { type: String },
    // },
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



module.exports = mongoose.model("Course", Model);
