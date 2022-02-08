import express from "express";
import MainController from "../controllers/MainController.js";
const mainRouter = express.Router();

const mainController = new MainController();

mainRouter.get("/", mainController.HelloWorld);

export default mainRouter;