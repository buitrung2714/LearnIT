const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  //Not Found
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access Token not found" });

  try {
    //Check token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
