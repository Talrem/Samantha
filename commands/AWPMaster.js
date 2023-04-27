const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
		message.channel.send({
			files : ['./images/AWPMaster.gif']
		});
  return;
}

module.exports.help = {
  name: "AWPMaster",
  type: "fun",
	usage: "AWPMaster",
  desc: "je montre qu'Adrien est un AWP Master."
}
