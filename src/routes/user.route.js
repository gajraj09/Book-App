import express from "express";
import { createUser } from "../controllers/user.controller.js";
const userRouter = express();

userRouter.post("/register", createUser);

export default userRouter;
