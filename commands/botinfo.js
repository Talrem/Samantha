const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botEmbed = new Discord.RichEmbed()
  .setDescription("Un bot utilitaire qui a surtout des commandes fun, mais dont certaines peuvent être utiles")
  .setColor("#15f153")
  .setThumbnail(bicon)
  .addField("Nom", bot.user.username)
  .addField("Créé le", bot.user.createdAt);
  return message.channel.send(botEmbed).then(msg => msg.delete(60000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "botInfo",
  type: "social",
  usage: "botInfo",
  desc: "je vous donne tout ce qu'il y a à savoir sur moi."
}
