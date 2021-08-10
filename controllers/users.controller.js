const Model = require("../models/users.model");
const handeler = require("../middlewares/errorHandeler_middleware");
var parseFullName = require("parse-full-name").parseFullName;
const passport = require("passport");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.createStudent = (req, res, next) => {
  const body = req.body;
  fullName = parseFullName(body.fullName);

  // Ensuring that all the fields are being input by the user according to the model's requirements
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  // Ensuring that the user does not already exist
  Model.findOne({
      email: body.email,
    })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(
          `Sorry, a user already exists with the email: ${body.email} `
        ); {
          res.json({
            success: true,
                msg: "User already existed",
          });
        }
        error.statusCode = 409;
        throw error;
      }
      const student = new Model({
        fullName: body.fullName,
        firstName: fullName.first === "" ? fullName.last : fullName.first,
        lastname: fullName.first !== "" ? fullName.middle + " " + fullName.last : null,
        email: body.email,
        details: body.details,
        userType: body.userType,
      });
      student.setPassword(body.password);
      student
        .save()
        .then(async (result) => {
          res.status(201).json({
                 id: result._id,
            message: `User is registered Successfully! ${body.email} `,
          });
          console.log("User is registered Successfully!");

        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAll = (req, res, next) => {
  Model.find(req.query)
    .select({
      local: 0,
    })
    .populate("course")
    .exec((err, items) => {
      if (err) return next(err);
      if (!items) {
        return handeler.handleMissingRecord(res);
      }
      res.send(items);
      console.log("Done");
    });
};

exports.getSingle = (req, res, next) => {
  Model.findById(req.params.id)
    .select({
      local: 0,
    })
    .populate("course")
    .exec((err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      res.send(item);
      console.log("Done");
    });
};

exports.update = (req, res, next) => {
  Model.findByIdAndUpdate(
    req.params.id, {
      $set: req.body,
    },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }

      res.status(200).json({
        message: "User information updated Successfully!:",
      });
      console.log("User information updated Successfully!");

    }
  );
};

exports.delete = (req, res, next) => {
  Model.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) return next(err);
    if (!item) {
      return handeler.handleMissingRecord(res);
    }
    res.status(200).json({
      message: "User deleted Successfully!:",
    });
    console.log("User deleted ` Successfully!");

  });
};

exports.createTeacher = (req, res, next) => {
  const body = req.body;
  fullName = parseFullName(body.fullName);

  // Ensuring that all the fields are being input by the user according to the model's requirements
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  // Ensuring that the user does not already exist
  Model.findOne({
      email: body.email,
    })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(
          `Sorry, a user already exists with the email: ${body.email} `
        ); {
          res.json({
            success: true,
                msg: "User already existed",
          });
        }
        error.statusCode = 409;
        throw error;
      }
      const student = new Model({
        fullName: body.fullName,
        firstName: fullName.first === "" ? fullName.last : fullName.first,
        lastName: fullName.first !== "" ? fullName.middle + " " + fullName.last : null,
        email: body.email,
        details: body.details,
        userType: body.userType,
      });
      student.setPassword(body.password);
      student
        .save()
        .then(async (result) => {
          res.status(201).json({
            id: result._id,
            message: `User is registered Successfully! ${body.email} `,
          });
          console.log("User is registered Successfully!");
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.login = (req, res, next) => {
  const body = req.body;
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return res.status(404).json({
          message: "Record not Found"
        });
      }
      if (!passportUser) {
        return res.status(400).send(info);
      }
      console.log("User LoggedIn Successfully!");

      const user = passportUser;
      accessToken = passportUser.generateJWT();
      return res.json(user.toAuthJSON(accessToken,user));
    }

  )
  (req, res, next);
};


