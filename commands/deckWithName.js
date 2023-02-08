const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let nameToSearch = args[0];
  let taille = sefile[-1].number;
  var deckWithName = new Array();
  var deckWithNameUsers = new Array();
  let textToSend = "";
  for(i = 0; i<taille; i++){
      if (sefile[i].n.toLowerCase().includes( nameToSearch.toLowerCase() )){
          deckWithName.push(i + " : " + sefile[i].n);
          deckWithNameUsers.push(sefile[i].u);
      }
  }
  if(deckWithName.length>0){
      for(j = 0; j<deckWithName.length;j++){
          textToSend += deckWithNameUsers[j] + " : " + deckWithName[j] + "\n";
      }
      return message.channel.send(textToSend);
  }else{
      return message.channel.send("Aucun deck n'a de nom qui contienne votre recherche.")
  }
}

module.exports.help = {
  name: "deckWithName",
  type: "YuGiOh", //social fun Private ou admin
  usage: "+>deckWithName <nom>",
  desc: "je donne la liste des decks dont le nom contient une chaîne de charactères passée en paramètre dans ma base de données."
}
