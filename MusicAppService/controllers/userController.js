const User = require("../model/user");

// Create a new user
async function createUser(req, res) {
  try {
    const { name, email, age } = req.body;
    const user = new User({ name, email, age });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

// Get all users
async function getAllUser(req, res) {
  try {
    const users = await User.find({ name: { $regex: "^sush" } }); // 'sushmita dube'});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = { createUser, getAllUser };
