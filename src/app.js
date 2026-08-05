import express from "express";
const app = express();

app.get("/",(req,res,next)=>{
    res.json({server:"Server is running."});
})

export default app;
