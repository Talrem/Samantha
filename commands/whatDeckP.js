const Discord = require("discord.js");
const fs = require("fs");
const deckFile = require("../json/decks.json");

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

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length >= 4 && args.length <= 0) return message.reply("La liste des arguments est invalide, vous devez préciser si vous souhaitez <Provenance> <Concept> <WinCon> <Tier> dans l'ordre que vous voulez.");
  let taille = deckFile[-1].number;
  let idJoueur = message.author.id;
  var i = 0;
  var j = 0;
  var k = 0;
  var tOk = 1;
  var pOk = 1;
  var cOk = 1;
  var wOk = 1;
  var argument0 = "";
  var argument1 = "";
  var argument2 = "";
  var argument3 = "";
  var lesDeck = new Array();
  var lesProvenances = new Array();
  var lesConcepts = new Array();
  var lesWinCons = new Array();
  var lesTiers = new Array();
  /*Récupération de toutes les variables de tout les decks de l'utilisateur*/
  for(i = 0; i < taille; i++){
    if(deckFile[i].id == idJoueur){
      lesProvenances[k] = deckFile[i].p;
      lesConcepts[k] = deckFile[i].c;
      lesWinCons[k] = deckFile[i].w;
      lesTiers[k] = deckFile[i].t;
      k++;
    }
  }

  /*Choix du deck*/
  for(i = 0; i < taille; i++){
    if(deckFile[i].id == idJoueur){
      if(!args.length){
        if(!(deckFile[i].t == "Ban")){
          lesDeck[j] = deckFile[i];
          j++;
        }
      }else{
        if(args[0]) argument0 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, args[0]);
        if(args[1]) argument1 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, args[1]);
        if(args[2]) argument2 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, args[2]);
        if(args[3]) argument3 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, args[3]);
        if(!(deckFile[i].t == "Ban")){
          tOk = 1;
          pOk = 1;
          cOk = 1;
          wOk = 1;
          if(argument0 != "" || argument1 != "" || argument2 != "" || argument3 != ""){
            switch (argument0) {
              case "t":
                if(args[0].toLowerCase() != deckFile[i].t.toLowerCase()) tOk = 0;
                break;
              case "p":
                if(args[0].toLowerCase() != deckFile[i].p.toLowerCase()) pOk = 0;
                break;
              case "c":
                if(args[0].toLowerCase() != deckFile[i].c.toLowerCase()) cOk = 0;
                break;
              case "w":
                if(args[0].toLowerCase() != deckFile[i].w.toLowerCase()) wOk = 0;
                break;
            }
            switch (argument1) {
              case "t":
                if(args[1].toLowerCase() != deckFile[i].t.toLowerCase()) tOk = 0;
                break;
              case "p":
                if(args[1].toLowerCase() != deckFile[i].p.toLowerCase()) pOk = 0;
                break;
              case "c":
                if(args[1].toLowerCase() != deckFile[i].c.toLowerCase()) cOk = 0;
                break;
              case "w":
                if(args[1].toLowerCase() != deckFile[i].w.toLowerCase()) wOk = 0;
                break;
            }
            switch (argument2) {
              case "t":
                if(args[2].toLowerCase() != deckFile[i].t.toLowerCase()) tOk = 0;
                break;
              case "p":
                if(args[2].toLowerCase() != deckFile[i].p.toLowerCase()) pOk = 0;
                break;
              case "c":
                if(args[2].toLowerCase() != deckFile[i].c.toLowerCase()) cOk = 0;
                break;
              case "w":
                if(args[2].toLowerCase() != deckFile[i].w.toLowerCase()) wOk = 0;
                break;
            }
            switch (argument3) {
              case "t":
                if(args[3].toLowerCase() != deckFile[i].t.toLowerCase()) tOk = 0;
                break;
              case "p":
                if(args[3].toLowerCase() != deckFile[i].p.toLowerCase()) pOk = 0;
                break;
              case "c":
                if(args[3].toLowerCase() != deckFile[i].c.toLowerCase()) cOk = 0;
                break;
              case "w":
                if(args[3].toLowerCase() != deckFile[i].w.toLowerCase()) wOk = 0;
                break;
            }
            if(tOk && pOk && cOk && wOk){
              lesDeck[j] = deckFile[i];
              j++;
            }
          }
        }
      }
    }
  }
  if(j == 0) return message.reply("Vous ne possédez aucun deck... Ou alors aucun d'entre eux ne correspond aux arguments fournis... Ou alors ils sont bans, je sais pas...");
  let leDeck = lesDeck[Math.floor(Math.random() * j)];
  let deckEmbed = new Discord.RichEmbed()
  .setDescription("Deck à utiliser")
  .setColor("#15f153")
  .setThumbnail(message.author.avatarURL)
  .addField("Nom", leDeck.n)
  .addField("Provenance", leDeck.p)
  .addField("Concept", leDeck.c)
  .addField("Win Condition", leDeck.w)
  .addField("Tier", leDeck.t);
  message.author.send(deckEmbed)
  return message.author.send('', {
    file : './images/DECKS/' + leDeck.u + '/' + leDeck.n + '.jpg'
  }).catch(error =>  message.author.send("Aucune image disponible pour ce deck, veuillez en fournir une."));
}

module.exports.help = {
  name: "whatDeckP",
  type: "YuGiOh", //social fun Private ou admin
  usage: "whatDeckP <Provenance> <Concept> <WinCon> <Tier>",
  desc: "je donne en privé le nom d'un deck pris au hasard qui correspond aux arguments donnés. Tout les arguments sont facultatifs"
}
