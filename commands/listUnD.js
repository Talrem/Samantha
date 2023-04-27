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

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = deckFile[-1].number;
  var playerNames = new Array();
  var playerIDs = new Array();
  var nbPlayers = 0;
  for(i = 0; i < taille; i++){
    if(!isIn(playerIDs,deckFile[i].id)){
      playerIDs[nbPlayers] = deckFile[i].id;
      playerNames[nbPlayers] = deckFile[i].u;
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
  var decksU = new Array();
  var jU = 0;
  for(i = 0; i < taille; i++){
    if(args.length){
        if(deckFile[i].t == "Untiered" && (args[0]=="all" || deckFile[i].id == idJoueur)){
          decksU[jU] = "ID : " + i + " - `" + deckFile[i].n + "` de `" + deckFile[i].u + "`\n";
          jU++;
        }
    }else{
        if(deckFile[i].t == "Untiered" && deckFile[i].id == idJoueur){
          decksU[jU] = "ID : " + i + " - `" + deckFile[i].n + "` de `" + deckFile[i].u + "`\n";
          jU++;
        }
    }
  }
  if(!jU){
    return message.reply("Il n'y a aucun deck `Untiered` pour la cible");
  }
  mU = "";
  for(i = 0; i < decksU.length;i++){
    mU += decksU[i] +"\n";
  }
  if(args.length){
      if(decksU.length>1){
        message.channel.send("La cible possède actuellement " + decksU.length + " decks `Untiered` qui sont : \n" + mU);
      }else{
        message.channel.send("Il n'y a qu'un deck `Untiered` pour la cible : " + mU);
      }
  }else{
      if(decksU.length>1){
        message.channel.send("Vous possèdez actuellement " + decksU.length + " decks `Untiered` qui sont : \n" + mU);
      }else{
        message.channel.send("Vous n'avez qu'un deck `Untiered` : " + mU);
      }
  }
}

module.exports.help = {
  name: "listUnD",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listUnD <user>",
  desc: "j'envois la liste des decks dont le tier n'a pas été déterminé pour l'utilisateur précisé. <user> peut être une mention, un nom, ou all pour avoir accès à tous."
}
