const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already present"],
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  rpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

//Generate JWT Token
userSchema.methods.generateAuthToken = async function () {
  try {
   const token = await jwt.sign({email:this.email },process.env.SECRET_KET,{expiresIn:'300s'});
    return token;
  } catch (error) {
    console.log("the error part" + error);
  }
};

//Converting password into hash
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.rpassword = await bcrypt.hash(this.rpassword, 10);
  }
  next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;