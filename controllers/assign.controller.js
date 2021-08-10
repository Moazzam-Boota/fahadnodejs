const usersModel = require("../models/users.model");
const coursesModel = require("../models/courses.model");
const handeler = require("../middlewares/errorHandeler_middleware");

//Assigning Courses to Teacher and Student
exports.assignCourseToStudent = (req, res, next) => {
  const body = {
    ...req.body,
  };
  coursesModel.findByIdAndUpdate(
    body.courseId, {
      $push: {
        assignTo: body.studentId
      }
    }, {
      new: true,
      useFindAndModify: false
    },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      // res.json({
      //   success: true,
      //   msg: "Course assigned to Student successfully",
      // })
      next();
    }
  );

  usersModel.findOneAndUpdate({
      _id: body.studentId
    }, {
      assignedCourses: body.courseId
    },
    function (err, item) {
      if (err) return next(err);
      console.log("Course assigned to Student successfully !");
    }
  );
  res.json({
    success: true,
    msg: "Course assigned to Student successfully !",
  });
};

exports.assignCourseToTeacher = (req, res, next) => {
  const body = {
    ...req.body,
  };
  coursesModel.findByIdAndUpdate(
    body.courseId, {
      $push: {
        assignTo: body.teacherId
      }
    }, {
      new: true,
      useFindAndModify: false
    },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      // res.json({
      //   success: true,
      //   msg: "Course assigned to Teacher successfully",
      // });
      next();
    }
  );

  usersModel.findOneAndUpdate({
      _id: body.teacherId
    }, {
      assignedCourses: body.courseId
    },
    function (err, item) {
      if (err) throw next(err);
      console.log("Course assigned to Teacher successfully !");
      next();
    }
  );
  res.json({
    success: true,
    msg: "Course assigned to Teacher successfully !",
  });
};