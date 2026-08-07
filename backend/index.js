import app from './src/app.js'
import connectDB from './src/db/connectDB.js';
import {config} from "./src/config/config.js"





const startServer = async ()=>{
    await connectDB();
    const port = config.port || 5000;
    app.listen(port , ()=>{
        console.log(`Server is running on http://localhost:${port}`);
    })
}

startServer();