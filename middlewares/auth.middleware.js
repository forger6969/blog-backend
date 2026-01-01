const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ succes: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ succes: false, message: "No token provided" });
    }

    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");

    req.user = { id: decoded.id };

    next(); 
  } catch (err) {
    console.log(err);
    return res.status(401).json({ succes: false, message: "Invalid token" });
  }
};

module.exports = {authMiddleware};
