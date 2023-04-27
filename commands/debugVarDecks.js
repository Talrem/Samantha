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

function whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, argument){
  if(isIn(lesTiers, argument)) return "t";
  if(isIn(lesProvenances, argument)) return "p";
  if(isIn(lesConcepts, argument)) return "c";
  if(isIn(lesWinCons, argument)) return "w";
  return "";
}

function cleanArray(array) {
  var i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    if(j != "undefined")
    out.push(j);
  }
  return out;
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
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
  var tabVide = new Array();
  tabVide[0]="";
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
  for(i = 0 ; i < lesProvenancesS.length ; i++){
    if(isIn(lesConceptsS,lesProvenancesS[i]) || isIn(lesWinConsS,lesProvenancesS[i]) || isIn(lesTiersS,lesProvenancesS[i]))
    provenancesToSend += lesProvenancesS[i] + '('+ whatTab(lesTiersS, tabVide, lesConceptsS, lesWinConsS, lesProvenancesS[i]) +')\n';
  }
  for(i = 0 ; i < lesWinConsS.length ; i++){
    if(isIn(lesProvenancesS,lesWinConsS[i]) || isIn(lesConceptsS,lesWinConsS[i]) || isIn(lesTiersS,lesWinConsS[i]))
    winconToSend += lesWinConsS[i] + '('+ whatTab(lesTiersS, lesProvenancesS, lesConceptsS, tabVide, lesWinConsS[i]) +')\n';
  }
  for(i = 0 ; i < lesConceptsS.length ; i++){
    if(isIn(lesProvenancesS,lesConceptsS[i]) || isIn(lesWinConsS,lesConceptsS[i]) || isIn(lesTiersS,lesConceptsS[i]))
    conceptToSend += lesConceptsS[i] + '('+ whatTab(lesTiersS, lesProvenancesS, tabVide, lesWinConsS, lesConceptsS[i]) +')\n';
  }
  for(i = 0 ; i < lesTiersS.length ; i++){
    if(isIn(lesProvenancesS,lesTiersS[i]) || isIn(lesConceptsS,lesTiersS[i]) || isIn(lesWinConsS,lesTiersS[i]))
    tierToSend += lesTiersS[i] + '('+ whatTab(tabVide, lesProvenancesS, lesConceptsS, lesWinConsS, lesTiersS[i]) +')\n';
  }
  if(provenancesToSend != "") message.author.send("Les `provenances` suivantes posent problème : \n" + provenancesToSend);
  if(conceptToSend != "") message.author.send("La cible a des decks avec ces `concepts` : \n" + conceptToSend);
  if(winconToSend!= "") message.author.send("La cible a des decks avec ces `conditions de victoire` : \n" + winconToSend);
  if(tierToSend!= "") message.author.send("La cible a des decks de ces `tiers` : \n" + tierToSend);
  if(tierToSend == "" && winconToSend == "" && conceptToSend == "" && provenancesToSend == "") message.reply("Aucun problème dans la base de données.");
  return;
}

module.exports.help = {
  name: "debugVarDecks",
  type: "YuGiOh", //social fun Private ou admin
  usage: "debugVarDecks <joueur>",
  desc: "je donne les caractéristiques des deck qui sont dans deux catégories différentes et donc génératrices de bug. Le joueur par défaut est l'utilisateur de la commande."
}
