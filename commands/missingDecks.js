const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

function removeDuplicates(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let taille = sefile[-1].number;
  var missingDeckName = new Array();
  var missingDeckUser = new Array();
  var missingUserTreated = new Array();
  var users = new Array();
  for(i = 0; i<taille; i++){
      users.push(sefile[i].u);
  }
  users = removeDuplicates(users);
  let textToSend = "";
  let path = "";
  for(i = 0; i<users.length; i++){
      path = './images/DECKS/' + users[i];
      fs.readdirSync(path).forEach(file => {
        if(file.toLowerCase()!="readme.md"){
            let found = false;
            for(j=0 ; j<taille ; j++){
                if(file.toLowerCase() == (sefile[j].n+'.jpg').toLowerCase() && users[i]==sefile[j].u){
                    found=true;
                }
            }
            if(!found){
                if(file.includes('.jpg')){
                    missingDeckUser.push(users[i]);
                    missingDeckName.push(file);
                }else{
                    console.log("Fichier non image trouvé : "+path+"/"+file);
                }
            }
        }
     });
  }
  if(missingDeckName.length>0){
      for(j = 0; j<missingDeckName.length;j++){
          if(!missingUserTreated.includes(missingDeckUser[j])){
              textToSend += missingDeckUser[j]+"\n";
              missingUserTreated.push(missingDeckUser[j]);
          }
          textToSend += "\t-\t"+missingDeckName[j] + "\n";
      }
      return message.channel.send(textToSend);
      console.log("done");
  }else{
      return message.channel.send("Aucune image n'a pas de deck.")
  }
}

module.exports.help = {
  name: "missingDecks",
  type: "YuGiOh", //social fun Private ou admin
  usage: "+>missingDecks",
  desc: "je donne la liste des images dans ma base de données qui n'ont pas de deck associé."
}
