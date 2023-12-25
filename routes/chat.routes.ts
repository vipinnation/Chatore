import express from "express";
import checkAuth from "../app/middleware/checkAuth";
import { ChatController } from "../app/controller/chat.controller";
import { GroupChatController } from "../app/controller/group.controller";
const routes = express.Router();

routes.get("/fetch-chats", checkAuth, ChatController.fetchChats);
routes.post("/personal-chats", checkAuth, ChatController.fetchPersonalChats);

routes.post("/create-group", checkAuth, GroupChatController.createGroup);
routes.put("/rename-group/:id", checkAuth, GroupChatController.renameGroup);
export const chatRoutes = routes;