import fs from "node:fs/promises";
import mongoose from "mongoose";
import Book from "../models/book.model.js";
import createHttpError from "http-errors";
import cloudinary from "../config/cloudinary_configs.js";


const createBook = async (req, res, next) => {
  const files = req.files;
  const coverImageFiles = files?.coverImage;
  const bookFiles = files?.file;

  if (!coverImageFiles?.length || !bookFiles?.length) {
    return next(createHttpError(400, "coverImage and file are required."));
  }

  const coverImageFile = coverImageFiles[0];
  const bookFile = bookFiles[0];

  try {
    const uploadImage = await cloudinary.uploader.upload(coverImageFile.path, {
      folder: "book-covers",
      resource_type: "image",
    });
    const uploadFile = await cloudinary.uploader.upload(bookFile.path, {
      folder: "book-files",
      resource_type: "auto",
    });

    const newBook = await Book.create({
      title: req.body.title || "Untitled",
      author: "6a72e1e9d9e6b8bbe4920cda",
      genre: req.body.genre || "Unknown",
      coverImage: uploadImage.secure_url || uploadImage.url,
      file: uploadFile.secure_url || uploadFile.url,
    });

    await fs.unlink(coverImageFile.path);
    await fs.unlink(bookFile.path);
    

    return res.status(201).json(newBook);
  } catch (error) {
    await fs.unlink(coverImageFile.path);
    await fs.unlink(bookFile.path);
    return next(
      createHttpError(500, error.message || "Failed to create book."),
    );
  }
};

export { createBook };
