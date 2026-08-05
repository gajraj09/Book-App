import express from "express";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.get("/", (req, res, next) => {
    // const error = createHttpError(400,"Something went wrong!")
    // throw error
    res.json({ server: "Server is running." });
});
app.use(errorHandler)

export default app;
