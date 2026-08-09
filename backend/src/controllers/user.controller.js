import createHttpError from "http-errors";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
const { verify } = pkg;

import { config } from "../config/config.js";
const { sign } = pkg;
const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validation
  try {
    if (!name || !email || !password) {
      return next(createHttpError(400, "Please enter all details."));
    }
    const user = await User.findOne({ email });
    if (user) {
      return next(createHttpError(400, "User already exists."));
    }
  } catch (error) {
    return next(createHttpError(500, "Network Error"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = sign({ sub: newUser._id }, config.jwt_secret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
    res.json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user."));
  }
};


const loginUser = async(req,res,next)=>{
    const {email,password} = req.body;
    try {
        if(!email||!password){
            return next(createHttpError(400,"Please enter valid credentials.!"))
        }
        const getuser = await User.findOne({email});
        if(!getuser){
                return next(createHttpError(400, "User not exits."))
            }
        const isMatch = await bcrypt.compare(password,getuser.password);
        if(!isMatch){
            return next(createHttpError(400,"Please enter valid credentials."))
        }
        const token = sign({sub:getuser._id},config.jwt_secret,{expiresIn:"7d",algorithm:"HS256"})

        res.json({accessToken:token});
    } catch (error) {
        return next(createHttpError(500,"Error in validating user."))
    }
}


const userAuth = async(req,res,next)=>{
  const accessToken = req.header("Authorization")||req.header("authorization");
  if(!accessToken) next(createHttpError(401,"Access token is required to auth the user."))
  try {
    const parsedToken = accessToken.split(" ")[1];
    const access = verify(parsedToken,config.jwt_secret);
    console.log(access);
    res.statusCode(200);

  } catch (error) {
    return next(createHttpError(501, "Please enter vailed acces token:",error))
  }
}

export { createUser, loginUser,userAuth };
