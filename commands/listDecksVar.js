const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

function isIn(tab, argument) {
  var i;
  for(i = 0 ; i < tab.length;i++){
    if(argument == tab[i]) return 1;
  }
  return 0;
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length < 2) return message.reply("Veuillez préciser au moins 2 arguments, <self/all> <attributs>");
  let taille = sefile[-1].number;
  var i = 0;
  var j = 0;
  var decksU = new Array();
  var lesID = new Array();
  var jU = 0;
  for(j=1; j < args.length;j++){
    for(i = 0; i < taille; i++){
      if(args[0].toLowerCase() == "self" && sefile[i].id == message.author.id || args[0].toLowerCase() == "all"){
        if(sefile[i].t.toLowerCase() == args[j].toLowerCase() || sefile[i].n.toLowerCase() == args[j].toLowerCase() || sefile[i].w.toLowerCase() == args[j].toLowerCase() || sefile[i].c.toLowerCase() == args[j].toLowerCase() || sefile[i].p.toLowerCase() == args[j].toLowerCase()){
          if(!isIn(lesID,i)){
            if(args[0].toLowerCase() == "self"){
              decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "`\n";
            }else{
              decksU[jU] = "ID : " + i + " - `" + sefile[i].n + "` de l'utilisateur `" + sefile[i].u + "`\n";
            }
            lesID[jU] = i;
            jU++;
          }
        }
      }
    }
  }
  if(!jU){
    return message.reply("Il n'y a aucun deck avec ce/ces attributs");
  }
  decksU.sort();
  mU = "";
  for(i = 0; i < decksU.length;i++){
    mU += decksU[i] +"\n";
  }
  if(decksU.length>1){
    message.channel.send("Il y a actuellement " + decksU.length + " decks avec ce/ces attributs qui sont : \n" + mU);
  }else{
    message.channel.send("Il n'y a qu'un deck avec ce/ces attributs : " + mU);
  }
}

module.exports.help = {
  name: "listDecksVar",
  type: "YuGiOh", //social fun Private ou admin
  usage: "listDecksVar <all/self> <attribut> ... <attribut>",
  desc: "j'envois la liste des decks dont ils ont un des attributs donnés."
}
