import express from "express";
import { createUser ,loginUser} from "../controllers/user.controller.js";
const userRouter = express();

userRouter.post("/register", createUser);
userRouter.post("/login",loginUser);

export default userRouter;
