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
  var decksS = new Array();
  var jS = 0;
  let dir = "";
  for(i = 0; i < taille; i++){
    if(args.length){
        if(deckFile[i].s != "0" && (args[0]=="all" || deckFile[i].id == idJoueur)){
          switch(deckFile[i].s){
            case "1":
            dir = "`+`";
            break;
            case "-1":
            dir = "`-`";
            break;
          }
          decksS[jS] = "ID : " + i + " - `" + deckFile[i].n + "` de `" + deckFile[i].u + "` ("+deckFile[i].t + dir +")\n";
          jS++;
        }
    }else{
        if(deckFile[i].s != "0" && deckFile[i].id == idJoueur){
          switch(deckFile[i].s){
            case "1":
            dir = "`+`";
            break;
            case "-1":
            dir = "`-`";
            break;
          }
          decksS[jS] = "ID : " + i + " - `" + deckFile[i].n + "` ("+deckFile[i].t + dir +")\n";
          jS++;
        }
    }
  }
  if(!jS){
    return message.reply("Il n'y a aucun deck `Suspect` pour la cible");
  }
  mS = "";
  for(i = 0; i < decksS.length;i++){
    mS += decksS[i] +"\n";
  }
  if(args.length){
      if(decksS.length>1){
        message.channel.send("Il y a actuellement " + decksS.length + " decks `Suspects` pour la cible qui sont : \n" + mS);
      }else{
        message.channel.send("Il n'y a qu'un deck `Suspect` pour la cible: " + mS);
      }
  }else{
      if(decksS.length>1){
        message.channel.send("Vous avez actuellement " + decksS.length + " decks `Suspects` qui sont : \n" + mS);
      }else{
        message.channel.send("Vous n'avez qu'un deck `Suspect` : " + mS);
      }
  }
}

module.exports.help = {
  name: "listSusD",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listSusD <user>",
  desc: "j'envois la liste des decks dont le tier est mis en doute. <user> peut être une mention, un nom, ou all pour avoir accès à tous."
}
