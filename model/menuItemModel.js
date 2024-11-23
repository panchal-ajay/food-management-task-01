const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
},
    {
        collection: "menu",
    });

module.exports = mongoose.model(MenuItemSchema.options.collection, MenuItemSchema);
