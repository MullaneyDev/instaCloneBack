const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const User = require("../user/model");

const hashPass = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    if (!req.body.username) {
      res.status(500).json({ message: "Username cannot be blank." });
      return;
    }

    req.user = await User.findOne({ where: { username: req.body.username } });
    if (!req.user) {
      res.status(401).json({ message: "Invalid username." });
      return;
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      req.user.password
    );
    if (!passwordMatch) {
      res.status(401).json({ message: "Unauthorised Login!" });
      return;
    }
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error });
  }
};

const tokenCheck = async (req, res, next) => {
  console.log("HELLO from token Check", req);
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.authCheck = await User.findOne({ where: { id: decodedToken.id } });
    console.log("REQdotAuth", req.authCheck);
    if (!req.authCheck) {
      const error = new Error("User is not Authorised");
      res.status(401).json({ message: error.message, error: error });
    }

    req.passwordMatch = true;
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  hashPass,
  comparePass,
  tokenCheck,
};
