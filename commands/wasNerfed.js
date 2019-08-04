const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  let compteur = 0;
  let messageToSend = "";
  messageToSend += "Requêtes qui ont été traitées : \n";
  for(i = 0; i < taille ; i++){
    if(sefile[i].nerf){
      messageToSend += "id : " + i + " - " + sefile[i].carte
      messageToSend += " `de " + sefile[i].joueur + "`";
      switch (sefile[i].nerf) {
        case 1:
          messageToSend += " (nerf de l'effet)";
          break;
        case 2:
          messageToSend += " (suppression de la carte)";
          break;
        case 3:
          messageToSend += " (changement total d'effet)";
          break;
      }
      messageToSend += "\n";
      compteur++;
    }
  }
  if(compteur){
    return message.channel.send(messageToSend);
  }
  return message.reply("La requête ne contient aucune valeur.");
}

module.exports.help = {
  name: "wasNerfed",
  type: "social",
  usage: "wasNerfed",
  desc: "j'envois la liste des cartes qui ont reçu un nerf."
}
