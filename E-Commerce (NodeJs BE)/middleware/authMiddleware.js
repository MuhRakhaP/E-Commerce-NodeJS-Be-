const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const authMiddleware = asynchandler(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Not Authorized Token Expired, Please Login Again");
    }
  } else {
    throw new Error("There Is No Token");
  }
});

const isAdmin = asynchandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You Are Not A Admin");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
