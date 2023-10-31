const Photo = require("./model");

const { Sequelize } = require("sequelize");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const addPhoto = async (req, res) => {
  try {
    const result = await Photo.create(req.body);

    res.status(201).json({ message: "success", result });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error });
    }
    res.status(500).json({ message: error.message, error });
  }
};

const deletePhoto = async (req, res) => {
  try {
    if (!req.photo) {
      throw new Error("Photo is undefined");
    }
    const result = await Photo.destroy({
      where: {
        id: req.body.id,
      },
    });

    const successResponse = {
      message: "success",
      result,
    };
    res.send(successResponse);
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const result = await Photo.findAll();

    if (result.length >= 1) {
      res.status(201).json({ message: "success", result });
      return;
    }
    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { addPhoto, deletePhoto, getAllPhotos };
