const Discord = require("discord.js");
const can = require("../json/canPlay.json");

module.exports.run = async (bot, message, args) => {
  if(!can.can) return message.reply("Je n'ai pas actuellement le droit de venir en vocal...")
  if(message.member.voiceChannel){
    if(!message.guild.voiceConnection){
      message.member.voiceChannel.join()
        .then(connection => message.reply("Channel rejoint avec succès.")).then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }else{
      return message.reply("Je suis déjà en vocal").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
  }else{
    return message.reply("Vous devez être dans un channel vocal pour me faire venir.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
}

module.exports.help = {
  name: "join",
  type: "social", //social fun Private ou admin
  usage: "join",
  desc: "je viens en vocal"
}
