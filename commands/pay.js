const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");

module.exports.run = async (bot, message, args) => {
  if(!coins[message.author.id]){
    return message.reply("Vous n'avez pas d'argent")
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[1]) return message.reply("Vous n'avez pas assez d'argent");

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };
  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} a payé ${pUser} ${args[1]} pièces.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
    if(err) console.log(err);
  })

  return;
}

module.exports.help = {
  name: "pay",
  type: "social",
  usage: "pay <utilisateur> <nombre>",
  desc: "Samantha tranfère le nombre de pièces à la cible."
}