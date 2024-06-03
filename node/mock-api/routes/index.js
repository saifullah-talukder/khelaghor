const express = require("express");
const curieoRouter = require("./curieo.router");

const router = express.Router();

router.use("/curieo", curieoRouter);

module.exports = router;
