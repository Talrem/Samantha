const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Vous ne pouvez pas suicider les gens.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let cible = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(cible.hasPermission("KICK_MEMBERS")) return message.reply("Vous ne pouvez pas suicider cette personne.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let res = 0;
  if(args[1]){
    if(args[1] < 1 || args[1] > 5){
      return message.reply("Vous ne pouvez pas tirer avec 0 balles ou 6 balles, au moins 1, au max 5.");
    }
  }
  res = Math.floor(Math.random() * 6) + 1;
  /*Pas du tout de la triche*/
  /*if(message.author.id == 203895998076944384 || message.author.id == 331845589367128075){
    res = 0;
  }
  if(message.author.id == 212556854147022849){
    res = 6;
  }*/
  /*Pas du tout la fin de la triche*/
  if(args[1]){
    if(res <= args[1]){
      message.guild.member(cible).kick("Pan !");
      return message.channel.send("Pan !");
    }
  }else if(res <= 1){
    message.guild.member(cible).kick("Pan !");
    return message.channel.send("Pan !");
  }
  return message.channel.send("Clic.")
}

module.exports.help = {
  name: "suicidezLe",
  type: "admin",
  usage: "suicidezLe <cible> <nombre de balles>",
  desc: "je joue a la roulette russe sur la cible. Si aucun nombre de balles n'est précisé, il y n'y en a qu'une, on peut mettre entre 1 et 5 balles dans le barrilet."
}
