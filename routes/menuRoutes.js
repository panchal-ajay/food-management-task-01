const express = require("express");
const router = express.Router();
const menuController = require("../controller/menu/menuManagement");

router.post("/addMenu", menuController.addMenu);

router.patch("/menu/:id", menuController.updateMenu);

router.get("/menu", menuController.getAllMenus);

router.delete("/menuDelete/:id", menuController.deleteMenu);


module.exports = router;
