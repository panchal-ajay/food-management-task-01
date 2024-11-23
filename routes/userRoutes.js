const express = require("express");
const router = express.Router();
const userController = require("../controller/user/userManagement");

router.post("/register", userController.create);

module.exports = router;
