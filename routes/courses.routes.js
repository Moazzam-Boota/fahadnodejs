const express = require("express");
const router = express.Router();

const controller = require("../controllers/courses.controller");
router.get("/courses", controller.all);

module.exports = router;
