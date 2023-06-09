const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "Login required",
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = data;

    const user = await User.findOne({
      _id: id,
      username,
    });

    if (!user) {
      return res.status(401).json({
        error: "Usuário inválido",
      });
    }

    req.userId = id;
    req.userUsername = username;
    return next();
  } catch (e) {
    return res.status(401).json({
      error: "Token expirado ou inválido.",
    });
  }
};
