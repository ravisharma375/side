var express = require("express");
var router = express.Router();
//user
var user = require("./user/user_api");
router.use("/user", user);
module.exports = router;
