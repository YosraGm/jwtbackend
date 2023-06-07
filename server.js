const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./dbinit");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

require("colors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
connectDB();
//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("welcome to my API");
});
app.listen(PORT, (req, res) => {
  console.log(`server is running on port number ${PORT}`.america);
});
