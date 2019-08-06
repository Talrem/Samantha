const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let idJoueur = message.author.id;
  if(args.length != 6) return message.reply("La liste des arguments est invalide, attente de 6 arguments : <ID> <Nom>, <Provenance>, <Concept>, <WinCon> et <Tier>.");
  if(args[5] != "Ban" && args[5] != "VeryHigh" && args[5] != "High" && args[5] != "Mid" && args[5] != "Low" && args[5] != "VeryLow"){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow`.");
  }
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  let nomDeck = args[1]
  let provenance = args[2].toLowerCase();
  let concept = args[3].toLowerCase();
  let winCon = args[4].toLowerCase();
  let tier = args[5];
  if(sefile[args[0]])
    if(sefile[args[0]].id != idJoueur) return message.reply("Le deck spécifié ne vous appartient pas.")
    sefile[args[0]] = {
      id:idJoueur,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier
    };
  fs.writeFile("./decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "changeDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "changeDeck <ID> <Nom> <Provenance> <Concept> <WinCon> <Tier>",
  desc: "je modifie le deck à la liste des decks. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low` et `VeryLow`."
}
