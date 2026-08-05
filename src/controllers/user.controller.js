import createHttpError from "http-errors";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";

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

export { createUser };
