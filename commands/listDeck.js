const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  let idJoueur;
  if(args.length){
    idJoueur = message.mentions.users.first().id;
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
  var jB = 0;
  var jVH = 0;
  var jH = 0;
  var jM = 0;
  var jL = 0;
  var jVL = 0;
  for(i = 0; i < taille; i++){
    if(sefile[i].id == idJoueur){
      switch (sefile[i].t) {
        case "Ban":
          decksB[jB] = "- `" + sefile[i].n + "`";
          jB++;
          break;
        case "VeryHigh":
          decksVH[jVH] = "- `" + sefile[i].n + "`";
          jVH++;
          break;
        case "High":
          decksH[jH] = "- `" + sefile[i].n + "`";
          jH++;
          break
        case "Mid":
          decksM[jM] = "- `" + sefile[i].n + "`";
          jM++;
          break
        case "Low":
          decksL[jL] = "- `" + sefile[i].n + "`";
          jL++;
          break
        case "VeryLow":
          decksVL[jVL] = "- `" + sefile[i].n + "`";
          jVL++;
          break
        default: return message.reply("Une erreur est survenue... arrêt de la commande.");
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
  if(idJoueur == message.author.id){
    if(jB == 0)
      message.author.send("La cible de la commande ne possède aucun deck ban.")
    else
      message.author.send("Vous possédez des decks\n------------------\n `Ban` au nombre de " + decksB.length + " qui sont : \n" + mTSB);
    if(jVH == 0)
      message.author.send("La cible de la commande ne possède aucun deck very high.")
    else
      message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
    if(jH == 0)
      message.author.send("La cible de la commande ne possède aucun deck high.")
    else
      message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
    if(jM == 0)
      message.author.send("La cible de la commande ne possède aucun deck mid.")
    else
      message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
    if(jL == 0)
      message.author.send("La cible de la commande ne possède aucun deck low.")
    else
      message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
    if(jVL == 0)
      message.author.send("La cible de la commande ne possède aucun deck very low.")
    else
      message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
  }else{
    if(jB == 0)
      message.author.send("La cible de la commande ne possède aucun deck ban.")
    else
      message.author.send("La cible possède des decks\n------------------\n `Ban` au nombre de " + decksB.length + " qui sont :\n" + mTSB);
    if(jVH == 0)
      message.author.send("La cible de la commande ne possède aucun deck very high.")
    else
      message.author.send("------------------\n `Very High` au nombre de " + decksVH.length + " qui sont : \n" + mTSVH);
    if(jH == 0)
      message.author.send("La cible de la commande ne possède aucun deck high.")
    else
      message.author.send("------------------\n `High` au nombre de " + decksH.length + " qui sont : \n" + mTSH);
    if(jM == 0)
      message.author.send("La cible de la commande ne possède aucun deck mid.")
    else
      message.author.send("------------------\n `Mid` au nombre de " + decksM.length + " qui sont : \n" + mTSM);
    if(jL == 0)
      message.author.send("La cible de la commande ne possède aucun deck low.")
    else
      message.author.send("------------------\n `Low` au nombre de " + decksL.length + " qui sont : \n" + mTSL);
    if(jVL == 0)
      message.author.send("La cible de la commande ne possède aucun deck very low.")
    else
      message.author.send("------------------\n `Very Low` au nombre de " + decksVL.length + " qui sont : \n" + mTSVL);
  }
}

module.exports.help = {
  name: "listDeck",
  type: "social", //social fun Private ou admin
  usage: "listDeck <utilisateur>",
  desc: "j'envoit la decks des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
