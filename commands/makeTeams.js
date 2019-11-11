const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args || args.length < 2) return message.reply("Veuillez préciser au moins deux choix.")
  let messageEq1 = "Equipe 1 : ";
  let messageEq2 = "Equipe 2 : ";
  let turn = 0;
  let k = 0;
  for(let i = 0; i < args.length; i++){
    k = Math.floor(Math.random() * args.length)
    while(args[k] == "0"){
      k = Math.floor(Math.random() * args.length)
    }
    switch (turn%2) {
      case 1:
        messageEq1 += args[k] + " ";
      break;
      default:
        messageEq2 += args[k] + " ";
      break
    }
    args[k] = "0";
    turn++;
  }
  return message.channel.send(messageEq1 + "\n" + messageEq2);
}

module.exports.help = {
  name: "makeTeams",
  type: "fun",
  usage: "makeTeams <choix1> ... <choixN>",
  desc: "je réparti les choix dans 2 équipes."
}
