const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const can = require("../json/canPlay.json");

function playing(connection, message){
  var server = servers[message.guild.id]
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  server.queue.shift();
  server.dispatcher.on("end", function(){
    if(server.queue[0]){
      playing(connection, message);
    }else{
      connection.disconnect();
    }
  });
}

module.exports.run = async (bot, message, args) => {
  if(!can.can) return message.reply("Je n'ai pas actuellement le droit de venir en vocal...")
  if(message.member.voiceChannel){
    if(!args[0]) return message.reply("Veuillez préciser une url.")
    if(!message.guild.voiceConnection){
      if(!servers[message.guild.id]){
        servers[message.guild.id] = {queue:[]}
      }
      message.member.voiceChannel.join()
      .then(connection =>{
        var server = servers[message.guild.id];
        message.reply("Channel " + message.member.voiceChannel.name + " rejoint avec succès.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
        server.queue.push(args[0])
        playing(connection, message);
      })
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
  name: "play",
  type: "fun", //social fun Private ou admin
  usage: "play <url>",
  desc: "je joue la musique"
}
