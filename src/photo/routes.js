const { Router } = require("express");
const photoRouter = Router();

const User = require("./model");

const { addPhoto, deletePhoto } = require("./controllers");

photoRouter.post("/", addPhoto);

photoRouter.delete("/", deletePhoto);

module.exports = photoRouter;
