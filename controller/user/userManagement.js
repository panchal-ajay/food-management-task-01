const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const { successResponse, errorResponse } = require("../../utils/responseHelper");
const { TypeExceptions } = require("../../types/exceptions");
const { USER_CREATE_SUCCESS, SOMETHING_WENT_WRONG, USER_ALREADY_EXISTS } = require("../../constants/messages");

const UserController = {
  create: async (req, res) => {
    const { username, email, address, gender, contact, password } = req.body;

    try {
      // Check if the user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return errorResponse(res, TypeExceptions.AlreadyExistsCommonFunction(USER_ALREADY_EXISTS));
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        email,
        address,
        gender,
        contact,
        password: hashedPassword, // Store hashed password
      });

      await newUser.save();

      // Respond with success
      return successResponse(res, USER_CREATE_SUCCESS, newUser, 201);
    } catch (error) {
      return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
    }
  }
};

module.exports = UserController;
