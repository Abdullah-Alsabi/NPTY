const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, " Username should be provided and unique"],
  },
  firstName: {
    type: String,
    required: [true, " firstName should be provided  "],
  },
  lastName: {
    type: String,
    required: [true, " lastName should be provided "],
  },
  email: {
    type: String,
    required: [true, "email should be provided and unique"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "isInvalid"],
  },
  password: {
    type: String,
    minlength: [8, "minemum password length is 8"],
    required: [true, "password should be provided"],
  },
  phoneNumber: {
    type: String,
    minlength: [10, "minemum phone number length is 10"],
    maxlength: [10, "mixemum phone number length is 10"],
    required: [true, " phone number should be provided"],
  },
});

//fire a function after doc saved to db

UserSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//first parameter is the name for the db collection
const User = mongoose.model("Users", UserSchema);
module.exports = User;
