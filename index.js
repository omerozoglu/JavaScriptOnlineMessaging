const express = require("express"); // The Express philosophy is to provide small, robust tooling for HTTP servers, making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs.
const app = express();

const mongoose = require("mongoose"); // Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var compression = require("compression"); // Compression in Node.js and Express decreases the downloadable amount of data that’s served to users.
var helmet = require("helmet"); // Helmet is a collection of 13 middleware functions to help set some HTTP response headers.

const dotenv = require("dotenv"); // Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
require("dotenv").config({ path: ".env" });
dotenv.config();

//* Import Route
const authRoute = require("./src/routes/auth");
const messageRoute = require("./src/routes/messages");
const userRoute = require("./src/routes/user");

//* Google Cloud Functions Environment Variables
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

//* Mongoose setting
mongoose.set("useFindAndModify", false);
//* Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.info("Connected the DB");
  }
);

//* Root route
app.get("/", (req, res) => {
  res.send("we are on home");
});

//* Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(helmet());

//* Route Middlewares
app.use("/account", authRoute);
app.use("/accounts", userRoute);
app.use("/messages", messageRoute);

// TODO.: group Middlewares

//* Listening to the server
app.listen(3000, () => console.log(`Server Listening ${3000}`));
