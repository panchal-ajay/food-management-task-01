const express = require("express");
const router = express.Router();
const orderController = require("../controller/order/orderManagement");

router.post("/placeOder", orderController.placeOrder);
router.get("/history/:userId", orderController.getOrderHistory);
router.patch("/cancel/:orderId", orderController.cancelOrder);

module.exports = router;