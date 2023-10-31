const Photo = require("../photo/model");
const User = require("./model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.status(201).json({ message: "success", result });
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
    const result = await User.findAll();

    if (result.length >= 1) {
      res.status(201).json({ message: "success", result });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const photosByUser = async (req, res) => {
  try {
    const result = await User.findOne({
      where: {
        username: req.params.username,
      },
      include: Photo,
    });
    res.status(201).json({ message: "success", result });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  photosByUser,
};
