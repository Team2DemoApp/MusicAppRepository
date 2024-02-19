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

//User can update avatar
async function createUserAvatar(req, res){
  try{
    const _id = req.params.id;
    const { avatarUrl } = req.body;
    const updatedAvatarUser = await UserService.Useravatar(  
      _id, 
      avatarUrl
    );
    if (!updatedAvatarUser) {
      res.status(500).json({
        Message: "Avatar is Not Updated"
        });
    }
    else{
      res.status(200).json({
        Message: "Avatar is Updated",
        updatedAvatarUser
      });
    }
  }
  catch(err){
    res.status(500).send(error);
  }
}

//Gets User's avatar
async function getUsersAvatarById(req, res) {
  try {
    const _id = req.params.id;
    const userAvatarData = await UserService.getUsersById(_id);
    if (!userAvatarData) {
      res.status(200).json({
        Message: "No Users"
      });
    } else {
      res.status(200).send(userAvatarData.avatarUrl);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//User can update comment for the song
async function addUserComment(req, res){
  try{
    const _id = req.params.id;
    const { comment } = req.body;
    const userComment = await UserService.UserComment(  
      _id, 
      comment
    );
    if (!userComment) {
      res.status(500).json({
        Message: "Comment is Not Updated"
        });
    }
    else{
      res.status(200).json({
        Message: "Comment is Updated",
        userComment
      });
    }
  }
  catch(err){
    res.status(500).send(error);
  }
}

//User can update comment for the song
async function getUserCommentById(req, res) {
  try {
    const _id = req.params.id;
    const userCommentData = await UserService.getUserCommentById(_id);
    if (!userCommentData) {
      res.status(200).json({
        Message: "No Users"
      });
    } else {
      res.status(200).send(userCommentData.comment);
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
  createUserAvatar,
  getUsersAvatarById,
  addUserComment,
  getUserCommentById
};
