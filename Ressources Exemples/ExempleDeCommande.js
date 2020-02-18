const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  return message.reply("Ceci est la commande d'exemple pour les autres commandes");
}

module.exports.help = {
  name: "ExempleDeCommande",
  type: "Private", //social fun Private ou admin
  usage: "ExempleDeCommande",
  desc: "Une description de ce que fait la commande"
}
