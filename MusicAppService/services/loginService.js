const Users = require("../model/user");
const bcrypt = require("bcryptjs");

var result = {
    userInfo: "",
    message: "",
    error: ""
  };

async function loginUser(email, password) {
  try {
    result.message = "";
    result.userInfo = "";
    result.error = "";
    const userData = await Users.findOne({ email });
    if (!userData) {
      result.message = "User not found";
      return result;
    } else {
      const isMatch = await bcrypt.compare(password, userData.password);
      const userToken = await userData.generateAuthToken();
      if (isMatch) {
        result.userInfo = userToken;
        return result;
      } else {
        result.message = "Invalid User Details!!";
        return result;
      }
    }
  } catch (error) {
      console.log(error);
    result.error = error;
    return result;
  }
}

async function changePassword(email, password, rpassword) {
  try {
    result.message = "";
    result.userInfo = "";
    result.error = "";
    const userData = await Users.findOne({ email });
    if (!userData) {
      result.message = "Invalid User";
      return result;
    } else {
      if (password === rpassword) {
        const newPassword = await bcrypt.hash(password, 10);
        const newrPassword = await bcrypt.hash(rpassword, 10);
        const getupdatedusers = await Users.findByIdAndUpdate(
          { _id: userData._id },
          {
            password: newPassword,
            rpassword: newrPassword
          },
          {
            new: true
          }
        );
        result.message = "Password updated";
        result.userInfo = getupdatedusers;
        return result;
      } else {
        result.message = "Passwords do NOT match";
        return result;
      }
    }
  } catch (error) {
    result.error = error;
    result.message = "Password is not updated";
    return result;
  }
}

module.exports = { loginUser, changePassword };
