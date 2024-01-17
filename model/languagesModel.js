const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema(
  {
    language: { type: String, require: true },
    read: { type: Boolean, default: false },
    write: { type: Boolean, default: false },
    speak: { type: Boolean, default: false },
  },
  {
    collection: "language",
  }
);

module.exports = mongoose.model(
  LanguageSchema.options.collection,
  LanguageSchema
);
