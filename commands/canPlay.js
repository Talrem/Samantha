const Discord = require("discord.js");
const can = require("../canPlay.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de faire ça.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  can.can = 1;
  return message.channel.send("Je peux venir en vocal jusqu'à nouvel ordre.")
}

module.exports.help = {
  name: "canPlay",
  type: "Private", //social fun Private ou admin
  usage: "canPlay",
  desc: "je peux venir en vocal."
}
