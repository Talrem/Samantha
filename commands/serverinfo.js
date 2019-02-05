const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverEmbed = new Discord.RichEmbed()
  .setColor("#15f153")
  .setThumbnail(sicon)
  .addField("Nom", message.guild.name)
  .addField("Créé le", message.guild.createdAt)
  .addField("Vous être arrivé", message.member.joinedAt)
  .addField("Membres", message.guild.memberCount);
  return message.channel.send(serverEmbed);
}

module.exports.help = {
  name: "serverinfo",
  type: "social",
  usage: "serverinfo",
  desc: "je donne tout ce qu'il y a à savoir sur le serveur où a été envoyé le message."
}
