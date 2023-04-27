const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/ticketsReportsCartes.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  let taille = sefile[-1].number;
  if(!args[0]) return message.reply("Veuillez préciser un id de requête.");
  let id = args[0];
  if(id > taille || id < 0) return message.reply("L'id que vous avez précisé est invalide.")
  let nomPlaintif = message.author.username
  let type = ["notNerfed","nerf","suppr","changement"];
  let requete;
  if(!args[1]){
    return message.reply("Veuillez préciser un type de nerf valide.")
  }
  requete = args[1].toLowerCase();
  let validRequest = 0;
  for(j = 0; j < type.length;j++){
    if(type[j] == requete) validRequest = j;
  }
  if(!validRequest) return message.reply("Votre requête est invalide, elle doit faire partie de `notNerfed`, `nerf`, `suppr` et `changement`.")
  if(message.author.id != idfile.id && nomPlaintif != sefile[id].plaintif){
    return message.reply('Seul mon créateur  ou l\'autheur de la requête ont le droit à cette commande').then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
  if(sefile[id].nerf && message.author.id != idfile.id) return message.reply("Cette requête a déjà été traitée.")
  sefile[id].nerf = validRequest;
  fs.writeFile("./json/ticketsReportsCartes.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("La modification a été faite avec succès.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "hasNerfed",
  type: "YuGiOh", //social fun Private ou admin
  usage: "hasNerfed <id de la plainte> <type de nerf>",
  desc: "je prend en compte le nerf d'une carte. Les différents types de nerfs sont `notNerfed`, `nerf`, `suppr` et `changement`."
}
