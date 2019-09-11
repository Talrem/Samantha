const Discord = require("discord.js")
const fs = require("fs");
const sefile = require("../russianLeader.json");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]) || message.guild.member(message.author);
  if(!rUser) return message.reply("L'utilisateur n'a pas été trouvé").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  sefile[rUser.id] = {
    essais : 0,
    morts : 0,
    combo : 0,
    maxCombo : 0
  }
  fs.writeFile("./russianLeader.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Fait.")
}

module.exports.help = {
  name: "russianReset",
  type: "Private",
  usage: "russianReset <utilisateur>",
  desc: "je remet à 0 le nombre d'essais, morts, combo et combo Max de la cible à la `russianRoulette`."
}
