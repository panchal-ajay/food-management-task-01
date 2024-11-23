const express = require("express");
const router = express.Router();
const authController = require("../controller/auth/authManagement");

//user login router
router.post("/login", authController.userLogin);

module.exports = router;
