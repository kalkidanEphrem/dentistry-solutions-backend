import express from "express"
import usersController from "../controller/usersController"
import { defaults } from "pg";

//auth router
const usersRoute = express.Router();

usersRoute.get("/", usersController.getAllUsers);
usersRoute.get("/:id", usersController.getUserId);
usersRoute.post("/", usersController.creatUser);
usersRoute.put("/:id", usersController.updateUser);
usersRoute.delete("/:id", usersController.deleteUser);

export default usersRoute;
