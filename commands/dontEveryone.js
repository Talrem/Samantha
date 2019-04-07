const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  role = message.member.guild.roles.find('name', 'Nearly Almost Everyone But Not Quite Yet');
  message.member.removeRole(role)
  return;
}

module.exports.help = {
  name: "dontEveryone",
  type: "social",
  usage: "dontEveryone",
  desc: "je retire le rôle à l'utilisateur qui a effectué la commande."
}
