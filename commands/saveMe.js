const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.reply('Seul mon créateur a le droit à cette commande').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  if(message.member.id === idfile.id){
    message.reply('Oui, Maître').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    var role = message.member.guild.roles.find('name', 'Bromo Or');
    message.member.addRole(role)
    role = message.member.guild.roles.find('name', 'Bromo Rangers');
    message.member.addRole(role)
  };
  return;
}

module.exports.help = {
  name: "saveMe",
  type: "Private",
  usage: "saveMe",
  desc: "je rend Talrem administrateur du serveur où a été effectuée la commande."
}
