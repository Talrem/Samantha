const Discord = require("discord.js");
const fs = require("fs");
let sefile = JSON.parse(fs.readFileSync("./addons.json", "utf8"));
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit d'ajouter de nouveaux addons.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  /*invalid typing*/
  if(args[1] != "skin" && args[1] != "mode" && args[1] != "arme" && args[1] != "armeSpe" && args[1] != "effet"){
    return message.reply("Le type précisé est invalide. Veuillez utiliser un type parmis `skin`, `arme`, `armeSpe`, `effet` et `mode`");
  }
  let taille = sefile[-1].number;
  if(!sefile[taille])
    sefile[taille] = {
      type:args[1],
      name:args[0],
      url:args[2]
    };
    sefile[-1].number++;
  fs.writeFile("./addons.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Addon ajouté avec succès.`");
}

module.exports.help = {
  name: "addAddon",
  type: "admin",
  usage: "addSE <nom> <type> <id>",
  desc: "je rajoute un addon à la liste. Le nom doit être saisi sans espaces. Vous pouvez mettre des _ à la place. Si le type est invalide, la saisie sera refusée. L'id est par exemple 1495839505 pour le `TTT Jihad John Cena`"
}
