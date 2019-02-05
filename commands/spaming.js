const Discord = require("discord.js");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit d'utiliser cette commande. Sa seule vocation est de faire des tests sur la commande clear.");
  }
  if(args[0]){
    args[0] = parseInt(args[0],10);
    args[0] = args[0] + 1;
  }
  if(!args[0]) return message.channel.send("Précisez un nombre de messages à envoyer");
  let j = 0;
  for(j;j < args[0];j++){
    message.channel.send(j);
  }
  return message.reply("terminé !");
}

module.exports.help = {
  name: "spaming",
  type: "Private", //social fun Private ou admin
  usage: "spaming <nombre>",
  desc: "j'envois le nombre de message voulu."
}
