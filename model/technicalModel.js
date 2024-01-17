const mongoose = require("mongoose");

const TechnicalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    techniqueName: { type: String, require: true },
    beginner: { type: Boolean, default: false },
    mediator: { type: Boolean, default: false },
    expert: { type: Boolean, default: false },
  },
  {
    collection: "technical_experience",
  }
);
module.exports = mongoose.model(
  TechnicalSchema.options.collection,
  TechnicalSchema
);
