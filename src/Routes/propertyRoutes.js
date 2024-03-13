const express = require("express");
const router = express.Router();
const propertyControllers = require("../Controllers/propertyControllers.js");



router.post("/addproperty/:id", propertyControllers.addProperty);
router.get("/getAllProperties/:id", propertyControllers.getAllProperties);
router.delete("/deleteProperty/:_id",propertyControllers.deleteProperty);
router.patch("/updateProperty/:id",propertyControllers.updateProperty);


module.exports = router;