const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Photo = sequelize.define("Photo", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Photo;
