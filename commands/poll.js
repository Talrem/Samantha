const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.channel.send("Répondez au sondage en réagissant sous ce message !")
      .then(function (message) {
        message.react("👍")
        message.react("👎")
        message.react("🤷")
      })
  return;
}

module.exports.help = {
  name: "poll",
  type: "social",
  usage: "poll <question>",
  desc: "Permet aux utilisateurs de réagir à un sondage sur votre question."
}
