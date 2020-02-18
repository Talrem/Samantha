const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/superMarioMaker2.json");

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  let compteur = 0;
  let messageToSend = "";
  let nom;
  let myRole = message.guild.roles.find(role => role.name === "sm");
  if(message.member.roles.has(myRole.id)){
    message.author.createDM().then(function(channel){
      message.delete();
      for(k = 0; k < taille; k++){
        if(args.length){
          if(sefile[k].maker == args[0] || args[0] == "all"){
            if(args[0] == "all") messageToSend += sefile[k].maker + " : ";
            messageToSend += sefile[k].name + " - " + sefile[k].id + "\n";
          }
        }else{
            messageToSend += sefile[k].maker + " : " + sefile[k].name + " - " + sefile[k].id + "\n";
        }
      }
      if(messageToSend.length){
  		  return channel.send(messageToSend);
      }else{
        return channel.send("La requête n'a généré aucune réponse.");
      }
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
