var express = require("express");
var router = express.Router();

var User = require("../models/user");
var Message = require("../models/message");

router.get("/:username", async function (req, res) {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );

    const messages = await Message.find({
      _id: { $in: user.messages },
    });
    const messagesComplete = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.user, "id username");
        message.user = user;
        return message;
      })
    );

    user.messages = messagesComplete;
    console.log(user);

    res.status(201).json({
      msgSuccess: "Usuário retornado com sucesso.",
      objRetrieved: user,
    });
  } catch (e) {
    return res.status(500).json({
      myErrorTitle: "Um erro aconteceu na hora de salvar.",
      myError: e,
    });
  }
});

router.post("/", async function (req, res) {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthday: req.body.birthday,
    genre: req.body.genre,
    username: req.body.username,
    password: req.body.password,
  });

  try {
    const userSaved = await user.save();
    res.status(201).json({
      msgSuccess: "Usuário salvo com sucesso.",
      objSaved: userSaved,
    });
  } catch (e) {
    return res.status(500).json({
      myErrorTitle: "Um erro aconteceu na hora de salvar.",
      myError: e,
    });
  }
});

module.exports = router;
