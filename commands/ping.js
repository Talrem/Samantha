const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    return message.reply(new Date().getTime() - message.createdTimestamp + " ms -- pong !");
}

module.exports.help = {
  name: "ping",
  type: "social",
  usage: "ping",
  desc: "Samantha répond à votre message."
}
