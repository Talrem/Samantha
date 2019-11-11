const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!args) return message.reply("Veuillez donner le mot dont je dois donner un anagramme.")
  let messageToSend = "";
  let turn = 0;
  let k = 0;
  var arguments = args[0].split('');
  for(let i = 0; i < arguments.length; i++){
    k = Math.floor(Math.random() * arguments.length)
    while(arguments[k] == "0"){
      k = Math.floor(Math.random() * arguments.length)
    }
    messageToSend += arguments[k];
    arguments[k] = "0";
  }
  return message.channel.send(messageToSend);
}

module.exports.help = {
  name: "anagramme",
  type: "fun",
  usage: "anagramme <mot>",
  desc: "je donne un anagramme du mot."
}
