const mongoose = require("mongoose");

const adminLoginSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    accessToken: { type: String, require: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "admin" }
);

module.exports = mongoose.model(
  adminLoginSchema.options.collection,
  adminLoginSchema
);
