const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = sefile[-1].number;
  var i = 0;
  var decksU = new Array();
  var jU = 0;
  for(i = 0; i < taille; i++){
    if(sefile[i].t == "Untiered"){
      decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "` de l'utilisateur `" + sefile[i].u + "`\n";
      jU++;
    }
  }
  if(!jU){
    return message.reply("Il n'y a aucun deck `Untiered`");
  }
  decksU.sort();
  mU = "";
  for(i = 0; i < decksU.length;i++){
    mU += decksU[i] +"\n";
  }
  if(decksU.length>1){
    message.channel.send("Il y a actuellement " + decksU.length + " decks `Untiered` qui sont : \n" + mU);
  }else{
    message.channel.send("Il n'y a qu'un deck `Untiered` : " + mU);
  }
}

module.exports.help = {
  name: "listUnD",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listUnD",
  desc: "j'envois la liste des decks dont le tier n'a pas été déterminé."
}
