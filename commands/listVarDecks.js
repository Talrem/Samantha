const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

function cleanArray(array) {
  var i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    out.push(j);
  }
  return out;
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = sefile[-1].number;
  let idJoueur = 0;
  if(args.length){
    if(args[0].toLowerCase() != "all"){
      idJoueur = message.mentions.users.first().id;
    }
  }else{
    idJoueur = message.author.id;
  }
  var lesDeck = new Array();
  var lesProvenances = new Array();
  var lesConcepts = new Array();
  var lesWinCons = new Array();
  var lesTiers = new Array();
  let provenancesToSend = "";
  let conceptToSend = "";
  let winconToSend = "";
  let tierToSend = "";
  /*Récupération de toutes les variables de tout les decks de l'utilisateur*/
  let k = 0;
  for(i = 0; i < taille; i++){
    if(sefile[i].id == idJoueur || (args[0] && args[0].toLowerCase()=="all")){
      lesProvenances[k] = sefile[i].p;
      lesConcepts[k] = sefile[i].c;
      lesWinCons[k] = sefile[i].w;
      lesTiers[k] = sefile[i].t;
    }
    k++
  }
  lesProvenancesS = cleanArray(lesProvenances.sort());
  lesConceptsS = cleanArray(lesConcepts.sort());
  lesWinConsS = cleanArray(lesWinCons.sort());
  lesTiersS = cleanArray(lesTiers.sort());
  for(j = 0; j<4 ; j++){
    switch (j) {
      case 0:
        for(k = 0 ; k < lesProvenancesS.length;k++){
          if(lesProvenancesS[k] != "undefined")
            provenancesToSend += lesProvenancesS[k] + "\n"
        }
      break;
      case 1:
        for(k = 0 ; k < lesConceptsS.length;k++){
          if(lesConceptsS[k] != "undefined")
            conceptToSend += lesConceptsS[k] + "\n"
        }
      break;
      case 2:
        for(k = 0 ; k < lesWinConsS.length;k++){
          if(lesWinConsS[k] != "undefined")
            winconToSend += lesWinConsS[k] + "\n"
        }
        break;
      case 3:
        for(k = 0 ; k < lesTiersS.length;k++){
          if(lesTiersS[k] != "undefined")
            tierToSend += lesTiersS[k] + "\n"
        }
      break;
      default:
    }
  }
  if(lesProvenances.length) message.author.send("La cible a des decks de ces `provenances` : \n" + provenancesToSend);
  if(lesConcepts.length) message.author.send("La cible a des decks avec ces `concepts` : \n" + conceptToSend);
  if(lesWinCons.length) message.author.send("La cible a des decks avec ces `conditions de victoire` : \n" + winconToSend);
  if(lesTiers.length) message.author.send("La cible a des decks de ces `tiers` : \n" + tierToSend);
  return;
}

module.exports.help = {
  name: "listVarDecks",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listVarDecks <joueur>",
  desc: "je donne les caractéristiques des deck du joueur précisé, si rien n'est précisé, l'utilisateur de la commande est le joueur. l'argument `all` donne pour tous les joueurs."
}
