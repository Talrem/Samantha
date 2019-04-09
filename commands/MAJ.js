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
  .addField("ajout", "+>addons : me fait envoyer les liens des addons d'un type donné ou tout les addons si aucun type n'est précisé..")
  .addField("ajout", "+>shittyMusic : Me fait jouer de la shitty flute au pif dans ma liste.");
  return message.channel.send(botEmbed);
  return;
}

module.exports.help = {
  name: "MAJ",
  type: "social",
  usage: "MAJ",
  desc: "je vous donne les dernières modifications que j'ai reçues."
}
