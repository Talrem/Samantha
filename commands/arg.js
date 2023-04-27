const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.channel.send({
    files : ['./images/arg.jpg']
  });
  return;
}

module.exports.help = {
  name: "arg",
  type: "fun",
  usage: "arg",
  desc: "je souffre avec vous."
}
