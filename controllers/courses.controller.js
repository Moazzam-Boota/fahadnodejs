// const passport = require("passport");
// const bcrypt = require('bcryptjs');

const Model = require("../models/courses.model");


require("dotenv").config();

exports.registerCourse = (req, res, next) => {
    let body = req.body;
    console.log(body);

    const fullName = body.fullName;
    const email    = body.email;
    const password = body.password;
    const details  = body.details;
    // const userType = body.userType;

    Model.findOne({email: email}).then(userDoc => {
        if (userDoc) {
            // console.log(userDoc,' User Doc Fahad');
        res.json({success: true, msg: 'User already existed'});

        return userDoc;
        }
    const student = new Model({
    fullName: fullName,
    email   : email,
    password: password,
    details : details,
    // userType: userType,
  })
  result= student.save();
}).then(result => {

      console.log(result);
      res.json({success: true, msg: 'User created successfully'});
  })
  .catch(err => {
    return err;
  });


};
