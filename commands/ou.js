const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.channel.send("Aaand it's gone !\n", {
      file : './images/gone.gif'
    });
  return;
}

module.exports.help = {
  name: "ou",
  type: "social",
  usage: "ou",
  desc: "Aaand it's gone !"
}
