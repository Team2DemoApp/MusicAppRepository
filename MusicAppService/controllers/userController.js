const User = require("../model/user");
const { userCreate, userEdit, userDelete,usersGet,usersGetById } = require("../services/service");


// Create a new user
async function createUser(req, res) {
  try {
    const { username, email, password, rpassword } = req.body;
    const createduser = await userCreate(
      username, email, password, rpassword
    );   
    res.status(200).json({
      Message:"User Created!!",
      createduser
  })
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function editUser(req, res) {
  try {
    const _id = req.params.id;
    const { username,email, password, rpassword } = req.body;
    const updatedUser = await userEdit(_id,
      username, email, password, rpassword
    ); 
    if(!updatedUser) {
      res.status(401).json({
        Message:"User Not Updated",
        updatedUser})
    } else{
      if(updatedUser != "Invalid User!!"){res.status(200).json({
        Message:"User Updated Successfully!!",
        updatedUser})}else{res.status(500).json({
          Message:"User Not Updated"}) }
      
    
  }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    const _id = req.params.id;
    const deletedUser = await userDelete(_id
    ); 
    if(!deletedUser) {
      res.status(401).json({
        Message:"User Not Deleted"})
    } else{
      if(deletedUser != "Invalid User!!"){res.status(200).json({
        Message:"User Deleted Successfully!!",
        deletedUser})}else{res.status(500).json({
          Message:"User Not Updated"}) }
      
    
  }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function getUsers(req, res) {
  try {
   
    const userData = await usersGet();
    if(!userData) {res.status(200).json({
      Message:"No Users"
      })}else { res.status(200).send(userData
        )
      }}
   catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getUsersById(req, res) {
  try {
    const _id = req.params.id;
    const userData = await usersGetById(_id);
    if(!userData) {res.status(200).json({
      Message:"No Users"
      })}else { res.status(200).send(userData
        )
      }}
   catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { createUser,editUser,deleteUser,getUsers,getUsersById };
