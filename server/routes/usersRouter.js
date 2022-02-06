import express from "express";
import UsersController from "../controllers/UsersController.js";
const usersRouter = express.Router();

import cleanBody from "../middlewares/cleanBody.js";
import validateToken from "../middlewares/validateToken.js";

const users = new UsersController();

usersRouter.post("/signup", cleanBody, users.signup);

usersRouter.patch("/login", cleanBody, users.login);

usersRouter.patch("/logout", validateToken, users.logout);

export default usersRouter;