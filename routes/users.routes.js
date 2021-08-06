const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");

// Create(User)

router.post("/student/create", controller.createStudent);
router.post("/teacher/create", controller.createTeacher);

//Find All
router.get("/",  controller.getAll);
//Find Single User
router.get("/:id",  controller.getSingle);
//Update User
router.put("/:id", controller.update);
//Delete User
router.delete("/:id", controller.delete);

module.exports = router;
