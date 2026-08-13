import createHttpError from "http-errors";
import pkg from "jsonwebtoken";
import { config } from "../config/config.js";
const { verify } = pkg;
import User from "../models/user.model.js";

const authenticateToken = async(req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");
  if (!authHeader) {
    return next(createHttpError(401, "Authorization token is required"));
  }

  const parsedToken = authHeader.split(" ")[1];

  

  try {
    const decoded = verify(parsedToken, config.jwt_secret);
    const getUser = await User.findById(decoded.sub);
    req.user = {_id: decoded.sub, name: getUser.name};

    return next();
    // res.json({ message: "Token is valid", user: req.user });
  } catch (error) {
    return next(createHttpError(401, "Invalid or expired token"));
  }
};

export default authenticateToken;
