var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

var User = require("../models/user");

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      error: "Credenciais inválidas",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      error: "Usuário não existe",
    });
  }

  if (!(await user.isPasswordValid(password))) {
    return res.status(401).json({
      error: "Senha inválida",
    });
  }

  const { id, username } = user;
  const token = jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  return res.json({ token, username });
});

module.exports = router;
