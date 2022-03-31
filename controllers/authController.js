const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");
const {validationResult } = require('express-validator');


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (err) {
    const errors = validationResult(req);
      console.log(errors);
      console.log(errors.array()[0].msg);
      for (let i = 0; i < errors.array().length; i++) {
        req.flash('error',`${errors.array()[i].msg}`);

      }

      res.status(400).redirect("/register");


  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
   const user= await User.findOne({ email });
   if (user) {
    bcrypt.compare(password, user.password, (err, same) => {

      if (same) {
        req.session.userID=user._id;
        res.status(200).redirect("/users/dashboard");
      }
      else{
            req.flash("error","Email or Password is incorrect");
            res.status(400).redirect("/login");


      }
    });

  }
  else{
    req.flash("error","User is Not Exits");
    res.status(400).redirect('/login');
  }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

exports.logoutUser = (req, res) => {
  req.session.destroy(()=>{

    res.redirect('/');

  });
  
}


exports.getDashboardPage =async (req, res) => {
const user =await User.findOne({_id:req.session.userID}).populate('courses');// user üzerinden courses çekiyoruz
const categories = await Category.find();
const courses = await Course.find({user:req.session.userID});
//Dashboard templatine user bilgilerini gönderdim 
res.status(200).render('dashboard',{page_name:"dashboard",user,categories,courses});
}




