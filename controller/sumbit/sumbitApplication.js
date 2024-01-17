const Education = require("../../model/educationModel");
const Experience = require("../../model/experienceModel");
const User = require("../../model/userModel");
const KnownLanguage = require("../../model/knownLanguageModel");
const Technical = require("../../model/technicalModel");

const sumbitController = {
  create: async (req, res) => {
    const {
      userId,
      educationDetails,
      experienceDetails,
      knownLanguages,
      techniqueDetails,
    } = req.body;

    try {
      const findUser = await User.findById(userId);
      if (!findUser) {
        return res.status(400).json({ error: "User not found" });
      }

      // Save educationDetails
      for (const ed of educationDetails) {
        const existingCourse = await Education.findOne({
          userId,
          course: { $regex: new RegExp(ed.course, "i") },
        });

        if (existingCourse) {
          return res
            .status(400)
            .json({ error: "User already added this course" });
        }

        const newEducation = new Education({ userId, ...ed });
        await newEducation.save();
      }

      // Save experienceDetails
      for (const exp of experienceDetails) {
        const newExperience = new Experience({ userId, ...exp });
        await newExperience.save();
      }

      // Save knownLanguages
      for (const lang of knownLanguages) {
        const newKnownLanguage = new KnownLanguage({ userId, ...lang });
        await newKnownLanguage.save();
      }

      // Save techniqueDetails
      for (const tech of techniqueDetails) {
        const newTechnical = new Technical({ userId, ...tech });
        await newTechnical.save();
      }

      res.json({
        message: "Application submitted successfully",
        data: {
          educationDetails,
          experienceDetails,
          knownLanguages,
          techniqueDetails,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = sumbitController;
