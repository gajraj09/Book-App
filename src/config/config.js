import {config as conf} from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    mongo_uri : process.env.MONGO_URI,
    mongodb_name:process.env.MONGODB_NAME,
    env : process.env.NODE_ENV,
}

export const config = Object.freeze(_config)
