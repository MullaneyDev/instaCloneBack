require("dotenv").config();
const express = require("express");
require("./db/connection");
const cors = require("cors");

const User = require("./user/model");
const userRouter = require("./user/routes");

const Photo = require("./photo/model");
const photoRouter = require("./photo/routes");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/photo", photoRouter);

const syncTables = async () => {
  await User.hasMany(Photo);
  await Photo.belongsTo(User);

  await User.sync({ alter: true });
  await Photo.sync({ alter: true });
};

app.get("/health", (req, res) => {
  res.json(200).json({ message: "API is healthy!" });
});

app.listen(port, async () => {
  try {
    await syncTables();
    console.log("Database tables synced successfully");
  } catch (error) {
    console.error("Error syncing tables.", error);
  }
  console.log("App is listening...");
});
