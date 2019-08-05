const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  if(!args.length) return message.reply("Veuillez préciser un ID.");
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.channel.send("Le deck n'existe pas.");
  return message.channel.send(sefile[args[0]].n + " " + sefile[args[0]].p + " " + sefile[args[0]].c + " " + sefile[args[0]].w + " " + sefile[args[0]].t);
}

module.exports.help = {
  name: "deck",
  type: "social", //social fun Private ou admin
  usage: "deck <ID>",
  desc: "je donne les caractéristiques d'un deck dont l'ID est fourni."
}
