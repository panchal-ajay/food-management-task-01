const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../model/userModel");
const { successResponse, errorResponse } = require("../../utils/responseHelper");
const { TypeExceptions } = require("../../types/exceptions");
const { USER_LOGIN_SUCCESS, USER_INVALID_CREDENTIALS, SOMETHING_WENT_WRONG } = require("../../constants/messages");

const authController = {
    userLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                return errorResponse(res, TypeExceptions.Unauthorized(USER_INVALID_CREDENTIALS));
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return errorResponse(res, TypeExceptions.Unauthorized(USER_INVALID_CREDENTIALS));
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.SECRET_KEY,
                { expiresIn: "1h" }
            );

            const { password: _, ...userDetails } = user.toObject();

            return successResponse(res, USER_LOGIN_SUCCESS, { user: userDetails, token });
        } catch (error) {
            return errorResponse(res, TypeExceptions.UnknownError(SOMETHING_WENT_WRONG + error.message));
        }
    }
};

module.exports = authController;
