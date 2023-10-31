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

module.exports = {
  registerUser,
  loginUser,
};
