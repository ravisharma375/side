const express = require("express");
const crypto = require("crypto");
const dotenv = require("dotenv");
const connection = require("../../db");
dotenv.config();

const router = express.Router();

router.post("/", (req, res) => {
  if (req.body.password !== req.body.confirm) {
    return res.json({ msg: "Password do not match" });
  }
  let key = crypto.pbkdf2Sync(req.body.password, "salt", 10, 10, "sha512");
  let password = key.toString("hex");

  let userexist = `SELECT count(email) as count from user where email='${req.body.email}'`;
  let userquery = connection.query(userexist, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0].count >= 1) {
      return res.json({
        msg: "Email already exists"
      });
    } else {
      let { username, email } = req.body;
      let adduserpost = {
        username: username,
        email: email,
        password: password
      };
      let sql = "INSERT INTO user SET ?";
      let query = connection.query(sql, adduserpost, (err, result) => {
        if (err) {
          console.log(err);
        }

        res.status(200).json({ msg: "User created Successfully" });
      });
    }
  });
});

module.exports = router;
