const Discord = require("discord.js")
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(message.author.id != idfile.id){
    return message.reply('Seul mon créateur a le droit à cette commande').then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(args.length < 2){
    return message.channel.send("Veuillez préciser un message.");
  }
  let i;
  let messageToSend = args[1];
  for(i = 2; i < args.length; i++){
    messageToSend += " " + args[i];
  }
  member.createDM().then(function(channel){
		return channel.send(messageToSend);
	}).catch(console.error);
}

module.exports.help = {
  name: "sendTo",
  type: "Private",
  usage: "sendTo <user> <message>",
  desc: "J'envois le message spécifié à la personne voulue."
}
