const jwt = require("jsonwebtoken");
const { IVD_OR_EXPIRE, INVD_TOKEN_FORMAT, TOKEN_MISSING } = require("../constants/messages");
const { TypeExceptions } = require("../types/exceptions");
const { errorResponse } = require("../utils/responseHelper");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(errorResponse(res, TypeExceptions.Unauthorized(TOKEN_MISSING)));
  }

  const token = authorization.split(" ")[1];

  // If no token is provided
  if (!token) {
    return next(errorResponse(res, TypeExceptions.Unauthorized(INVD_TOKEN_FORMAT)));
  }

  try {
    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decodedToken.userId;

    // Continue with the request
    next();
  } catch (error) {
    return next(errorResponse(res, TypeExceptions.Unauthorized(IVD_OR_EXPIRE)));
  }
};

module.exports = authMiddleware;
