const jwt = require("express-jwt");
require("dotenv").config();

const getTokenFromHeaders = (req) => {
  const {
    headers: {token},} = req;
  if (token && token.split(" ")[0] === "Bearer") {
    return token.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: getTokenFromHeaders,
    algorithms: ["HS256"],
  }),
  getTokenFromHeaders: getTokenFromHeaders

};

module.exports = auth;