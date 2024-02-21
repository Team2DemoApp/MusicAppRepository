const Users = require("../model/user");
const bcrypt = require("bcryptjs");

var result = {
  userInfo: "",
  message: "",
  error: ""
};

async function createUser(username, email, password, rpassword) {
  try {
    result.message = "";
    result.userInfo = "";
    result.error = "";
    if (password === rpassword) {
      const userRegister = new Users({
        username: username,
        email: email,
        password: password,
        rpassword: rpassword
      });
      const registered = await userRegister.save();
      result.userInfo = registered;
      return result;
    } else {
      result.message = "Passwords do NOT match";
      return result;
    }
  } catch (error) {
    result.error = error;
    return result;
  }
}

async function editUser(_id, username, password, rpassword) {
  try {
    const userData = await Users.findOne({ _id });
    if (!userData) {
      return "Invalid user!!";
    } else {
      if (password === rpassword) {
        const editUser = new Users({
          username: username,
          email: userData.email,
          password: password,
          rpassword: rpassword
        });

        password = await bcrypt.hash(password, 10);
        rpassword = await bcrypt.hash(rpassword, 10);
        const getupdatedusers = await Users.findByIdAndUpdate(
          { _id: _id },
          {
            username: editUser.username,
            password: password,
            rpassword: rpassword
          },
          {
            new: true
          }
        );
        return getupdatedusers;
      }
    }
  } catch (error) {
    return error;
  }
}

async function deleteUser(_id) {
  try {
    const userData = await Users.findOne({ _id });
    if (!userData) {
      return "Invalid user!!";
    } else {
      const getdeletedusers = await Users.findByIdAndDelete(_id);
      console.log(getdeletedusers);
      return getdeletedusers;
    }
  } catch (error) {
    return error;
  }
}

async function getUsers() {
  try {
    const userData = await Users.find({});
    return userData;
  } catch (error) {
    return error;
  }
}

async function getUsersById(_id) {
  try {
    const userData = await Users.findById({ _id });
    return userData;
  } catch (error) {
    return error;
  }
}

// creates a avatar
async function createAvatar(_id, avatarUrl) {
  try {
    const getavataruser = await Users.findByIdAndUpdate(
      { _id: _id },
      {
        avatarUrl: avatarUrl
      },
      {
        new: true
      }
    );
    return getavataruser;
  } catch (error) {
    return error;
  }
}

//get avatar
async function getAvatar(_id) {
  try {
    const useravatar = await Users.findById({ _id });
    return useravatar;
  } catch (error) {
    return error;
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
