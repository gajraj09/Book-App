import mongoose from "mongoose";
import { config } from "../config/config.js";

const connectDB = async () =>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Database Successfully Connected.",mongoose.connection.host)
        })
        mongoose.connection.on("error",(error)=>{
            console.error("Error in connecting to database.",error)
        })
        await mongoose.connect(config.mongo_uri,{
            dbName:config.mongodb_name
        })
        // console.log("DB Connected at",connectionInstance.connection.host)
        
        
    }
    catch(err){
        console.error("Failed to connect to Database.",err)
        process.exit(1);
    }

}

export default connectDB;