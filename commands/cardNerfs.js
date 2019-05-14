const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  let compteur = 0;
  let messageToSend = "";
  let type = ["howmanyfrom","from","to","howmanyto"];
  let requete;
  let nom;
  if(!args[0]){
    requete = "to";
    nom = "all";
  }else{
    requete = args[0].toLowerCase();
    if(!args[1]){
      return message.reply("Veuillez préciser un nom.")
    }else{
      nom = args[1].toLowerCase();
    }
  }
  let validRequest = 0;
  for(j = 0; j < type.length;j++){
    if(type[j] == requete) validRequest = 1;
  }
  if(!validRequest) return message.reply("Votre requête est invalide, elle doit faire partie de `howManyFrom`, `howManyTo`, `from` et `to`.")

  if(requete == type[0]){
    messageToSend += "Nombre de requêtes non traitées demandées par l'utilisateur `" + nom + "` : ";
  }else if(requete == type[1]){
    messageToSend += "Requêtes de nerfs demandées par l'utilisateur `" + nom + "` :\n";
  }else if(requete == type[2]){
    messageToSend += "Requêtes de nerfs faites à l'utilisateur `" + nom + "` :\n";
  }else if(requete == type[3]){
    messageToSend += "Nombre de requêtes non traitées par l'utilisateur `" + nom + "` : ";
  }
  for(i = 0; i < taille ; i++){
    /*Combien de l'utilisateur n'ont pas été traitées*/
    if(requete == type[0]){
      if(sefile[i].plaintif == nom || nom == "all")
        if(!sefile[i].nerf) compteur++;
    }
    /*Combien pour l'utilisateur n'ont pas été traitées*/
    if(requete == type[3]){
      if(sefile[i].joueur == nom || nom == "all")
        if(!sefile[i].nerf) compteur++;
    }
    /*Quelles sont les requêtes de nerf demandées par l'utilisateur*/
    if(requete == type[1]){
      if(sefile[i].plaintif == nom || nom == "all"){
        if(!sefile[i].nerf){
          messageToSend += "id : " + i + " - " + sefile[i].carte
          messageToSend += " `de " + sefile[i].joueur + "`";
          messageToSend += "\n";
          compteur++;
        }
      }
    }
    /*Quelles sont les requêtes de nerf faites à l'utilisateur*/
    if(requete == type[2]){
      if(sefile[i].joueur == nom || nom == "all"){
        if(!sefile[i].nerf){
          messageToSend += "id : " + i + " - " + sefile[i].carte
          if(nom == "all" || nom == "ALL")
            messageToSend += " `de " + sefile[i].joueur + "`";
          messageToSend += "\n";
          compteur++;
        }
      }
    }
  }
  if(requete == type[0] || requete == type[3]){
    messageToSend += compteur;
  }
  if(compteur){
    return message.channel.send(messageToSend);
  }
  return message.reply("La requête ne contient aucune valeur.");
}

module.exports.help = {
  name: "cardNerfs",
  type: "social",
  usage: "cardNerfs <requete> <nom>",
  desc: "j'envois les plaintes de cartes. Les requetes possibles sont : `howManyFrom`, `howManyTo`, `from` et `to`. Si ni l'utilisateur ni la requêtes ne sont remplis, la commande va renvoyer toutes les requêtes."
}
