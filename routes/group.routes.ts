import express from "express";
import { GroupChatController } from "../app/controller/group.controller";
import checkAuth from "../app/middleware/checkAuth";
const routes = express.Router();

routes.post("/", checkAuth, GroupChatController.createGroup);



export const groupRoutes = routes;