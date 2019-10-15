var express = require("express");
var router = express.Router();

//login
var login = require("./login");
router.use("/login", login);
//registration
var registration = require("./registration");
router.use("/registration", registration);
module.exports = router;
