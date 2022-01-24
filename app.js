const express = require("express");
const axios = require("axios");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const mongoose = require("mongoose");


mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// msg when connect
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use("/api/users", require("./routes/user.route"));
app.use("/api/ads", require("./routes/ads.route"));

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
