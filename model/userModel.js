const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    address: { type: String, require: true },
    gender: { type: String, require: true },
    contact: { type: Number, require: true },
    password: { type: String, require: true },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
  },
  {
    collection: "user",
  }
);

module.exports = mongoose.model(UserSchema.options.collection, UserSchema);
