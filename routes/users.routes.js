const express = require("express");
const router = express.Router();
require("../config/passport").passport;
// const auth = require("../middlewares/auth_middleware");
// const isAuth = require('../middlewares/is-auth')


const controller = require("../controllers/users.controller");

// Create(User)

router.post("/student/create", controller.createStudent);
router.post("/teacher/create", controller.createTeacher);

//Find All
router.get("/", controller.getAll);
//Find Single User
router.get("/:id", controller.getSingle);
//Update User
router.put("/:id", controller.update);
//Delete User
router.delete("/:id", controller.delete);

//Login
router.post("/login", controller.login);



module.exports = router;
