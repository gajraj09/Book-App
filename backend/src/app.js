import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import userRouter from "./routes/user.route.js";
import bookRouter from "./routes/book.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  // const error = createHttpError(400,"Something went wrong!")
  // throw error
  res.json({ server: "Server is running." });
});
app.use("/api/user", userRouter);
app.use("/api/books",bookRouter);
app.use(errorHandler);

export default app;
