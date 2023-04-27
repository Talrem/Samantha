const Discord = require("discord.js");
const can = require("../json/canPlay.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de faire ça.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
  can.can = 0;
  return message.channel.send("Je n'ai plus le droit de venir en vocal jusqu'à nouvel ordre. Utilisez `canPlay` pour que je puisse venir en vocal.")
}

module.exports.help = {
  name: "dontPlay",
  type: "Private", //social fun Private ou admin
  usage: "dontPlay",
  desc: "je ne peux pas venir en vocal."
}
