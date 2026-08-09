import express from "express";
import { createUser ,loginUser, userAuth} from "../controllers/user.controller.js";
const userRouter = express();

userRouter.post("/register", createUser);
userRouter.post("/login",loginUser);
userRouter.get("/auth",userAuth);

export default userRouter;
