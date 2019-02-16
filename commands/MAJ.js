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
  .addField("ajout", "+>listSE : Donne la liste des effets sonores.")
  .addField("ajout", "+>dontPlay : M'interdis de venir en vocal.")
  .addField("ajout", "+>canPlay : M'autorise à venir en vocal.")
  .addField("ajout", "+>addSE <nom> <url> : Ajoute un effet sonore à ma liste.")
  .addField("ajout", "+>sE <nom> : Me fait jouer un effet sonore.")
  .addField("ajout", "+>play <url> : Envoit votre avatar.")
  .addField("ajout", "+>funMirror : Me fait jouer une vidéo youtube.")
  .addField("ajout", "+>leave : Me fait partir du vocal.")
  .addField("ajout", "+>join : Me faire venir en vocal.")
  .addField("ajout", "+>salt : Envoit du sel.")
  .addField("ajout", "+>resetThePurge : Rend la date de la prochaine purge indéfinie.");
  return message.channel.send(botEmbed);
  return;
}

module.exports.help = {
  name: "MAJ",
  type: "social",
  usage: "MAJ",
  desc: "je vous donne les dernières modifications que j'ai reçues."
}
