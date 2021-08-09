const express = require("express");
const router = express.Router();

const controller = require("../controllers/assign.controller");

// Assign(Course)
router.post("/student", controller.assignCourseToStudent);
router.post("/teacher", controller.assignCourseToTeacher);

module.exports = router;