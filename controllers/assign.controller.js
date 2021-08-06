const usersModel = require("../models/users.model");
const coursesModel = require("../models/courses.model");
const handeler = require("../middlewares/errorHandeler_middleware");

//Assign Courses
exports.assignCourseToStudent = (req, res, next) => {
  let body = {
    ...req.body,
  };
  let courseId = body.courseId;
  let course_Id = courseId.toString();

  // console.log(a);
  // console.log(body);
  coursesModel.findByIdAndUpdate(
    course_Id,
    { $push: { assignTo: course_Id } },
    { new: true, useFindAndModify: false },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      // console.log(result);
      res.json({
        success: true,
        msg: "Course assigned to Student successfully",
      });
    }
  );
};

exports.assignCourseToTeacher = (req, res, next) => {
  let body = {
    ...req.body,
  };
  console.log(body);
  coursesModel.findByIdAndUpdate(
    body.courseId,
    { $push: { assignTo: body.teacherId } },
    { new: true, useFindAndModify: false },
    (err, item) => {
      if (err) return next(err);
      if (!item) {
        return handeler.handleMissingRecord(res);
      }
      // console.log(result);
      res.json({
        success: true,
        msg: "Course assigned to Teacher successfully",
      });
    }
  );
};
