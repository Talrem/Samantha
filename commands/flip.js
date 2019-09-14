const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("Veuillez préciser un nombre de pièces à lancer.");
  if(message.author.id == 163298545967955969 && args[0] == 10000) return message.channel.send(`Vous avez obtenu 10000 faces et 0 piles.`);
  if(args[0] > 100000000 || args[0] < 1) return message.channel.send("Le nombre de pièces doit être compris entre 1 et 99999999.");
  let nbFace = 0;
  let i = 0;
  for(i = 0; i < args[0]; i++){
    if(Math.floor(Math.random() * 2)) nbFace++;
  }
  if(nbFace == 69 || i-nbFace == 69) message.channel.send("Nice");
  return message.channel.send(`Vous avez obtenu ${nbFace} faces et ${i - nbFace} piles.`);
}

module.exports.help = {
  name: "flip",
  type: "fun",
  usage: "flip <nb>",
  desc: "je lance le nombre de pièces donné en paramètre, puis annonce le résultat."
}
