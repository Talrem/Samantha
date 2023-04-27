const Discord = require("discord.js")

function alea(nb){
  return Math.floor(Math.random() * nb) + 1;
}
module.exports.run = async (bot, message, args) => {
  let nb = 19;
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[0]){
    let res = alea(nb)
    message.channel.send({
      files : ['./images/CD/img_cd_'+ res +'.png']
    })
    return;
  }else{
    if(args[0] > nb || args[0] < 1){
      message.reply("Veuillez préciser un nombre entre 1 et " + nb)
      return;
    }
    res = args[0];
    message.channel.send({
      files : ['./images/CD/img_cd_'+ res +'.png']
    })
    return;
  }
}

module.exports.help = {
  name: "cd",
  type: "fun",
  usage: "cd <nombre>",
  desc: "je donne une image de jouer mes cartes (aléatoire si aucun nombre n'est précisé)."
}
