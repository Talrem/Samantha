const Discord = require("discord.js");
const fs = require("fs");
let addonFile = JSON.parse(fs.readFileSync("./json/addons.json", "utf8"));
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit d'ajouter de nouveaux addons.").then(msg => {
      msg.delete({ timeout: 10000 })
    })
    .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }
  /*invalid typing*/
  if(args[1] != "skin" && args[1] != "mode" && args[1] != "arme" && args[1] != "armeSpe" && args[1] != "effet" && args[1] != "texture"){
    return message.reply("Le type précisé est invalide. Veuillez utiliser un type parmis `skin`, `arme`, `armeSpe`, `effet`, `mode` et `texture`.");
  }
  let taille = addonFile[-1].number;
  if(!addonFile[taille])
    addonFile[taille] = {
      type:args[1],
      name:args[0],
      url:args[2]
    };
    addonFile[-1].number++;
  fs.writeFile("./json/addons.json", JSON.stringify(addonFile), (err) =>{
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
