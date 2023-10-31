const { Router } = require("express");
const userRouter = Router();


const {
  registerUser,
  loginUser,
  getAllUsers,
  photosByUser,
} = require("./controllers");

const { registerUser, loginUser, getAllUsers } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");


// register user in the body
userRouter.post("/register", hashPass, registerUser);

// login user, no pass hash or token check
userRouter.post("/login", comparePass, loginUser);

// get all users, mainly used for testing on backend
userRouter.get("/", getAllUsers);


// get pictures of username
userRouter.get("/:username", photosByUser);

// token check for persistent login
userRouter.get("/authCheck", tokenCheck, loginUser);


module.exports = userRouter;
