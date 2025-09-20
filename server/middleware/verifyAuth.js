const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  // Extract token from cookies

  const token = req?.cookies?.authcookie;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decode;
    next();
  });
};

module.exports = verifyAuth;
