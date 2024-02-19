var UserService = require("../services/service");

// Create a new user
async function createUser(req, res) {
  try {
    const { username, email, password, rpassword } = req.body;
    var createduser = await UserService.createUser(
      username,
      email,
      password,
      rpassword
    );
    if(createduser.userInfo =='')
    {
      res.status(401).json({
        "Message" : createduser.message,
        "Error":createduser.error
      });
    }
    else{ res.status(200).json({
      Message: "User Created!!",
      userCreated: createduser.userInfo
    });}
     
  } catch (error) {
    res.status(500).send(error);
  }
}

async function editUser(req, res) {
  try {
    const _id = req.params.id;
    const { username, email, password, rpassword } = req.body;
    const updatedUser = await UserService.editUser(
      _id,
      username,
      email,
      password,
      rpassword
    );
    if (!updatedUser) {
      res.status(401).json({
        Message: "User Not Updated",
        updatedUser
      });
    } else {
      if (updatedUser != "Invalid User!!") {
        res.status(200).json({
          Message: "User Updated Successfully!!",
          updatedUser
        });
      } else {
        res.status(500).json({
          Message: "User Not Updated"
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const _id = req.params.id;
    const deletedUser = await UserService.deleteUser(_id);
    if (!deletedUser) {
      res.status(401).json({
        Message: "User Not Deleted"
      });
    } else {
      if (deletedUser != "Invalid User!!") {
        res.status(200).json({
          Message: "User Deleted Successfully!!",
          deletedUser
        });
      } else {
        res.status(500).json({
          Message: "User Not Updated"
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
async function getUsers(req, res) {
  try {
    const userData = await UserService.getUsers();
    if (!userData) {
      res.status(200).json({
        Message: "No Users"
      });
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send(error);
  }
}

async function getUsersById(req, res) {
  try {
    const _id = req.params.id;
    const userData = await UserService.getUsersById(_id);
    if (!userData) {
      res.status(200).json({
        Message: "No Users"
      });
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { createUser, editUser, deleteUser, getUsers, getUsersById };
