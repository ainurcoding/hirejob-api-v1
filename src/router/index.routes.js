const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const skillRoutes = require("./skill.routes");
const portofolioRoutes = require("./portofolio.routes");
const workexpRoutes = require("./workexp.routes");

router
  .use("/user", userRoutes)
  .use("/skill", skillRoutes)
  .use("/portofolio", portofolioRoutes)
  .use("/workexp", workexpRoutes);

module.exports = router;
