const express = require("express");
const { getUserByUsername } = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.get("/:username", getUserByUsername);

module.exports = userRouter;
