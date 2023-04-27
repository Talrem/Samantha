const Discord = require("discord.js");
let purge = require("../json/purge.json");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  purge.date = ""
  return message.reply("La purge a été supprimée avec succès.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "resetThePurge",
  type: "admin", //social fun Private ou admin
  usage: "resetThePurge",
  desc: "je met la date de la purge en indéfinie."
}
