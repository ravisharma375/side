const express = require("express");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
const router = express.Router();
const connection = require("../../db");
const crypto = require("crypto");

//login route
router.post("/", function(req, res, next) {
  let { email, password } = req.body;
  let key = crypto.pbkdf2Sync(password, "salt", 10, 10, "sha512");
  password = key.toString("hex");
  console.log(email, password);
  let sql = `select * from user where email='${email}' and password='${password}'`;
  connection.query(sql, function(error, result, fields) {
    console.log(result[0]);
    if (error) {
      return res.json({
        status: false,
        message: error
      });
    }
    console.log(result);
    if (result[0].id > 0) {
      const token = jwt.sign({ id: result[0].id }, process.env.TOKEN_SECRET);
      res
        .header("auth-token", token)
        .json({ msg: "login successful", tokenkey: token });
    }
  });
});

module.exports = router;
