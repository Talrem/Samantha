const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.channel.send('', {
    file : './images/salt.jpg'
  });
  return;
}

module.exports.help = {
  name: "salt",
  type: "fun",
  usage: "salt",
  desc: "je vous donne du sel."
}
