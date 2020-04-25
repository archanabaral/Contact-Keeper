const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("token");

  //check if not token

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); //once token is verified payload is put into decoded

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};
