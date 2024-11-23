const Order = require("../../model/orderModel");
const User = require("../../model/userModel");
const MenuItem = require("../../model/menuItemModel");
const { successResponse, errorResponse } = require("../../utils/responseHelper");
const {
    SOMETHING_WENT_WRONG,
    VALIDATION_ERROR,
    MENU_NOT_FOUND,
    ORDER_ITEMS_REQUIRED,
    ORDER_PLACED_SUCCESS,
    ORDER_NOT_FOUND,
    ORDER_FETCH_SUCCESS,
    ORDER_CANCELLED_SUCCESS,
    USER_ID_REQUIRE,
    USER_NOT_FOUND,
    ORDER_ALREADY_EXITS,
    ORDER_CANCELLED,
} = require("../../constants/messages");
const { TypeExceptions } = require("../../types/exceptions");

const orderController = {
    placeOrder: async (req, res) => {
        try {
            const { items, userId } = req.body;

            // Validate `userId`
            if (!userId) {
                return errorResponse(res, TypeExceptions.BadReqCommonFunction(USER_ID_REQUIRE));
            }

            // Validate if the user exists
            const user = await User.findById(userId);  // Assuming you have a User model
            if (!user) {
                return errorResponse(res, TypeExceptions.NotFoundCommonFunction(USER_NOT_FOUND), 404);
            }

            // Validate if `items` exist and are not empty
            if (!items || items.length === 0) {
                return errorResponse(res, TypeExceptions.BadReqCommonFunction(ORDER_ITEMS_REQUIRED));
            }

            let totalPrice = 0;

            // Validate each menu item
            for (const item of items) {
                const menuItem = await MenuItem.findById(item.menuId);

                // Check if the menu item exists and is available
                if (!menuItem || !menuItem.isAvailable) {
                    return errorResponse(res, TypeExceptions.NotFoundCommonFunction(MENU_NOT_FOUND), 404);
                }

                totalPrice += menuItem.price * item.quantity;
            }
            const existingOrder = await Order.findOne({ userId });
            if (existingOrder) {
                return errorResponse(res, TypeExceptions.AlreadyExistsCommonFunction(ORDER_ALREADY_EXITS));
            }


            // Create and save the order
            const order = new Order({ userId, items, totalPrice });
            await order.save();

            return successResponse(res, ORDER_PLACED_SUCCESS, order);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },


    // Get Order History
    getOrderHistory: async (req, res) => {
        try {
            const { userId } = req.params;

            // Fetch orders for the given user
            const orders = await Order.find({ userId }).sort({ createdAt: -1 }).populate("items.menuId");

            if (!orders || orders.length === 0) {
                return errorResponse(res, TypeExceptions.NotFoundCommonFunction(ORDER_NOT_FOUND), 404);
            }

            return successResponse(res, ORDER_FETCH_SUCCESS, orders);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },

    // Cancel Order
    cancelOrder: async (req, res) => {
        try {
            const { orderId } = req.params;

            // Find the order by ID
            const order = await Order.findById(orderId);

            if (!order) {
                return errorResponse(res, TypeExceptions.NotFoundCommonFunction(ORDER_NOT_FOUND), 404);
            }

            // Check if the order is already cancelled
            if (order.status === "Cancelled") {
                return errorResponse(res, TypeExceptions.BadReqCommonFunction(ORDER_CANCELLED), 400);
            }

            // Update order status to cancelled
            order.status = "Cancelled";
            await order.save();

            return successResponse(res, ORDER_CANCELLED_SUCCESS, order);
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    },
};

module.exports = orderController;
