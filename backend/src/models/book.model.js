import mongoose from "mongoose";
import User from "./user.model.js";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description:{
      type:String,
      required:true
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
    },
    coverImage: {
      type: String,
      required: true,
    },
    coverImagePublicId: {
      type: String,
    },
    file: {
      type: String,
      required: true,
    },
    filePublicId: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
