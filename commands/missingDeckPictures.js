const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = sefile[-1].number;
  var missingPicName = new Array();
  var missingPicUser = new Array();
  let textToSend = "";
  let path = "";
  for(i = 0; i<taille; i++){
      path = './images/DECKS/' + sefile[i].u + '/' + sefile[i].n + '.jpg';
      if (!fs.existsSync(path)){
          missingPicName.push(sefile[i].n);
          missingPicUser.push(sefile[i].u);
      }
  }
  if(missingPicName.length>0){
      for(j = 0; j<missingPicName.length;j++){
          textToSend += missingPicUser[j] + " : " + missingPicName[j] + "\n";
      }
      return message.channel.send(textToSend);
  }else{
      return message.channel.send("Aucun deck n'a pas d'image.")
  }
}

module.exports.help = {
  name: "missingDeckPictures",
  type: "YuGiOh", //social fun Private ou admin
  usage: "+>missingDeckPictures",
  desc: "je donne la liste des decks qui n'ont pas d'image dans ma base de données."
}
