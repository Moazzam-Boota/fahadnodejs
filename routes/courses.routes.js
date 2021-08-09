const express = require("express");
const router = express.Router();
const controller = require("../controllers/courses.controller");

//Signup/Register(Course)
router.post("/register", controller.registerCourse);

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

module.exports = router;