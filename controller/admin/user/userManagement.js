const User = require("../../../model/userModel");
const Education = require("../../../model/educationModel");
const Experience = require("../../../model/experienceModel");
const KnownLangugae = require("../../../model/knownLanguageModel");
const Technical = require("../../../model/technicalModel");

const UserController = {
  // API to create a new user
  create: async (req, res) => {
    const { name, email, address, gender, contact } = req.body;
    try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      // Create a new user
      const newUser = new User({
        name,
        email,
        address,
        gender,
        contact,
      });
      await newUser.save();
      res.json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error: ", error);
      res.status(400).json({ error: "Error creating user details" });
    }
  },
  // API to update user details
  update: async (req, res) => {
    const {
      updateUserDetails,
      updateEducationDetails,
      experienceDetails,
      knownLanguages,
      techniqueDetails,
    } = req.body;

    try {
      // Update User Details
      for (const userDetails of updateUserDetails) {
        const { id, name, email, address, gender, contact } = userDetails;
        const findUser = await User.findById(id);
        if (!findUser) {
          return res.status(400).json({ error: "User not found" });
        }
        const updateUser = await User.findByIdAndUpdate(
          id,
          { name, email, address, gender, contact },
          { new: true }
        );
        if (!updateUser) {
          return res.status(400).json({ error: "Error updating user details" });
        }
      }

      // Update Education Details
      for (const edu of updateEducationDetails) {
        const { educationId, university, year, percentage, course } = edu;
        const updateEducation = await Education.findByIdAndUpdate(
          educationId,
          { university, year, percentage, course },
          { new: true }
        );
        if (!updateEducation) {
          return res.status(400).json({ error: "Education not found" });
        }
      }

      // Update Experience Details
      for (const exp of experienceDetails) {
        const { experienceId, company, designation } = exp;
        const updateExperience = await Experience.findByIdAndUpdate(
          experienceId,
          { company, designation },
          { new: true }
        );
        if (!updateExperience) {
          return res.status(400).json({ error: "Experience not found" });
        }
      }

      // Update Known Languages
      for (const lang of knownLanguages) {
        const { knownId, languageId, read, write, speak } = lang;
        const updateKnownLanguage = await KnownLangugae.findByIdAndUpdate(
          knownId,
          { languageId, read, write, speak },
          { new: true }
        );
        if (!updateKnownLanguage) {
          return res.status(400).json({ error: "Known Language not found" });
        }
      }

      // Update Technique Details
      for (const tech of techniqueDetails) {
        const { techniqueId, techniqueName, beginner, expert } = tech;
        const updateTechnical = await Technical.findByIdAndUpdate(
          techniqueId,
          { techniqueName, beginner, expert },
          { new: true }
        );
        if (!updateTechnical) {
          return res.status(400).json({ error: "Technical details not found" });
        }
      }
      // Update Education Details, Experience, Known Languages, and Technical Details
      res.json({
        message: "User details updated successfully",
        data: {
          updateUserDetails,
          updateEducationDetails,
          experienceDetails,
          knownLanguages,
          techniqueDetails,
        },
      });
    } catch (error) {
      console.error("Error: ", error);
      res.status(400).json({ error: "Error updating user details" });
    }
  },
  // API to list users with pagination, sorting, and search
  list: async (req, res) => {
    const { search, sort, page, limit } = req.body;
    try {
      const sortField = "createdAt";
      const sortOrder = sort === "desc" ? -1 : 1; // default asc
      const sortOptions = { [sortField]: sortOrder };
      const skipValue = (page - 1) * parseInt(limit);
      let count = {
        isActive: true,
        isDelete: false,
      };
      const totalUserCount = await User.countDocuments(count);

      const result = await User.aggregate([
        [
          {
            $lookup: {
              from: "education",
              localField: "_id",
              foreignField: "userId",
              as: "educationDetails",
            },
          },
          {
            $lookup: {
              from: "experience",
              localField: "_id",
              foreignField: "userId",
              as: "experienceDetails",
            },
          },
          {
            $lookup: {
              from: "known_language",
              localField: "_id",
              foreignField: "userId",
              as: "knownLanguageDetails",
            },
          },
          {
            $addFields: {
              languageId: "$knownLanguageDetails.languageId",
            },
          },
          {
            $lookup: {
              from: "known_language",
              localField: "languageId",
              foreignField: "languageId",
              as: "knownLanguage",
            },
          },
          {
            $unwind: {
              path: "$knownLanguage",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $lookup: {
              from: "language",
              localField: "knownLanguage.languageId",
              foreignField: "_id",
              as: "knownLanguage.language",
            },
          },
          {
            $unwind: {
              path: "$knownLanguage.language",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              "knownLanguage.language": "$knownLanguage.language.language",
            },
          },
          {
            $group: {
              _id: "$_id",
              name: {
                $first: "$name",
              },
              email: {
                $first: "$email",
              },
              address: {
                $first: "$address",
              },
              gender: {
                $first: "$gender",
              },
              contact: {
                $first: "$contact",
              },
              isActive: {
                $first: "$isActive",
              },
              isDelete: {
                $first: "$isDelete",
              },
              createdAt: {
                $first: "$createdAt",
              },
              updatedAt: {
                $first: "$updatedAt",
              },
              educationDetails: {
                $first: "$educationDetails",
              },
              experienceDetails: {
                $first: "$experienceDetails",
              },
              knownLanguage: {
                $push: "$knownLanguage",
              },
            },
          },
          {
            $lookup: {
              from: "technical_experience",
              localField: "_id",
              foreignField: "userId",
              as: "technicalExperienceDetails",
            },
          },
          {
            $group: {
              _id: "$_id",
              name: {
                $first: "$name",
              },
              email: {
                $first: "$email",
              },
              address: {
                $first: "$address",
              },
              gender: {
                $first: "$gender",
              },
              contact: {
                $first: "$contact",
              },
              isActive: {
                $first: "$isActive",
              },
              isDelete: {
                $first: "$isDelete",
              },
              createdAt: {
                $first: "$createdAt",
              },
              updatedAt: {
                $first: "$updatedAt",
              },
              educationDetails: {
                $first: "$educationDetails",
              },
              technicalExperienceDetails: {
                $first: "$technicalExperienceDetails",
              },
              knownLanguage: {
                $first: "$knownLanguage",
              },
            },
          },
          {
            $match: {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { address: { $regex: search, $options: "i" } },
                { gender: { $regex: search, $options: "i" } },
                { contact: { $regex: search, $options: "i" } },
                { isActive: { $regex: search, $options: "i" } },
                { isDelete: { $regex: search, $options: "i" } },
                {
                  educationDetails: {
                    $elemMatch: {
                      course: { $regex: search, $options: "i" },
                    },
                  },
                },
                {
                  educationDetails: {
                    $elemMatch: {
                      university: { $regex: search, $options: "i" },
                    },
                  },
                },
                {
                  technicalExperienceDetails: {
                    $elemMatch: {
                      techniqueName: { $regex: search, $options: "i" },
                    },
                  },
                },
                {
                  knownLanguage: {
                    $elemMatch: {
                      language: { $regex: search, $options: "i" },
                    },
                  },
                },
              ],
            },
          },
          {
            $skip: skipValue,
          },
          {
            $limit: parseInt(limit),
          },
          {
            $sort: sortOptions,
          },
        ],
      ]);

      res.json({
        message: "User fetch successfully",
        data: result,
        totalUserCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  // API to delete a user and associated details
  delete: async (req, res) => {
    const { id: userId } = req.body;
    try {
      // Delete User
      const deleteUser = await User.findByIdAndDelete(userId);
      if (!deleteUser) {
        return res.status(400).json({ error: "Error deleting user" });
      }

      // Delete Education Details
      const deleteEducationDetails = await Education.deleteMany({
        userId: userId,
      });
      if (!deleteEducationDetails) {
        return res.status(400).json({ error: "Error deleting education" });
      }

      // Delete Technical Experience Details
      const deletetechnicalExperienceDetails = await Technical.deleteMany({
        userId: userId,
      });
      if (!deletetechnicalExperienceDetails) {
        return res.status(400).json({ error: "Error deleting Technical" });
      }

      // Delete Known Languages
      const deleteKnownLanguage = await KnownLangugae.deleteMany({
        userId: userId,
      });
      if (!deleteKnownLanguage) {
        return res.status(400).json({ error: "Error deleting KnownLangugae" });
      }

      // Delete Experience Details
      const deleteExperience = await Experience.deleteMany({
        userId: userId,
      });
      if (!deleteExperience) {
        return res.status(400).json({ error: "Error deleting Experience" });
      }

      res.json({ message: "User application delete successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = UserController;
