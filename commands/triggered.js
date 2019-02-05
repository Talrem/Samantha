const Discord = require("discord.js")

let nb = 5;

function alea(){
  return Math.floor(Math.random() * nb) + 1;
}
module.exports.run = async (bot, message, args) => {
  if(!args[0]){
    let res = alea()
    message.channel.send('AAAAH !', {
      file : './images/img_trig_'+ res +'.gif'
    });
    return;
  }else{
    res = args[0];
    message.channel.send('AAAAH !', {
      file : './images/img_trig_'+ res +'.gif'
    });
    return;
  }
}

module.exports.help = {
  name: "triggered",
  type: "fun",
  usage: "triggered <nombre>",
  desc: "je donne une image triggered (aléatoire si aucun nombre n'est précisé)."
}
