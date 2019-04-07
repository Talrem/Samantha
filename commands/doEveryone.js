const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  role = message.member.guild.roles.find('name', 'Nearly Almost Everyone But Not Quite Yet');
  message.member.addRole(role)
  return;
}

module.exports.help = {
  name: "doEveryone",
  type: "social",
  usage: "doEveryone",
  desc: "j'ajoute le rôle à l'utilisateur qui a effectué la commande."
}
