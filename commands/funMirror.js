const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.reply(message.author.avatarURL).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "funMirror",
  type: "fun", //social fun Private ou admin
  usage: "funMirror",
  desc: "je montre votre avatar"
}
