import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createBook } from "../controllers/book.controller.js";
import multer from "multer";
const bookRouter = express();



bookRouter.post(
  "/",
  
  createBook,
);

export default bookRouter;
