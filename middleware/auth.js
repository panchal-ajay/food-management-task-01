const jwt = require("jsonwebtoken");

// middleware function for handling authentication
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, "your-secret-key");

    if (decodedToken.role == "admin") {
      req.adminId = { adminId: decodedToken.adminId, role: "admin" };
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error: "some thing went wrong" });
  }
};

module.exports = authMiddleware;
