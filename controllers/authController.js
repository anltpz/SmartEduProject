const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
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
        res.status(200).redirect("/");
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


