const Discord = require("discord.js")
const fs = require("fs");
const sefile = require("../russianLeader.json");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
  if(!rUser) return message.reply("L'utilisateur n'a pas été trouvé").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let rEssais = sefile[rUser.id].essais;
  let rMorts = sefile[rUser.id].morts;
  let rCombo = sefile[rUser.id].combo;
  let rMCombo = sefile[rUser.id].maxCombo;
  message.channel.send(`<@${rUser.id}> a essayé ${rEssais} fois et est mort ${rMorts} fois. Son combo est de ${rCombo} (maximum ${rMCombo}).`);

}

module.exports.help = {
  name: "russianLeader",
  type: "fun",
  usage: "russianLeader <utilisateur>",
  desc: "je donne le nombre d'essais, morts, combo et combo Max de la cible à la `russianRoulette`."
}
