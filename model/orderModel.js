const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }, 
        items: [
            {
                menuId: { type: mongoose.Schema.Types.ObjectId, ref: "menu", required: true },
                quantity: { type: Number, required: true },
                _id: false, // Disable the `_id` field for subdocuments
            },
        ],
        totalPrice: { type: Number, required: true },
        status: { type: String, default: "Placed" },
        createdAt: { type: Date, default: Date.now },
    },
    {
        collection: "order",
    }
);

module.exports = mongoose.model(OrderSchema.options.collection, OrderSchema);
