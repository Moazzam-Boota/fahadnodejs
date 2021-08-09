const coursesModel = require("../models/courses.model");
const handeler = require("../middlewares/errorHandeler_middleware");

require("dotenv").config();

exports.registerCourse = (req, res, next) => {
  const body = req.body;

  // Ensuring that all the fields are being input by the user according to the model's requirements
  if (!body.email || !body.password) {
    const error = new Error("Validation failed, email & password is required");
    error.statusCode = 400;
    throw error;
  }
  // Ensuring that the Course does not already exist
  coursesModel
    .findOne({
      courseName: body.courseName,
    })
    .then((userDoc) => {
      if (userDoc) {
        const error = new Error(
          `Sorry, a course already exists with the courseCode: ${body.courseCode} `
        ); {
          res.json({
            success: true,
            msg: "Course already existed",
          });
        }
        error.statusCode = 409;
        throw error;
      }
      const course = new coursesModel({
        courseName: body.courseName,
        email: body.email,
        courseCode: body.courseCode,
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
          console.log("Course is registered Successfully!");
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
  coursesModel
    .find(req.query)
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
  coursesModel
    .findById(req.params.id)
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
    });
  console.log("Done");

};

exports.update = (req, res, next) => {
  coursesModel.findByIdAndUpdate(
    req.params.id, {
      $set: req.body,
    },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      res.status(200).json({
        message: "Course information updated Successfully!",
      });
      console.log("Course information updated Successfully!");

    }
  );
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
    console.log("Course deleted Successfully!");

  });
};