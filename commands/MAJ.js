const Discord = require("discord.js")
/*
.addField("ajout", "")
.addField("modification", "")
.addField("suppression", "")
*/
module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botEmbed = new Discord.RichEmbed()
  .setDescription("Derniers ajouts au bot.")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("ajout", "+>gameRole : permet de s'ajouter ou retirer des rôles de jeu vidéo.")
  .addField("ajout", "Plein de trucs en rapport avec YuGiOh.")
  .addField("ajout", "Mise à jour à Discord V13.");
  return message.channel.send({embeds:[botEmbed]});
}

module.exports.help = {
  name: "MAJ",
  type: "social",
  usage: "MAJ",
  desc: "je vous donne les dernières modifications que j'ai reçues."
}
