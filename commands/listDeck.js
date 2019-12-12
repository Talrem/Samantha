const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

function isIn(tab, argument) {
  var i;
  for(i = 0 ; i < tab.length;i++){
    if(argument.toLowerCase() == tab[i].toLowerCase()) return 1;
  }
  return 0;
}

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  var playerNames = new Array();
  var playerIDs = new Array();
  var nbPlayers = 0;
  for(i = 0; i < taille; i++){
    if(!isIn(playerIDs,sefile[i].id)){
      playerIDs[nbPlayers] = sefile[i].id;
      playerNames[nbPlayers] = sefile[i].u;
      nbPlayers += 1;
    }
  }
  var trouve = 0;
  let idJoueur = 0;
  if(args.length){
    if(args[0].toLowerCase() != "all" && !isIn( playerNames, args[0].toLowerCase() ) ){
      if(args[0].includes("<") && args[0].includes(">") && args[0].includes("@")){
        idJoueur = message.mentions.users.first().id;
      }
    }else{
      for(j = 0; j < nbPlayers; j++){
        if(args[0].toLowerCase() == playerNames[j].toLowerCase()){
          idJoueur = playerIDs[j];
          trouve = 1;
        }
      }
      if(!trouve){
          idJoueur = message.author.id;
      }
    }
  }else{
      idJoueur = message.author.id;
  }
  var i = 0;
  var decksB = new Array();
  var decksVH = new Array();
  var decksH = new Array();
  var decksM = new Array();
  var decksL = new Array();
  var decksVL = new Array();
  var decksU = new Array();
  var jB = 0;
  var jVH = 0;
  var jH = 0;
  var jM = 0;
  var jL = 0;
  var jVL = 0;
  var jU = 0;
  for(i = 0; i < taille; i++){
    if(args[0] && args[0].toLowerCase() == "all"){
      switch(sefile[i].t){
        case "Ban":
          decksB[jB] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jB++;
          break;
        case "VeryHigh":
          decksVH[jVH] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jVH++;
          break;
        case "High":
          decksH[jH] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jH++;
          break
        case "Mid":
          decksM[jM] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jM++;
          break
        case "Low":
          decksL[jL] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jL++;
          break
        case "VeryLow":
          decksVL[jVL] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jVL++;
          break
        case "Untiered":
          decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jU++;
          break
        default: return message.reply("Une erreur est survenue... arrêt de la commande.");
      }
    }else{
      if(sefile[i].id == idJoueur){
        switch(sefile[i].t){
          case "Ban":
            decksB[jB] = "ID : " + i + " - `" + sefile[i].n + "`";
            jB++;
            break;
          case "VeryHigh":
            decksVH[jVH] = "ID : " + i + " - `" + sefile[i].n + "`";
            jVH++;
            break;
          case "High":
            decksH[jH] = "ID : " + i + " - `" + sefile[i].n + "`";
            jH++;
            break
          case "Mid":
            decksM[jM] = "ID : " + i + " - `" + sefile[i].n + "`";
            jM++;
            break
          case "Low":
            decksL[jL] = "ID : " + i + " - `" + sefile[i].n + "`";
            jL++;
            break
          case "VeryLow":
            decksVL[jVL] = "ID : " + i + " - `" + sefile[i].n + "`";
            jVL++;
            break
          case "Untiered":
            decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "`";
            jU++;
            break
          default: return message.reply("Une erreur est survenue... arrêt de la commande.");
        }
      }
    }
  }
  if(!jB && !jVH && !jH && !jM && !jL && !jVL){
    return message.reply("La cible ne possède aucun deck.");
  }
  decksB.sort();
  decksVH.sort();
  decksH.sort();
  decksM.sort();
  decksL.sort();
  decksVL.sort();
  decksU.sort();
  mTSB = "";
  for(i = 0; i < decksB.length;i++){
    mTSB += decksB[i] +"\n";
  }
  mTSVH = "";
  for(i = 0; i < decksVH.length;i++){
    mTSVH += decksVH[i] +"\n";
  }
  mTSH = "";
  for(i = 0; i < decksH.length;i++){
    mTSH += decksH[i] +"\n";
  }
  mTSM = "";
  for(i = 0; i < decksM.length;i++){
    mTSM += decksM[i] +"\n";
  }
  mTSL = "";
  for(i = 0; i < decksL.length;i++){
    mTSL += decksL[i] +"\n";
  }
  mTSVL = "";
  for(i = 0; i < decksVL.length;i++){
    mTSVL += decksVL[i] +"\n";
  }
  mTSU = "";
  for(i = 0; i < decksU.length;i++){
    mTSU += decksU[i] +"\n";
  }
  let nbDecks = decksB.length + decksH.length + decksL.length + decksM.length + decksU.length + decksVH.length + decksVL.length;
  message.author.send("Nombre total de decks de la cible : " + nbDecks);
  if(idJoueur == message.author.id){
    if(jB == 0)
      message.author.send("------------------\nVous ne possédez aucun deck ban.")
    else
      message.author.send("------------------\n `Ban` au nombre de " + decksB.length + " qui sont : \n" + mTSB);
    if(jVH == 0)
      message.author.send("------------------\nVous ne possédez aucun deck very high.")
    else
      message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
    if(jH == 0)
      message.author.send("------------------\nVous ne possédez aucun deck high.")
    else
      message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
    if(jM == 0)
      message.author.send("------------------\nVous ne possédez aucun deck mid.")
    else
      message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
    if(jL == 0)
      message.author.send("------------------\nVous ne possédez aucun deck low.")
    else
      message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
    if(jVL == 0)
      message.author.send("------------------\nVous ne possédez aucun deck very low.")
    else
      message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
    if(jU == 0)
      message.author.send("------------------\nVous ne possédez aucun deck untiered.")
    else
      message.author.send("------------------\n `Untiered` au nombre de " + decksU.length + " qui sont : \n" + mTSU);
  }else{
    if(jB == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck ban.")
    else
      message.author.send("------------------\n `Ban` au nombre de " + decksB.length + " qui sont :\n" + mTSB);
    if(jVH == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck very high.")
    else
      message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
    if(jH == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck high.")
    else
      message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
    if(jM == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck mid.")
    else
      message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
    if(jL == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck low.")
    else
      message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
    if(jVL == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck very low.")
    else
      message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
    if(jU == 0)
      message.author.send("------------------\n La cible de la commande ne possède aucun deck untiered.")
    else
      message.author.send("------------------\n `Untiered` au nombre de " + decksU.length + " qui sont : \n" + mTSU);
  }
}

module.exports.help = {
  name: "listDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listDeck <utilisateur>",
  desc: "j'envoit la decks des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
