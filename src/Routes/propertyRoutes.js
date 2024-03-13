const express = require("express");
const router = express.Router();
const validateUser = require("../MiddleWares/validateUser.js");
const propertyControllers = require("../Controllers/propertyControllers.js");
const multer = require("multer"); // Import Multer
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
	cloud_name:"dfigkhihk",
	api_key:"546981989443856",
	api_secret:"6CeEnnAqTxB4Bu1qD_sM-xZMlGE",
});

// Configure multer
const upload = multer({ dest: "uploads/" }); // Set upload destination

// Route for handling file uploads
console.log(cloudinary.uploader)
router.post("/upload", upload.single("photo"), async (req, res) => {
	try {
		// Upload file to Cloudinary
		const result = await cloudinary.uploader.upload(req.file.path);

		// Return the URL of the uploaded image
		res.json({ url: result.secure_url });
	} catch (error) {
		console.error("Error uploading image:", error);
		res.status(500).json({ message: "Server Error" });
	}
});

router.post("/addproperty/:id", propertyControllers.addProperty);
router.get("/getAllProperties/:id", propertyControllers.getAllProperties);
router.delete("/deleteProperty/:_id",propertyControllers.deleteProperty);
router.patch("/updateProperty/:id",propertyControllers.updateProperty);


module.exports = router;