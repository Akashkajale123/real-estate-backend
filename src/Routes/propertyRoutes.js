const express = require("express");
const router = express.Router();
const validateUser = require("../MiddleWares/validateUser.js");
const propertyControllers = require("../Controllers/propertyControllers.js");
const multer = require("multer"); // Import Multer
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer
const upload = multer({ dest: "uploads/" }); // Set upload destination

// Route for handling file uploads
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

router.post("/addproperty/:id", validateUser, propertyControllers.addProperty);
router.get("/getAllProperties/:id", propertyControllers.getAllProperties);
router.delete("/deleteProperty/:_id",validateUser,propertyControllers.deleteProperty);
router.patch("/updateProperty/:id",propertyControllers.updateProperty);


module.exports = router;