const Property = require("../Models/propertySchema.js");
const User = require("../Models/User.js");

// Function to generate a unique numeric property ID
function generatePropertyID() {
  const prefix = "PPD";
  const randomNumeric = Math.floor(Math.random() * 90000) + 10000; // Generate a random 5-digit number
  return prefix + randomNumeric;
}

exports.addProperty = async (req, res) => {
  try {
    const propertyData = req.body; // Assuming request body contains property data

    const userId = req.params.id;

    // Create a new property document
    const property = new Property({
      ...propertyData,
      postedBy: userId, // Assign the user's ObjectId to the postedBy field
      PPDID: generatePropertyID(),
    });

    // Save the property document to the database
    await property.save();

    // Update the user's property array in the User model
    await User.findByIdAndUpdate(userId, {
      $push: { properties: property._id },
    });

    res.status(201).json({
      status: "success",
      message: "Property saved successfully",
      property,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to save property" });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    // Retrieve all properties from the database
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error getting properties:", error);
    res.status(500).json({ message: "Failed to get properties" });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    // Extract the property ID from the request parameters
    const propertyId = req.params._id;
    // Find the property by ID and delete it from the database
    const deletedProperty = await Property.findByIdAndDelete(propertyId);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Remove the property ID from the user's properties array
    await User.findByIdAndUpdate(deletedProperty.postedBy, {
      $pull: { properties: propertyId },
    });

    res.status(200).json({
      status: "success",
      message: "Property deleted successfully",
      deletedProperty,
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Failed to delete property" });
  }
};

// for property update 
exports.updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const updates = req.body; // Data to update
    // Find the property by ID and update it in the database
    const updateProperty = await Property.findByIdAndUpdate(
      propertyId,
      updates,
      { new: true } // Return the updated document
    );

    if (!updateProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Property updated successfully",
      updateProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Failed to update property" });
  }
};

