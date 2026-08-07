import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createBook, deleteBook, fetchAllBooks, fetchBook, updateBook } from "../controllers/book.controller.js";
import multer from "multer";
import authenticateToken from "../middleware/authenticate.js";
const bookRouter = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fieldSize: 3e7 },
});

bookRouter.post(
  "/",
  authenticateToken,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook,
);

bookRouter.patch(
  "/:bookId",
  authenticateToken,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook,
);
bookRouter.delete(
  "/:bookId",
  authenticateToken,
  deleteBook,
);
bookRouter.get(
  "/:bookId",
  fetchBook,
);
bookRouter.get(
  "/",
  fetchAllBooks,
);


export default bookRouter;
