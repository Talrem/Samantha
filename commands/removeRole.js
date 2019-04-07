const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.reply('Seul mon créateur a le droit à cette commande').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!member) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  if(message.member.id === idfile.id){
    var roleName = args[1];
    for(i = 2; i < args.length ; i++){
      roleName += " " + args[i];
    }
    role = message.member.guild.roles.find('name', roleName);
    member.removeRole(role).catch(console.error);
  };
  return;
}

module.exports.help = {
  name: "removeRole",
  type: "Private",
  usage: "removeRole <utilisateur> <nom>",
  desc: "je retire un role qui existe déjà sur le serveur à l'utilisateur voulu."
}
