const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  // Corrected order of parameters
  // Extract the token from the Authorization header
  const token = req.header("Authorization");
  
  // Check if token is present
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized - Token not provided" });
  }
  try {
    // Verify the token
    // console.log(process.env.key);
    const decoded = jwt.verify(token, process.env.KEY); // Replace 'your-secret-key' with your actual secret key

    // Attach user ID to the request object
    req.user = { userId: decoded.userId }; // Corrected assignment
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized - Invalid token" });
  }
};

module.exports = validateUser;
