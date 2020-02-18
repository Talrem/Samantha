const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/superMarioMaker2.json");

module.exports.run = async (bot, message, args) => {
  if(!message.member.roles.some(role => role.name === "sm")) return message.reply("Vous n'êtes apparement pas un créateur de niveaux, je ne peux pas vous laisser accéder à la base de donnée...");
  if(args.length < 2) return message.reply("La liste des arguments est invalide, attente d'au moins 2 arguments : +>addSM <ID> <Nom>");
  let idNiveau = args[0];
  let nomNiveau = args[1];
  let username = message.author.username;
  var k = 0;
  for(k = 2 ; k < args.length;k++){
    nomNiveau += " " + args[k];
  }
  let taille = sefile[-1].number;
  if(!sefile[taille])
    sefile[taille] = {
      maker:username,
      name:nomNiveau,
      id:idNiveau
    };
    sefile[-1].number++;
  fs.writeFile("./json/superMarioMaker2.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le Niveau a été enregistré avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "addSM",
  type: "social", //social fun Private ou admin
  usage: "addDeck <ID> <Nom>",
  desc: "j'ajoute le niveau à la liste."
}
