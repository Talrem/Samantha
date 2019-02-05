const Discord = require("discord.js")
let nb = 5;

function alea(){
  return Math.floor(Math.random() * nb) + 1;
}

module.exports.run = async (bot, message, args) => {
  res = alea()
  if(res === 1){
    message.channel.send("ROAD ROLLER DA !", {file : './images/img_jojo_'+ res +'.jpg'
    });
  };
  if(res === 2){
    message.channel.send("KONO DIO DA !", {file : './images/img_jojo_'+ res +'.jpg'
    });
  };
  if(res === 3){
    message.channel.send("SONO CHI NO SADAME ! JOOOOOOOOOOOOOOJO !", {file : './images/img_jojo_'+ res +'.jpg'
    });
  };
  if(res === 4){
    message.channel.send("OH NO !", {file : './images/img_jojo_'+ res +'.jpg'
    });
  };
  if(res === 5){
    message.channel.send("AYA YA YA !", {file : './images/img_jojo_'+ res +'.jpg'
    });
  };
  return;
}

module.exports.help = {
  name: "jojo",
  type: "fun",
  usage: "jojo <nombre>",
  desc: "je donne une image et une citation de jojo (aléatoire si aucun nombre n'est précisé)."
}
