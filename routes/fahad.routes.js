const express = require("express");
const router = express.Router();
router.get("/", (req,res)=> {
    res.json({
      message:(`fahad`)
    });
    console.log("fahad");}
    );

module.exports = router;