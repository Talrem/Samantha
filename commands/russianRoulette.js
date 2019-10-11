const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  let res = 0;
  if(args[0]){
    if(args[0] < 1 || args[0] > 5){
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
  let nbEssais = sefile[message.author.id].essais;
  let nbMorts = sefile[message.author.id].morts;
  let nbCombo = sefile[message.author.id].combo;
  let nbMaxCombo = sefile[message.author.id].maxCombo;
  if(args[0]){
    if(res <= args[0]){
      message.guild.member(kUser).kick("Pan !");
      return message.channel.send("Pan !");
    }
  }else if(res <= 1){
    message.guild.member(kUser).kick("Pan !");
    return message.channel.send("Pan !");
  }
  return message.channel.send("Clic.")
}

module.exports.help = {
  name: "russianRoulette",
  type: "fun",
  usage: "russianRoulette <nombre de balles>",
  desc: "je joue a la roulette russe. Si aucun nombre de balles n'est précisé, il y n'y en a qu'une, on peut mettre entre 1 et 5 balles dans le barrilet."
}
