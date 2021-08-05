const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses.controller");

//Signup/Register(Course)
router.post("/register", controller.registerCourse);

router.get("/",  controller.getAll);

router.get("/:id",  controller.getSingle);

router.put("/:id/update", controller.update);

router.delete("/:id/delete", controller.delete);

// Assign(Course)
router.post("/assign/student", controller.assignCourseToStudent);
router.post("/assign/teacher", controller.assignCourseToTeacher);


module.exports = router;
