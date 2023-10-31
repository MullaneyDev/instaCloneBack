const { Router } = require("express");
const photoRouter = Router();

const Photo = require("./model");

const { addPhoto, deletePhoto, getAllPhotos } = require("./controllers");

photoRouter.post("/", addPhoto);

photoRouter.delete("/", deletePhoto);

photoRouter.get("/", getAllPhotos);

module.exports = photoRouter;
