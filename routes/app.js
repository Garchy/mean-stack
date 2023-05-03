var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/node-mongodb-mongoose-user", function (req, res, next) {
  res.render("node");
});

router.post("/formulario", async function (req, res, next) {
  const email = req.body.emailBody;
  const firstName = req.body.firstName || "";
  const lastName = req.body.lastName || "";
  const password = req.body.password || "";
  var userObject = new User({
    firstName,
    lastName,
    password,
    email,
  });
  await userObject.save();
  res.redirect("/user/" + email);
});

module.exports = router;
