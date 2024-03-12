const bcrypt = require("bcrypt");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");
dotEnv.config();

// Function to generate a unique user ID
function generateUserID() {
  const prefix = "USR";
  const randomString = Math.random().toString(36).substr(2, 5); // Generate a random string
  return prefix + randomString;
}

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // Generate JWT token
    //console.log("key", process.env.KEY);
    const token = jwt.sign({ userId: user._id }, process.env.KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      Token: token,
      UserData: { Id: user._id, email_Id: user.email, userId: user.userID },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique user ID
    const userID = generateUserID();
    console.log(userID);

    const newUser = new User({ email, password: hashedPassword, userID });
    await newUser.save();
    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      UserData: newUser,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
