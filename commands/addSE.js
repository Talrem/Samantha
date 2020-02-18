const Discord = require("discord.js");
const fs = require("fs");
let sefile = JSON.parse(fs.readFileSync("./json/soundEffect.json", "utf8"));
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit d'ajouter de nouveaux effets sonores.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  if(!sefile[args[0].toUpperCase()]) sefile[args[0].toUpperCase()] = {
    url: 0
  };
  sefile[args[0].toUpperCase()].url = args[1];
  fs.writeFile("./json/soundEffect.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Effet sonore ajouté avec succès. N'oubliez pas de l'ajouter à la `listSE`");
}

module.exports.help = {
  name: "addSE",
  type: "Private",
  usage: "addSE <nom> <url>",
  desc: "je rajoute un effet sonore."
}
