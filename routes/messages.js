const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Message = require("../models/message");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

router.get("/", async function (req, res) {
  try {
    const messages = await Message.find();
    const messagesComplete = await Promise.all(
      messages.map(async (message) => {
        const user = await User.findById(message.user, "-password");
        message.user = user;
        return message;
      })
    );

    return res.status(200).json({
      myMsgSucess: "Mensagem recuperada com sucesso.",
      objSMessageSRecuperadoS: messagesComplete,
    });
  } catch (e) {
    return res.status(500).json({
      myErroTitle: "Um erro aconteceu na hora de buscar a mensagem",
      myError: e,
    });
  }
});

router.post("/", ensureAuthenticated, async function (req, res, next) {
  try {
    var message = new Message({
      content: req.body.content,
      user: req.userId,
    });
    const messageSaved = await message.save();

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $addToSet: { messages: messageSaved.id },
      },
      { projection: "-password", new: true }
    );

    messageSaved.user = user;
    res.status(201).json({
      myMsgSucess: "Mensagem salva com sucesso.",
      messageSaved,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      myErrorTitle: "Um erro aconteceu na hora de salvar.",
      myError: e,
    });
  }
});

router.delete("/:id", async function (req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);
  await User.findByIdAndUpdate(message.user, {
    $pull: { messages: message.id },
  });

  return res.status(200).json({
    msgSuccess: "Mensagem deletada com sucesso.",
    objDeleted: message,
  });
});

module.exports = router;
