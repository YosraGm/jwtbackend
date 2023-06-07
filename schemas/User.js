const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//creating a custom static method
userSchema.statics.signup = async function (email, password) {
  //check if the user already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already in use ");
  }
  //make sure the user inserted both email and pass
  if (!email || !password) {
    throw error("please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  // validate pass
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one uppercase,one lowercase, a number and a  symbol"
    );
  } // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ email, password: hash });
  return user;
};
// static costum login method
userSchema.statics.login = async function (email, password) {
  //check that i have both field email and password
  if (!email || !password) {
    throw Error("please fill all fields");
  }
  //check if the email is correct
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Icncorrect email");
  }
  // check the password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
