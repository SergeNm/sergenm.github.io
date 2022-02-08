import express from "express";
import UsersController from "../controllers/UsersController.js";
const usersRouter = express.Router();

import cleanBody from "../middlewares/cleanBody.js";
import validateToken from "../middlewares/validateToken.js";

const users = new UsersController();

/**
  * @openapi
  * '/users/signup':
  *  post:
  *     tags:
  *     - Users
  *     summary: Add a User
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *            type: object
  *            required:
  *              - username
  *              - password
  *            properties:
  *              username:
  *                type: string
  *                default: email@gmail.com
  *              password:
  *                type: string
  *                default: password
  *     responses:
  *      201:
  *        description: Created
  *      409:
  *        description: Conflict
  *      404:
  *        description: Not Found
  */

usersRouter.post("/signup", cleanBody, users.signup);

/**
  * @openapi
  * '/users/login':
  *  patch:
  *     tags:
  *     - Users
  *     summary: Login a User
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *            type: object
  *            required:
  *              - username
  *              - password
  *            properties:
  *              username:
  *                type: string
  *                default: email@gmail.com
  *              password:
  *                type: string
  *                default: password
  *     responses:
  *      201:
  *        description: Success
  *      409:
  *        description: Conflict
  *      404:
  *        description: Not Found
  */
usersRouter.patch("/login", cleanBody, users.login);

usersRouter.patch("/logout", validateToken, users.logout);

export default usersRouter;