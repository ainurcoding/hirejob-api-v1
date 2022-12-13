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

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

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

app.use(xss());
// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);
app.use((req,res ,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization');
  next();
})

app.use("/v1", main);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
