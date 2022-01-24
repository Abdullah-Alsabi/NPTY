const express = require("express");
const router = express.Router();
let Users = require("../models/user.model");
let adsSchema = require("../models/ads.model");

//get all ads
router.get("/getads", (req, res) => {
  adsSchema
    .find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get an ad by id
router.get("/getad/:id", (req, res) => {
  const { id } = req.params;
  //i got the port id trough the params and user id throgh the body
  adsSchema
    .findById(id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// add ad
router.post("/addad", async (req, res) => {
  const { adTitle, details, price, pics, _idUser, location } = req.body;
  const ad = await adsSchema.create({
    adTitle,
    details,
    price,
    pics,
    _idUser,
    location,
  });
  if (ad) {
    res.json({
      adTitle: ad.adTitle,
      details: ad.details,
      price: ad.price,
      pics: ad.pics,
      _idUser: ad._idUser,
      location: ad.location,
    });
    res.send("added");
  }
});

// router.put("/updateportfolio/:id", (req, res) => {
//   Users.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
//     if (err) console.log(err);
//     res.json("Portfiolio updated!");
//   });
// });

// router.post("/deleteportfolio/:id", async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;
//   const user = await Users.findByIdAndUpdate(userId);
//   const restPort = user.Portfolios.filter((p) => p._id.toString() !== id);
//   user.Portfolios = restPort;
//   user.save();
//   res.json("port deleted");
// });

module.exports = router;
