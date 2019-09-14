const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  switch(message.member.id){
    case '212556854147022849':
      message.reply('Oui, Maître').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
      var role = message.member.guild.roles.find('name', 'Bromo Or');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Bromo Rangers');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Dueliste');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'FEH');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'GM');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'mc');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'sm');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'L4D2');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Osu Player');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Adepte de Jérusalem');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Nearly Almost Everyone But Not Quite Yet');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'dontTouch');
      message.member.addRole(role)
    break;
    case '163298545967955969':
      message.reply("Bon ok, mais c'est bien parce que c'est toi.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
      role = message.member.guild.roles.find('name', 'Gaiall');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Dueliste');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'FEH');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'GM');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'mc');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'sm');
      message.member.addRole(role)
      role = message.member.guild.roles.find('name', 'Nearly Almost Everyone But Not Quite Yet');
      message.member.addRole(role)
    break;
    default:
      return message.reply("Seuls quelques élus possèdent un tel pouvoir...");
  };
  return;
}

module.exports.help = {
  name: "saveMe",
  type: "Private",
  usage: "saveMe",
  desc: "je rend Talrem administrateur du serveur où a été effectuée la commande."
}
