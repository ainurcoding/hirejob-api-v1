require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");

const main = require("./src/router/index.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// try {
//   app.use(express.static("public"));
//   app.use(cors());
//   // app.use(
//   //   helmet({
//   //     crossOriginResourcePolicy: false,
//   //   })
//   // );
//   app.use(xss());
//   app.use(morgan("dev"));
//   app.use(express.json());
//   // app.use(
//   //   express.urlencoded({
//   //     extended: false,
//   //   })
//   // );

//   app.use("/v1", main);
// } catch (err) {
//   console.error(err);
// }

// app.all("*", (req, res, next) => {
//   next(new createError.NotFound());
// });

// app.use((err, req, res) => {
//   const msg = err.message || "Internal Server Error";
//   const code = err.status || 500;

//   res.status(code).json({
//     message: msg,
//   });
// });

try {
  // app.use(express.static('public'));
  app.use(express.static("public/img"));
  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );
  app.use((req, res, next) => {
    require.setHeader('Access-Control-Allow-Origin', '*');
  })
  app.use(bodyParser.json());
  app.use(xss());
  app.use("/v1", main);
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
