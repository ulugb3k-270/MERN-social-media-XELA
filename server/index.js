import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// ROUTES
import posts from "./routes/posts.js";
import auth from "./routes/auth.js"

dotenv.config();
const app = express();

// middlewares

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ROUTES
app.get("/", (req, res) => res.status(200).send("SERVER WORKING"));
app.use("/posts", posts);
app.use("/auth", auth)

// monogoose config
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Listening port on ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
