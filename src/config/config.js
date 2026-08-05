import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  mongodb_name: process.env.MONGODB_NAME,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
};

export const config = Object.freeze(_config);
