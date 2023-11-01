const { Router } = require("express");
const photoRouter = Router();

const Photo = require("./model");

const { addPhoto, deletePhoto, getAllPhotos } = require("./controllers");
const { tokenCheck } = require("../middleware");

photoRouter.post("/", addPhoto);

photoRouter.delete("/", tokenCheck, deletePhoto);

photoRouter.get("/", getAllPhotos);

module.exports = photoRouter;
