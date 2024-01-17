const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin/adminManagement");

//Admin login router
router.post("/login", adminController.adminLogin);

module.exports = router;
