const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:['student','teacher','admin'],
        default:'student'
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
      }]

});

UserSchema.pre("save", async function (next) {

 //password hashing
 const user=this;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model("User", UserSchema);
module.exports = User;
