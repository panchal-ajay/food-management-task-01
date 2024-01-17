const mongoose = require("mongoose");

const knownLanguageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    languageId: {
      type: mongoose.Types.ObjectId,
      ref: "language",
      require: true,
    },
    read: { type: Boolean, default: false },
    write: { type: Boolean, default: false },
    speak: { type: Boolean, default: false },
  },
  {
    collection: "known_language",
  }
);

module.exports = mongoose.model(
  knownLanguageSchema.options.collection,
  knownLanguageSchema
);
