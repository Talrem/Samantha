const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.reply('Seul mon créateur a le droit à cette commande').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  let taille = sefile[-1].number;
  if(!args[0]) return message.reply("Veuillez préciser un id de requête.");
  let id = args[0];
  if(id > taille || id < 0) return message.reply("L'id que vous avez précisé est invalide.")
  let type = ["notNerfed","nerf","suppr","changement"];
  let requete;
  if(!args[1]){
    return message.reply("Veuillez préciser un nom.")
  }
  requete = args[1].toLowerCase();
  let validRequest = 0;
  for(j = 0; j < type.length;j++){
    if(type[j] == requete) validRequest = j;
  }
  if(!validRequest) return message.reply("Votre requête est invalide, elle doit faire partie de `howManyFrom`, `howManyTo`, `from` et `to`.")
  sefile[id].nerf = validRequest;
  fs.writeFile("./ticketsReportsCartes.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("La modification a été faite avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "hasNerfed",
  type: "YuGiOh", //social fun Private ou admin
  usage: "hasNerfed <id de la plainte> <type de nerf>",
  desc: "je prend en compte le nerf d'une carte. Les différents types de nerfs sont `notNerfed`, `nerf`, `suppr` et `changement`."
}
