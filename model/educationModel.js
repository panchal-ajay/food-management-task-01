const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    course: { type: String, require: true },
    university: { type: String, require: true },
    year: { type: Number, require: true },
    percentage: { type: Number, require: true },
  },
  {
    collection: "education",
  }
);
module.exports = mongoose.model(
  EducationSchema.options.collection,
  EducationSchema
);
