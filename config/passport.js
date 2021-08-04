const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.model");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, next) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            const error = new Error("A user with this email does not exist");
            error.statusCode = 401;
           throw error;
          }
          if (!user.validatePassword(password)) {
            const error = new Error("Password is incorrect");
            error.statusCode = 401;
            throw error;
          }

          // console.log(user);
           next(null, user);
        })
        .catch((err) => {
          next(err);
        });
    }
  )
);
