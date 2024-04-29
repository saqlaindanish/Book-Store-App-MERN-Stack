import express from "express";
import { PORT, DATABASE_URL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();

// Middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))
app.use('/books', bookRoutes)

// create a book in Database
mongoose.connect(DATABASE_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running in the Port:" + PORT);
        })
        console.log("App is connected to DATABASE");
    })
    .catch((err) => {
        console.log(err);
    })