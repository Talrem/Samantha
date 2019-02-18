const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const can = require("../canPlay.json");

function alea(x){
  return Math.floor(Math.random() * x);
}

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
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Seul un administrateur a le droit à une telle puissance...")
  let shittyMusic = [
    /*take on me*/ "https://youtu.be/nF7lv1gfP1Q",
    /*URSS*/ "https://youtu.be/I5fenjzeh7g",
    /*Running in the 90's*/"https://youtu.be/pww4yVPvNfE",
    /*Marseillaise*/"https://youtu.be/SiAGwKw1kRc",
    /*GOT*/"https://youtu.be/zbMlVm7tn4Y",
    /*What is love ?*/"https://youtu.be/0CW3RGhRrxk",
    /*Thomas The tank engine*/"https://youtu.be/a-P0p_UtagM",
    /*Pokemon*/"https://youtu.be/pcBvkGFNCYY",
    /*Cruel Angel's Thesis*/"https://youtu.be/IGuBAku0Vkc",
    /*We are number One*/"https://youtu.be/-cIwYAcCerU",
    /*Attack On Titans*/"https://youtu.be/SAAFA5T_GBE",
    /*Duel of Fates*/"https://youtu.be/snpS8Qa42nc",
    /*Darude*/"https://www.youtube.com/watch?v=iF71wmzae6Y",
    /*MOGOLOVONIO*/"https://youtu.be/WmNDiJJXOTg"
  ];
  if(args[0] < 0 || args[0] > shittyMusic.length) return message.channel.send("Argument invalide, le numéro doit être compris entre 0 et " + (shittyMusic.length-1));
  if(message.member.voiceChannel){
    if(!servers[message.guild.id]){
      servers[message.guild.id] = {queue:[]}
    }
    message.member.voiceChannel.join()
    .then(connection =>{
      var server = servers[message.guild.id];
      if(!args[0]){
        server.queue.push(shittyMusic[alea(shittyMusic.length)])
      }else{
        server.queue.push(shittyMusic[args[0]])
      }
      playing(connection, message);
    })
  }else{
    return message.reply("Vous devez être dans un channel vocal pour me faire venir.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
}

module.exports.help = {
  name: "shittyMusic",
  type: "admin", //social fun Private ou admin
  usage: "shittyMusic",
  desc: "je joue une musique de merde au hasard dans ma liste."
} //  ``
