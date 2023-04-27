const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    return message.reply(new Date().getTime() - message.createdTimestamp + " ms -- pong !").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "ping",
  type: "social",
  usage: "ping",
  desc: "je répond à votre message."
}
