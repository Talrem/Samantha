const Discord = require("discord.js");
const fs = require("fs");
//const sefile = require("../superMarioMaker2.json");

module.exports.run = async (bot, message, args) => {
  //let taille = sefile[-1].number;
  let compteur = 0;
  let messageToSend = "";
  let nom;
  let myRole = message.guild.roles.find(role => role.name === "sm");
  if(message.member.roles.has(myRole.id)){
    message.reply("Je t'envois ça en privé chéri.");
    /*
    if(){
      messageToSend += compteur;
    }
    */
    message.author.createDM().then(function(channel){
  		return channel.send("WIP");
  	}).catch(console.error)
  } else {
    return message.reply("Vous n'avez pas le role sm, je ne peux pas vous envoyer ça voyons...");
  }
}

module.exports.help = {
  name: "sm",
  type: "Private",
  usage: "sm <nom>",
  desc: "j'envois les niveaux Super Mario Maker 2. Si le nom du créateur n'est pas remplis, la commande va renvoyer toutes les requêtes."
}
