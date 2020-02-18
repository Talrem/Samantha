const Discord = require("discord.js");
let purge = require("../json/purge.json");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  purge.date = ""
  return message.reply("La purge a été supprimée avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "resetThePurge",
  type: "admin", //social fun Private ou admin
  usage: "resetThePurge",
  desc: "je met la date de la purge en indéfinie."
}
