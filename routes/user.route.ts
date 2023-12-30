import express from "express";
import { UserController } from "../app/controller/user.controller";
import checkAuth from "../app/middleware/checkAuth";
const route = express.Router();

route.get("/search", checkAuth, UserController.searchUser);


route.get("/", UserController.getUsers);
route.post("/", UserController.addUser);
route.put("/:id", UserController.update);
route.delete("/:id", UserController.deleteUser);


export const userRoute = route; 