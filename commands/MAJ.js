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
  .addField("modification", "Système de commande help de qualité enfin mis en place.")
  .addField("ajout", "+>chooseBetween <choix> <choix> <choix> : Donne une réponse aléatoire parmis une liste de choix passée en paramètres.")
  .addField("modification", "La commande +>roll est maintenant plus élaborée (possibilité de faire +>roll xdy avec x et y des nombres).")
  .addField("modification", "Système de banlist plus efficace et plus facilement modifiable.")
  .addField("ajout", "Samantha reconnait si une commande a été ratée et conseille de regarder l'aide.")
  .addField("ajout", "plein de trucs dans les logs dont tout le monde s'en fiche sauf moi.");
  return message.channel.send(botEmbed);
  return;
}

module.exports.help = {
  name: "MAJ",
  type: "social",
  usage: "MAJ",
  desc: "je vous donne les dernières modifications que j'ai reçues."
}
