const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de faire apparaître de l'argent comme ça.");
  }

  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  message.channel.send(`${pUser} a trouvé ${args[1]} pièces.`);

  fs.writeFile("./coins.json", JSON.stringify(coins), (err) =>{
    if(err) console.log(err);
  })

  return;
}

module.exports.help = {
  name: "giveMoney",
  type: "Private",
  usage: "giveMoney <utilisateur>",
  desc: "je fais apparaître de l'argent et le donne à la cible."
}
