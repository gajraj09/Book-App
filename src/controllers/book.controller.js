import mongoose from "mongoose"
import Book from "../models/book.model.js"


const createBook = async(req,res,next)=>{
 console.log(req.file);
 req.json("/books hits")


}

export {createBook}