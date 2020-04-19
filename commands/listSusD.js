const Discord = require("discord.js");
const fs = require("fs");
const deckFile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = deckFile[-1].number;
  var i = 0;
  var decksS = new Array();
  var jS = 0;
  let dir = "";
  for(i = 0; i < taille; i++){
    if(deckFile[i].s != "0"){
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
  }
  if(!jS){
    return message.reply("Il n'y a aucun deck `Suspect`");
  }
  mS = "";
  for(i = 0; i < decksS.length;i++){
    mS += decksS[i] +"\n";
  }
  if(decksS.length>1){
    message.channel.send("Il y a actuellement " + decksS.length + " decks `Suspects` qui sont : \n" + mS);
  }else{
    message.channel.send("Il n'y a qu'un deck `Suspect` : " + mS);
  }
}

module.exports.help = {
  name: "listSusD",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listSusD",
  desc: "j'envois la liste des decks dont le tier est mis en doute."
}
