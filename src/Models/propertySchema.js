const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  PPDID: { type: String, unique: true },
  propertyType: String,
  negotiable: String,
  price: Number,
  ownership: String,
  propertyAge: Number,
  propertyApproved: String,
  propertyDescription: String,
  bankLoan: Number,
  length: Number,
  breath: Number,
  totalArea: Number,
  areaUnit: String,
  bhk: Number,
  noOfFloors: Number,
  attached: String,
  westernToilet: String,
  furnished: String,
  carParking: String,
  lift: String,
  electricity: String,
  facing: String,
  name: String,
  mobile: Number,
  postedBy: String,
  saleType: String,
  featuredPackage: String,
  ppdPackage: String,
  photo: String,
  email: String,
  city: String,
  area: String,
  pincode: Number,
  address: String,
  landmark: String,
  latitude: String,
  longitude: String,
  // Modify the postedBy field to store the user's ObjectId
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
});

const Property = mongoose.model("Property list", propertySchema);

module.exports = Property;
