const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../json/coins.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de taxer les gens comme ça.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!coins[message.author.id]){
    return message.reply("Vous n'avez pas d'argent").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;
  if(pCoins < args[1]) return message.reply("Vous n'avez pas assez d'argent").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  coins[message.author.id] = {
    coins: sCoins + parseInt(args[1])
  };
  coins[pUser.id] = {
    coins: pCoins - parseInt(args[1])
  };
  message.channel.send(`${message.author} a taxé ${pUser} de ${args[1]} pièces.`).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) =>{
    if(err) console.log(err);
  })
  return;
}

module.exports.help = {
  name: "tax",
  type: "Private",
  usage: "tax <utilisateur> <nombre>",
  desc: "je prend le nombre de pièces à la cible et le donne à Talrem."
}
