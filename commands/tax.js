const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de taxer les gens comme ça.");
  }
  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!coins[message.author.id]){
    return message.reply("Vous n'avez pas d'argent")
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;
  if(pCoins < args[1]) return message.reply("Vous n'avez pas assez d'argent");
  coins[message.author.id] = {
    coins: sCoins + parseInt(args[1])
  };
  coins[pUser.id] = {
    coins: pCoins - parseInt(args[1])
  };
  message.channel.send(`${message.author} a taxé ${pUser} de ${args[1]} pièces.`);
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
    if(err) console.log(err);
  })
  return;
}

module.exports.help = {
  name: "tax",
  type: "Private",
  usage: "tax <utilisateur> <nombre>",
  desc: "Samantha prend le nombre de pièces à la cible et vous le donne."
}
