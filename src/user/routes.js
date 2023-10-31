const { Router } = require("express");
const userRouter = Router();

const {} = require("./controllers");

// register user in the body
userRouter.post("/register");

// login user, no pass hash or token check
userRouter.post("/login");

// get all users, mainly used for testing on backend
userRouter.get("/");

module.exports = userRouter;
