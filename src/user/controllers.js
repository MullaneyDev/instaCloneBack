const Photo = require("../photo/model");
const User = require("./model");
const jwt = require("jsonwebtoken");
const { findMissingRequiredFields } = require("../utils/utils.js");

const registerUser = async (req, res) => {
  try {
    const requiredFields = ["username", "email", "password"];
    const missingFields = findMissingRequiredFields(requiredFields, req.body);

    if (missingFields.length >= 1) {
      res
        .status(409)
        .json({ message: `${missingFields} is missing from request` });
      return;
    }
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
    if (req.user) {
      const token = await jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);
      res.status(201).json({
        message: "Success!",
        user: {
          username: req.user.username,
          email: req.user.email,
          token,
        },
      });
      return;
    }
    if (req.authCheck) {
      res.status(200).json({ message: "Success!", user });
      return;
    }
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

const updateUsername = async (req, res) => {
  try {
    const result = await User.update(
      { username: req.body.newUsername },
      { where: { username: req.body.username } }
    );
    res.status(201).json({ message: "Success!", result });
  } catch (error) {
    res.status(500).json({ message: error.mesage, error });
  }
};

const updatePass = async (req, res) => {
  try {
    const result = await User.update(
      {
        password: req.body.password,
      },
      {
        where: {
          username: req.params.username,
        },
      }
    );
    res.status(201).json({ message: "success", result });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const deleteUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  photosByUser,
  updateUsername,
  updatePass,
};
