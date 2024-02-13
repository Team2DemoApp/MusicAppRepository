const { userLogin } = require("../services/service");


async function loginUser(req, res) {
    try {
      var token = await userLogin(
        req.body.email,
        req.body.password
      );
      if (!token) {
      res.status(401).json({message:"Token Not Generated!!"});
      } else 
      {
      res.status(200).json({token});
      }
    } catch (error) {
      res.status(500).send(error);
      console.error("loginUser : " + error);
    }
  }

  module.exports = { loginUser };