import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoutes from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request bodies
app.use(express.json());

//Middleware for handling CORS POLICY
//Oprion 1: Allow all origins with default or cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(
//   cors(
//     {
//       origin: "http://localhost:3000",
//       methods: ['GET','POST','PUT','DELETE'],
//       allowedHeaders: ['Content-Type']
//     }
//   )
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(300).send("Hello World!");
});

app.use("/books", bookRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
