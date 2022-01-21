const express = require("express");
const { getUserByUsername } = require("../controllers/users.controllers");

const userRouter = express.Router();

userRouter.get("/:username", getUserByUsername);

module.exports = userRouter;
