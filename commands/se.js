const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const sefile = require("../json/soundEffect.json");
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
  if(!args[0]){
    return message.reply("Veuillez préciser un argument parmis ceux de `listSE`");
  }
  if(!sefile[args[0].toUpperCase()]){
    return message.reply("Le son n'a pas été trouvé... veuillez utiliser `listSE` pour connaître tout les effets sonores disponibles.");
  }
  if(!message.guild.voiceConnection){
    if(message.member.voiceChannel){
      if(!servers[message.guild.id]){
        servers[message.guild.id] = {queue:[]}
      }
      message.member.voiceChannel.join()
      .then(connection =>{
        var server = servers[message.guild.id];
        server.queue.push(sefile[args[0].toUpperCase()].url)
        playing(connection, message);
      })
    }else{
      return message.reply("Vous devez être dans un channel vocal pour me faire venir.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }
  }else{
    return message.reply("Je suis déjà en vocal").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
}

module.exports.help = {
  name: "se",
  type: "fun", //social fun Private ou admin
  usage: "se <nom de l'effet>",
  desc: "je joue l'effet sonore. Pour avoir la liste des effets sonores, utilisez `listSE`"
} //  ``
