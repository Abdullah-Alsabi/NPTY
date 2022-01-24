const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
let Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const axios = require("axios");
let key = "1918a46e259f1a69fceda2acae7f0ceb";
let city = "Riyadh";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
const getWeather = async () => {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
};
// sign up
router.post("/signup", async (req, res) => {
  let { userName, email, password, firstName, lastName, phoneNumber } =
    req.body;
  console.log(firstName);
  const userExists = await Users.findOne({ email });
  const checkUserName = await Users.findOne({ userName });

  if (userExists || checkUserName) {
    res.status(404);
    res.send("User email or Username is already exists or email is invalid");
  } else {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await Users.create({
      userName,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
    });
    console.log(user);
    let token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: false });
    if (user) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        token: token,
      });
    }
  }
});

// sign in
router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const user = await Users.findOne({ userName });
  if (!user || !(await user.matchPassword(password))) {
    res.status(404).send("wrong username or password");
  } else if (user && (await user.matchPassword(password))) {
    let token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: false });
    let weatherData = await getWeather();
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      temp: weatherData.data.main.temp,
      city: weatherData.data.name,
      token: token,
    });
  }
});

//sign out
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
  //because it never stops we use res.end()
  res.end();
});

//update user
router.put("/updateuser/:id", (req, res) => {
  Users.findById(req.params.id).then(async (user) => {
    // let newEmail = req.body.email;
    // let userName = req.body.userName;
    const salt = await bcrypt.genSalt(10);
    // if (userName != undefined) {
    //   const checkUserName = await Users.findOne({ userName });
    //   if (checkUserName) {
    //     res.status(404).send("The username already in use");
    //   } else user.userName = userName;
    // }
    // if (newEmail != undefined) {
    //   const userExists = await Users.findOne({ newEmail });
    //   if (userExists) {
    //     res.status(404).send("The email already in use");
    //   } else user.email = newEmail;
    // }
    if (req.body.currentPassword != undefined) {
      if (user && (await user.matchPassword(req.body.currentPassword))) {
        if (req.body.newPassword != undefined)
          req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
        user.password = req.body.newPassword;
      }
    }
    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        if (err) throw err;
      });
  });
});

router.get("/getuser/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// *************************

// for admin
router.get("/getusers", (req, res) => {
  Users.find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for admin
router.delete("/deleteuser/:id", (req, res) => {
  console.log(req.params.id);
  Users.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update from admin user will use the same for user

module.exports = router;
