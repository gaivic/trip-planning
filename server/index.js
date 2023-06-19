import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import Post from "./models/Post.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const MONGO_URL = "mongodb://localhost/testdb";
const MONGO_URL = "mongodb+srv://NewTrip:newtrip@cluster0.vruc1uw.mongodb.net/test1?retryWrites=true&w=majority";
// const MONGO_URL = "mongodb+srv://gai910802:gai910802910802@cluster0.b6uplyp.mongodb.net/victor?retryWrites=true&w=majority";


const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
/* ROUTES WITH FILES */
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
// app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = 3030;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));