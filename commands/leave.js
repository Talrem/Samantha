const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas le droit de faire ça.");
  if(message.guild.voiceConnection){
    message.guild.voiceConnection.disconnect()
    return;
  }else{
    return message.reply("Je ne suis pas en vocal...").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
}

module.exports.help = {
  name: "leave",
  type: "admin", //social fun Private ou admin
  usage: "leave",
  desc: "je pars du vocal"
}
