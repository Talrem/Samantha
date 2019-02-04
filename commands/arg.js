const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.channel.send('', {
    file : './images/arg.jpg'
  });
  return;
}

module.exports.help = {
  name: "arg",
  type: "fun",
  usage: "arg",
  desc: "Samantha souffre avec vous."
}
