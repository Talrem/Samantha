const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args || args.length < 2) return message.reply("Veuillez préciser au moins deux choix.")
  let choix = ["Je dirais : ","Ce sera : ","Voici ma réponse : ","Prenez : "];
  return message.channel.send(choix[Math.floor(Math.random() * choix.length)] + args[Math.floor(Math.random() * args.length)]);
}

module.exports.help = {
  name: "chooseBetween",
  type: "fun",
  usage: "chooseBetween <choix1> ... <choixN>",
  desc: "Samantha choisira pour vous."
}
