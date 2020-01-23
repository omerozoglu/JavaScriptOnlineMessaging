const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Route
const authRoute = require("./src/routes/auth");
const messageRoute = require("./src/routes/messages");
dotenv.config();

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.info("Connected the DB");
  }
);

// Root route
app.get("/", (req, res) => {
  res.send("we are on home");
});

//Middleware
app.use(express.json());
app.use(helmet());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/messages", messageRoute);

//Listening to the server
app.listen(3000, "https://pure-taiga-84901.herokuapp.com", () =>
  console.log("Server Listening")
);
