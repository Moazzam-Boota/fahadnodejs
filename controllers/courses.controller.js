// const passport = require("passport");
// const bcrypt = require('bcryptjs');
const usersModel = require("../models/users.model");
const coursesModel = require("../models/courses.model");


require("dotenv").config();

exports.registerCourse = (req, res, next) => {
  const body = req.body;
  // console.log(body);

  // Ensuring that all the fields are being input by the user according to the model's requirements
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  // Ensuring that the Course does not already exist
  coursesModel.findOne({
      courseName: body.courseName
    })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(
          `Sorry, a course already exists with the c_Code: ${body.c_Code} `
        ); {
          res.json({
            success: true,
            msg: 'Course already existed'
          });

        }
        error.statusCode = 409;
        throw error;
      }
      const course = new coursesModel({
        courseName: body.courseName,
        email: body.email,
        c_Code: body.c_Code,
        details: body.details,
        userType: body.userType,
      });
      course.setPassword(body.password);
      course
        .save()
        .then(async (result) => {

          res.status(201).json({
            id: result._id,
            message: `Course is registered Successfully!: ${body.courseName} `,
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
  coursesModel.find(req.query, (err, item) => {
    if (err) {
      res.status(500).json({
        Error: "Course Not Found"
      });
    }
    res.status(200).json({
      Item: item
    });
  });
};

exports.getSingle = (req, res, next) => {
  coursesModel.findById(req.params.id, (err, item) => {
    if (err) return next(err);
    if (!item) {
      return handeler.handleMissingRecord(res);
    }
    res.send(item);
  });
};

exports.update = (req, res, next) => {
  coursesModel.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, item) => {
    if (err) return next(err);
    if (!item) {
      return handeler.handleMissingRecord(res);
    }
    res.status(200).json({
      message: "Course information updated Successfully!",
    });
  });
};

exports.delete = (req, res, next) => {
  coursesModel.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) return next(err);
    if (!item) {
      return handeler.handleMissingRecord(res);
    }
    res.status(200).json({
      message: "Course deleted Successfully!",
    });
  });
};

//Assign Course
exports.assignCourseToStudent = (req, res, next) => {
  let body = {
    ...req.body
  };
  console.log(body);
  if (true) {
    res.json({
      success: true,
      msg: 'Data Exist'
    })

  };

};

exports.assignCourseToTeacher = (req, res, next) => {
  let body = {
    ...req.body
  };
  console.log(body);
  return usersModel.findByIdAndUpdate(
    teacher_Id,
    { $push: { assignTo : body.teacher_Id } },
    { new: true, useFindAndModify: false }
  );
};