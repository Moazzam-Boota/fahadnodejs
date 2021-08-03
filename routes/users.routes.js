const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");
router.get("/student", controller.all);
router.get("/teacher", controller.all);


module.exports = router;
