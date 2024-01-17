const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    company: { type: String, require: true },
    designation: { type: String, require: true },
    from: { type: Date, default: Date.now() },
    to: { type: Date, default: Date.now() },
  },
  {
    collection: "experience",
  }
);

module.exports = mongoose.model(
  ExperienceSchema.options.collection,
  ExperienceSchema
);
