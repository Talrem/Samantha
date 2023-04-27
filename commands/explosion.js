const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
		message.channel.send({
			files : ['./images/explosion.gif']
		});
  return;
}

module.exports.help = {
  name: "explosion",
  type: "fun",
	usage: "explosion",
  desc: "Megumin lance une explosion."
}
