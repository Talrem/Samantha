const Discord = require("discord.js");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit.");
  }
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let muteRole = message.guild.roles.find(`name`, "dontTouch");
  if(!toMute.roles.has(muteRole.id) && !protect[toMute.id])return message.channel.send("Cet utilisateur n'est pas protégé.");
  toMute.removeRole(muteRole.id);
  message.channel.send(`${toMute} n'est plus protégé.`)
}

module.exports.help = {
  name: "canTouch",
  type: "Private",
  usage: "canTouch <utilisateur>",
  desc: "Samantha peut à nouveau appliquer les commandes d'administration à la cible."
}
