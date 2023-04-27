const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.reply(message.author.avatarURL).then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "funMirror",
  type: "fun", //social fun Private ou admin
  usage: "funMirror",
  desc: "je montre votre avatar"
}
