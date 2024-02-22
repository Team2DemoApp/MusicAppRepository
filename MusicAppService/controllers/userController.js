var UserService = require("../services/userService");

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
    if (createduser.userInfo == "") {
      res.status(401).json({
        Message: createduser.message,
        Error: createduser.error
      });
    } else {
      res.status(200).json({
        Message: "User created!!",
        userCreated: createduser.userInfo
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function editUser(req, res) {
  try {
    const _id = req.body.id;
    const { username, password, rpassword } = req.body;
    const updatedUser = await UserService.editUser(
      _id,
      username,
      password,
      rpassword
    );
    if (!updatedUser) {
      res.status(401).json({
        Message: "User details not updated",
        updatedUser
      });
    } else {
      if (updatedUser != "Invalid user!!") {
        res.status(200).json({
          Message: "User updated successfully!!",
          updatedUser
        });
      } else {
        res.status(500).json({
          Message: "User details not updated"
        });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const _id = req.body.id;
    const deletedUser = await UserService.deleteUser(_id);
    if (!deletedUser) {
      res.status(401).json({
        Message: "User not deleted"
      });
    } else {
      if (deletedUser != "Invalid user!!") {
        res.status(200).json({
          Message: "User deleted successfully!!",
          deletedUser
        });
      } else {
        res.status(500).json({
          Message: "User not deleted"
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
        Message: "No users exists"
      });
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getUsersById(req, res) {
  try {
    const _id = req.params.id;
    const userData = await UserService.getUsersById(_id);
    if (!userData) {
      res.status(200).json({
        Message: "User does not exists"
      });
    } else {
      res.status(200).send(userData);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//User can update avatar
async function createAvatar(req, res) {
  try {
    const { avatarUrl } = req.body;
    const updatedAvatar = await UserService.createAvatar(
      req.userinfo.email,
      avatarUrl
    );
    if (!updatedAvatar) {
      res.status(500).json({
        Message: "Avatar is not updated"
      });
    } else {
      res.status(200).json({
        Message: "Avatar is updated",
        updatedAvatar
      });
    }
  } catch (err) {
    res.status(500).send(error);
  }
}

//Gets User's avatar
async function getAvatar(req, res) {
  try {
    const userAvatarData = await UserService.getAvatar(req.userinfo.email,);
    if (!userAvatarData) {
      res.status(401).json({
        Message: "User does not exists"
      });
    } else {
      res.status(200).send({ Avatar: userAvatarData.avatarUrl });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createUser,
  editUser,
  deleteUser,
  getUsers,
  getUsersById,
  createAvatar,
  getAvatar
};
