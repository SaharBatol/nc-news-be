const express = require("express");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:username", getUserByUsername);

module.exports = userRouter;
