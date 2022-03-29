const User = require("../models/User");
const Course = require("../models/Course");
const Category = require("../models/Category");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
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
        res.status(400).send('PASSWORD IS INCORRECT');
      }
    });
  }
  else{
    res.status(400).send('User not found');
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



