const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var helmet = require("helmet");
var compression = require("compression");
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

exports.helloEnvVars = (req, res) => {
  res.send(`<DOCTYPE html>
    <html>
      <head>
        <title>Google Cloud Functions Environment Variables Test</title>
      </head>
      <body>
        <h1>Google Cloud Functions Environment Variables Test</h1>
        <table>
        
          <tr>
            <th>NAME</th>
            <th>VALUE</th>
          </tr>
          <tr>
            <td>DB_CONNECTION</td>
            <td>${process.env.DB_CONNECTION || "UNKNOWN"}</td>
          </tr>
          <tr>
            <td>TOKEN_SECRET</td>
            <td>${process.env.TOKEN_SECRET || "UNKNOWN"}</td>
          </tr>
        </table>
      </body>
    </html>`);
};
// Root route
app.get("/", (req, res) => {
  res.send("we are on home");
});

//Middleware
app.use(express.json());
app.use(compression());
app.use(helmet());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/messages", messageRoute);

//Listening to the server
app.listen(3000, () => console.log("Server Listening"));
