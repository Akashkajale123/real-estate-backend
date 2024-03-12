const express = require("express");
const authController = require("../Controllers/authControllers.js");

const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/signIn", authController.signIn);

module.exports = router;
