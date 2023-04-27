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
  return message.channel.send({embeds:[serverEmbed]}).then(msg => msg.delete(60000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "servInfo",
  type: "social",
  usage: "servInfo",
  desc: "je donne tout ce qu'il y a à savoir sur le serveur où a été envoyé le message."
}
