const { Router } = require("express");
const userRouter = Router();

const { registerUser, loginUser, getAllUsers } = require("./controllers");

// register user in the body
userRouter.post("/register", registerUser);

// login user, no pass hash or token check
userRouter.post("/login", loginUser);

// get all users, mainly used for testing on backend
userRouter.get("/", getAllUsers);

module.exports = userRouter;
