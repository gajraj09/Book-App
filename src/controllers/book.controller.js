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
      author: req.user,
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

const updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const files = req.files;
  let coverImagePath;
  let filePath;

  try {
    const getBook = await Book.findById(bookId);
    if (!getBook) {
      return next(createHttpError(404, "Book does not exist in database."));
    }

    if (String(getBook.author) !== String(req.user)) {
      return next(
        createHttpError(403, "You are not allowed to modify this book."),
      );
    }

    const updateFields = {
      title: req.body.title || getBook.title,
      genre: req.body.genre || getBook.genre,
    };

    if (files?.coverImage?.length) {
      const coverImageFile = files.coverImage[0];
      coverImagePath = coverImageFile.path;
      const uploadImage = await cloudinary.uploader.upload(coverImagePath, {
        folder: "book-covers",
        resource_type: "image",
      });
      updateFields.coverImage = uploadImage.secure_url || uploadImage.url;
    }

    if (files?.file?.length) {
      const bookFile = files.file[0];
      filePath = bookFile.path;
      const uploadFile = await cloudinary.uploader.upload(filePath, {
        folder: "book-files",
        resource_type: "auto",
      });
      updateFields.file = uploadFile.secure_url || uploadFile.url;
    }

    const updateData = await Book.findByIdAndUpdate(bookId, updateFields, {
      new: true,
    });
    if (!updateData) {
      return next(createHttpError(500, "Failed to update book."));
    }

    if (coverImagePath) await fs.unlink(coverImagePath);
    if (filePath) await fs.unlink(filePath);

    return res.json(updateData);
  } catch (error) {
    if (coverImagePath) {
      await fs.unlink(coverImagePath).catch(() => {});
    }
    if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }
    return next(
      createHttpError(500, error.message || "Failed to update the book."),
    );
  }
};

export { createBook, updateBook };
