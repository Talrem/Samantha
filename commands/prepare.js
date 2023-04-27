const Discord = require("discord.js")
let nb = 5;

function alea(){
  return Math.floor(Math.random() * nb) + 1;
}
module.exports.run = async (bot, message, args) => {
  if(!args[0]){
    let res = alea()
    message.channel.send({
      content:'My Body Is Ready !',
      files : ['./images/img_sugoi_'+ res +'.gif']
    });
    return;
  }else{
    res = args[0];
    message.channel.send({
      content:'My Body Is Ready !',
      files : ['./images/img_sugoi_'+ res +'.gif']
    });
    return;
  }
}

module.exports.help = {
  name: "prepare",
  type: "fun",
  usage: "prepare <nombre>",
  desc: "je donne une image indiquant que votre corps est prêt (aléatoire si aucun nombre n'est précisé)."
}
