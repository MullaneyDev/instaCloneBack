const Photo = require("./model");

const { Sequelize } = require("sequelize");

require("dotenv").config();

const jwt = require("jsonwebtoken");

const addPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);

    res.status(201).json({ message: "success", photo });
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
    const photo = await Photo.destroy({
      where: {
        id: req.body.id,
      },
    });

    const successResponse = {
      message: "success",
      photo,
    };
    res.send(successResponse);
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { addPhoto, deletePhoto };
