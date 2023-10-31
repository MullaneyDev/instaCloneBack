const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Photo = connection.define("Photo", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Photo;
