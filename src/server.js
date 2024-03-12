const express = require("express");
const mongoose = require("mongoose");
const dotEnv = require("dotenv");
const authRoutes = require("./Routes/authRoutes.js");
const propertyRoutes = require("./Routes/propertyRoutes.js");
const cors = require("cors");
dotEnv.config();

const app = express();
const PORT = process.env.PORT;

const URI ="mongodb+srv://akashkajale125:BuzgMLM7KAsGVGix@cluster1.fnodolx.mongodb.net/Real_Estate_properties?retryWrites=true&w=majority";

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Property Routes
app.use("/property", propertyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
