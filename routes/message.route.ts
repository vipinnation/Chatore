import express from "express";
import { MessageController } from "../app/controller/message.controller";
import checkAuth from "../app/middleware/checkAuth";
const routes = express.Router();

routes.post("/", checkAuth, MessageController.sendMessage);


export const messageRoutes = routes;