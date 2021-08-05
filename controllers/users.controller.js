// const passport = require("passport");
// const bcrypt = require('bcryptjs');

const Model = require("../models/users.model");


require("dotenv").config();

exports.createStudent = (req, res, next) => {
  const body = req.body;
  console.log(body);

  // Ensuring that all the fields are being input by the user according to the model's requirements
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  // Ensuring that the user does not already exist
  Model.findOne({
      email: body.email
    })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(
          `Sorry, a user already exists with the email: ${body.email} `
        );{
          res.json({
            success: true,
            msg: 'User already existed'
          });

        }
        error.statusCode = 409;
        throw error;
      }
      const student = new Model({
        fullName: body.fullName,
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
            message: `User is registered Successfully! ${' User ' + ' : ' + body.userType + ' and ' + ' E-mail ' + ' : ' + body.email} `,
          });
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
  Model.find(req.query, (err, item) => {
    if (err) {
      res.status(500).json({ Error: "Not Found" });
    }
    res.status(200).json({ Item: item });
  });
};

  // exports.getAll = (req, res, next) => {
  //   var query = Model.find(req.query)
  //     .select({ local: 0 })
  //     .populate({
  //       path: "roleIds",
  //       populate: {
  //         path: "permissionIds",
  //         populate: {
  //           path: "parent",
  //           select: { _id: 0, name: 1 },
  //         },
  //       },
  //       model: "Role",
  //       select: { _id: 1, name: 1 },
  //     });
  //   query.exec((err, items) => {
  //     if (err) return next(err);
  //     if (!items) {
  //       return handeler.handleMissingRecord(res);
  //     }
  //     res.send(items);
  //   });
  // };

  exports.getSingle = (req, res, next) => {
    Model.findById(req.params.id, (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      res.send(item);
    });
  };


    exports.update = (req, res, next) => {
    Model.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      res.status(200).json({
        message: "User information updated Successfully!:",
      });
    });
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
    });
  };



  exports.createTeacher = (req, res, next) => {
    const body = req.body;
    console.log(body);

    // Ensuring that all the fields are being input by the user according to the model's requirements
    if (!body.email || !body.password) {
      const error = new Error("Validation failed, email & password is required");
      error.statusCode = 400;
      throw error;
    }
    // Ensuring that the user does not already exist
    Model.findOne({
        email: body.email
      })
      .then((userDoc) => {
        if (userDoc) {
          const error = new Error(
            `Sorry, a user already exists with the email: ${body.email} `
          );{
            res.json({
              success: true,
              msg: 'User already existed'
            });
  
          }
          error.statusCode = 409;
          throw error;
        }
        const student = new Model({
          fullName: body.fullName,
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
              message: `User is registered Successfully! ${' User ' + ' : ' + body.userType + ' and ' + ' E-mail ' + ' : ' + body.email} `,
            });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });};