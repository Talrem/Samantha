const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let nb = 1;
  let res;
  if(args.length){
    res = args[0];
  }else{
    res = Math.floor(Math.random() * nb) + 1;
  }
  message.channel.send("", {file : './images/img_ad_'+ res +'.jpg'})
  return;
}

module.exports.help = {
  name: "ad",
  type: "fun",
  usage: "ad <nombre>",
  desc: "je donne une image qui assert la dominance."
}
