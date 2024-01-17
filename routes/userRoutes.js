const express = require("express");
const router = express.Router();
const userController = require("../controller/admin/user/userManagement");
const adminController = require("../controller/admin/adminManagement");

//Application update router
router.put("/update", userController.update);

//User update router
router.get("/list", userController.list);

//User list router
router.delete("/delete", userController.delete);

//Admin logout router
router.post("/logout", adminController.adminLogout);

module.exports = router;
