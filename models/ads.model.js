const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//done
let adsSchema = new Schema({
  adTitle: {
    type: String,
    required: [true, " Ad title should be provided"],
  },
  details: {
    type: String,
    required: [true, " Ad details should be provided"],
  },
  price: {
    type: Number,
    required: [true, "  Ad price should be provided"],
    default: 0,
  },
  pics: {
    type: Array,
    default: [
      "https://ehabra.com/storage/images/documents/_res/wrh/def_product.png",
    ],
  },
  _idUser: {
    type: String,
    required: [true, "can't be blank"],
  },
  location: {
    type: Array,
    required: [true, "can't be blank"],
  },
});
const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
