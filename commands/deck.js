const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(!args.length) return message.reply("Veuillez préciser un ID.");
  let taille = sefile[-1].number;
  if(args[0] >= taille || args[0] < 0) return message.channel.send("Le deck n'existe pas.");
  return message.channel.send(args[0] + " " + sefile[args[0]].n + " " + sefile[args[0]].p + " " + sefile[args[0]].c + " " + sefile[args[0]].w + "\n" + sefile[args[0]].t);
}

module.exports.help = {
  name: "deck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "deck <ID>",
  desc: "je donne les caractéristiques d'un deck dont l'ID est fourni."
}
