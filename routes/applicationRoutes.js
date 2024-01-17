const express = require("express");
const router = express.Router();
const userController = require("../controller/admin/user/userManagement");
const sumbitController = require("../controller/sumbit/sumbitApplication");

//application sumbit api
router.post("/sumbit", sumbitController.create);

//user create route
router.post("/user/create", userController.create);

module.exports = router;
