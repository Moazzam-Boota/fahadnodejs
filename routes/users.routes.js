const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");

// SignUp/Register(User)

router.post("/student/signup", controller.registerStudent);
// router.post("/teacher/signup", controller.registerTeacher);

module.exports = router;
