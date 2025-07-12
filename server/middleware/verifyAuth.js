const jwt = require("jsonwebtoken");

const verifyAuth = (req, res) => {
  const token = req.cookies.authcookie;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decode;
    next();
  });
};



module.exports = verifyAuth;
