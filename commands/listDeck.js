const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

function isIn(tab, argument) {
  var i;
  for(i = 0 ; i < tab.length;i++){
    if(argument.toLowerCase() == tab[i].toLowerCase()) return 1;
  }
  return 0;
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
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

  var jB = 0;

  var jVH = 0;
  var jVHp = 0;
  var jVHm = 0;

  var jH = 0;
  var jHp = 0;
  var jHm = 0;

  var jM = 0;
  var jMp = 0;
  var jMm = 0;

  var jL = 0;
  var jLp = 0;
  var jLm = 0;

  var jVL = 0;
  var jVLp = 0;

  var jU = 0;

  var decksB = new Array();

  var decksVH = new Array();
  var decksVHp = new Array();
  var decksVHm = new Array();

  var decksH = new Array();
  var decksHp = new Array();
  var decksHm = new Array();

  var decksM = new Array();
  var decksMp = new Array();
  var decksMm = new Array();

  var decksL = new Array();
  var decksLp = new Array();
  var decksLm = new Array();

  var decksVL = new Array();
  var decksVLp = new Array();

  var decksU = new Array();

  for(i = 0; i < taille; i++){
    if(args[0] && args[0].toLowerCase() == "all"){
      switch(sefile[i].t){
        case "Ban":
        decksB[jB] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
        jB++;
        break;
        case "VeryHigh":
        switch(sefile[i].s){
          case "0":
          decksVH[jVH] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jVH++;
          break;
          case "1":
          decksVHp[jVHp] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect +`";
          jVHp++;
          break;
          case "-1":
          decksVHm[jVHm] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect -`";
          jVHm++;
          break;
        }
        break;
        case "High":
        switch(sefile[i].s){
          case "0":
          decksH[jH] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jH++;
          break;
          case "1":
          decksHp[jHp] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect +`";
          jHp++;
          break;
          case "-1":
          decksHm[jHm] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect -`";
          jHm++;
          break;
        }
        break;
        case "Mid":
        switch(sefile[i].s){
          case "0":
          decksM[jM] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jM++;
          break;
          case "1":
          decksMp[jMp] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect +`";
          jMp++;
          break;
          case "-1":
          decksMm[jMm] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect -`";
          jMm++;
          break;
        }
        break;
        case "Low":
        switch(sefile[i].s){
          case "0":
          decksL[jL] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jL++;
          break;
          case "1":
          decksLp[jLp] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect +`";
          jLp++;
          break;
          case "-1":
          decksLm[jLm] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect -`";
          jLm++;
          break;
        }
        break;
        case "VeryLow":
        switch(sefile[i].s){
          case "0":
          decksVL[jVL] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
          jVL++;
          break;
          case "1":
          decksVLp[jVLp] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u + " - `Suspect +`";
          jVLp++;
          break;
        }
        break;
        case "Untiered":
        decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
        jU++;
        break;
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
          switch(sefile[i].s){
            case "0":
            decksVH[jVH] = "ID : " + i + " - `" + sefile[i].n + "`";
            jVH++;
            break;
            case "1":
            decksVHp[jVHp] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect +`";
            jVHp++;
            break;
            case "-1":
            decksVHm[jVHm] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect -`";
            jVHm++;
            break;
          }
          break;
          case "High":
          switch(sefile[i].s){
            case "0":
            decksH[jH] = "ID : " + i + " - `" + sefile[i].n + "`";
            jH++;
            break;
            case "1":
            decksHp[jHp] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect +`";
            jHp++;
            break;
            case "-1":
            decksHm[jHm] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect -`";
            jHm++;
            break;
          }
          break;
          case "Mid":
          switch(sefile[i].s){
            case "0":
            decksM[jM] = "ID : " + i + " - `" + sefile[i].n + "`";
            jM++;
            break;
            case "1":
            decksMp[jMp] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect +`";
            jMp++;
            break;
            case "-1":
            decksMm[jMm] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect -`";
            jMm++;
            break;
          }
          break;
          case "Low":
          switch(sefile[i].s){
            case "0":
            decksL[jL] = "ID : " + i + " - `" + sefile[i].n + "`";
            jL++;
            break;
            case "1":
            decksLp[jLp] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect +`";
            jLp++;
            break;
            case "-1":
            decksLm[jLm] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect -`";
            jLm++;
            break;
          }
          break;
          case "VeryLow":
          switch(sefile[i].s){
            case "0":
            decksVL[jVL] = "ID : " + i + " - `" + sefile[i].n + "`";
            jVL++;
            break;
            case "1":
            decksVLp[jVLp] = "ID : " + i + " - `" + sefile[i].n + "` - `Suspect +`";
            jVLp++;
            break;
          }
          break;
          case "Untiered":
          decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "`";
          jU++;
          break;
          default: return message.reply("Une erreur est survenue... arrêt de la commande.");
        }
      }
    }
  }
  /*La on fusionne les trucs des decks.*/
  decksVH = decksVHp.concat(decksVH);
  decksVH = decksVH.concat(decksVHm);
  jVH = decksVH.length;

  decksH = decksHp.concat(decksH);
  decksH = decksH.concat(decksHm);
  jH = decksH.length;

  decksM = decksMp.concat(decksM);
  decksM = decksM.concat(decksMm);
  jM = decksM.length;

  decksL = decksLp.concat(decksL);
  decksL = decksL.concat(decksLm);
  jL = decksL.length;

  decksVL = decksVLp.concat(decksVL);
  jVL = decksVL.length;

  if(!jB && !jVH && !jH && !jM && !jL && !jVL){
    return message.reply("La cible ne possède aucun deck.");
  }
  /*Là on fait la fusion des messages*/
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
  if(jB != 0) message.author.send("------------------\n `Ban` au nombre de " + decksB.length + " qui sont : \n" + mTSB);
  if(jVH != 0) message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
  if(jH != 0) message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
  if(jM != 0) message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
  if(jL != 0) message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
  if(jVL != 0) message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
  if(jU != 0) message.author.send("------------------\n `Untiered` au nombre de " + decksU.length + " qui sont : \n" + mTSU);
}

module.exports.help = {
  name: "listDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listDeck <utilisateur>",
  desc: "j'envoit la liste des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
