const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  let compteur = 0;
  let messageToSend = "";
  if(args[0]){
    messageToSend += "Requêtes qui ont été traitées pour " + args[0] + ": \n";
    for(j = 0; j < taille ; j+=10){
      for(i = 0; i < 10 && i+j < taille; i++){
        if(sefile[i+j].nerf && sefile[i+j].joueur == args[0]){
          messageToSend += "id : " + (i+j) + " - " + sefile[i+j].carte
          switch (sefile[i+j].nerf) {
            case 1:
              messageToSend += " (nerf de l'effet)";
              break;
            case 2:
              messageToSend += " (suppression de la carte)";
              break;
            case 3:
              messageToSend += " (changement total d'effet)";
              break;
            case 4:
              messageToSend += " (ignoré)";
              break;
          }
          messageToSend += "\n";
          compteur++;
        }
      }
      if(compteur){
        message.channel.send(messageToSend);
      }
      messageToSend = "";
    }
  }else{
    messageToSend += "Requêtes qui ont été traitées : \n";
    for(j = 0; j < taille ; j+=10){
      for(i = 0; i < 10 && i+j < taille; i++){
        if(sefile[i+j].nerf){
          messageToSend += "id : " + (i+j) + " - " + sefile[i+j].carte
          messageToSend += " `de " + sefile[i+j].joueur + "`";
          switch (sefile[i+j].nerf) {
            case 1:
              messageToSend += " (nerf de l'effet)";
              break;
            case 2:
              messageToSend += " (suppression de la carte)";
              break;
            case 3:
              messageToSend += " (changement total d'effet)";
              break;
            case 4:
              messageToSend += " (ignoré)";
              break;
          }
          messageToSend += "\n";
          compteur++;
        }
      }
      if(compteur){
        message.channel.send(messageToSend);
      }
      messageToSend = "";
    }
  }
  if(compteur) return;
  return message.reply("La requête ne contient aucune valeur.");
}

module.exports.help = {
  name: "wasNerfed",
  type: "YuGiOh",
  usage: "wasNerfed <nom du joueur>",
  desc: "j'envois la liste des cartes qui ont reçu un nerf. Le nom du joueur auquel appartient la carte est optionnel."
}
