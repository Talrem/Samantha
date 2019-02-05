const Discord = require("discord.js");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  let cUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!cUser){
    cUser = message.author;
  }
  if(!coins[cUser.id]){
    coins[cUser.id] = {
      coins: 0
    };
  }

  let uCoins = coins[cUser.id].coins;

  let coinEmbed = new Discord.RichEmbed()
  .addField("Membre", cUser)
  .setColor("#00ff00")
  .addField(":moneybag:", uCoins);
  message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
  return;
}

module.exports.help = {
  name: "coins",
  type: "social",
  usage: "coins <utilisateur>",
  desc: "je donne le nombre de pièces de la cible (vous si aucune cible n'est précisée)."
}
