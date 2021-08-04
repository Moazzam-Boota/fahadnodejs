const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses.controller");

//Signup/Register(Course)

router.get("/courses", controller.registerCourse);

module.exports = router;
