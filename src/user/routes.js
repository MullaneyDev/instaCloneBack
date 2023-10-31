const { Router } = require("express");
const userRouter = Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  photosByUser,
} = require("./controllers");

// register user in the body
userRouter.post("/register", registerUser);

// login user, no pass hash or token check
userRouter.post("/login", loginUser);

// get all users, mainly used for testing on backend
userRouter.get("/", getAllUsers);

// get pictures of username
userRouter.get("/:username", photosByUser);

module.exports = userRouter;
