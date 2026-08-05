import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  mongodb_name: process.env.MONGODB_NAME,
  env: process.env.NODE_ENV,
  jwt_secret: process.env.JWT_SECRET,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
};

export const config = Object.freeze(_config);
