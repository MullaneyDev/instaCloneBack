const User = require("./model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "success", newUser });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(412).json({ message: error.message, error });
      return;
    }
    res.status(500).json({ message: error.message, error });
  }
};

const loginUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();

    if (allUsers.length >= 1) {
      res.status(201).json({ message: "success", allUsers });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
};
