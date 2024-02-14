const jwt = require("jsonwebtoken");
const Users = require("../model/user");
require("../db");

const auth = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];
    if (typeof tokenHeader !== "undefined") {
      const verifyuser = jwt.verify(tokenHeader, process.env.SECRET_KET);
      const userinfo = await Users.findOne({ email: verifyuser.email });
      req.token = tokenHeader;
      req.userinfo = userinfo;
      next();
    } else {
      res.status(500).send({
        Error: "Authorization header missing and Token is not Valid",
      });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = auth;
