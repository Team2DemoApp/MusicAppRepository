var loginService = require("../services/service");


async function loginUser(req, res) {
    try {
      var token = await loginService.loginUser(
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
    }
  }

  async function changePassword(req, res) {
    try {
      var updateUser = await loginService.changePassword(
        req.body.email,
        req.body.password,
        req.body.rpassword
      );
      if (updateUser.userInfo =='') {
      res.status(401).json(updateUser);
      } else
      {
      res.status(200).json(updateUser);
      }
    } catch (error) {
      res.status(500).send(error);
      console.error("changePassword : " + error);
    }
}
 
  module.exports = { loginUser,changePassword };
 