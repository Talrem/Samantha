const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let idJoueur = message.author.id;
  if(args.length != 2) return message.reply("La liste des arguments est invalide, attente de 2 arguments : <ID> et <Tier>.");
  if(args[1].toLowerCase() != "ban" && args[1].toLowerCase() != "veryhigh" && args[1].toLowerCase() != "high" && args[1].toLowerCase() != "mid" && args[1].toLowerCase() != "low" && args[1].toLowerCase() != "verylow" && args[1].toLowerCase() != "untiered"){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, `VeryLow` et `Untiered`.");
  }
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  if(sefile[args[0]].t == "Ban") return message.reply("Un deck ban ne peut être modifié par cette commande.")
  let nomDeck = sefile[args[0]].n;
  let username = message.author.username;
  let provenance = sefile[args[0]].p;
  let concept = sefile[args[0]].c;
  let winCon = sefile[args[0]].w;
  let tier = "Ban";
  switch(args[1].toLowerCase()){
    case "ban":
      tier = "Ban";
      break;
    case "veryhigh":
      tier = "VeryHigh";
      break;
    case "high":
      tier = "High";
      break;
    case "mid":
      tier = "Mid";
      break;
    case "low":
      tier = "Low";
      break;
    case "verylow":
      tier = "VeryLow";
      break;
    case "untiered":
      tier = "Untiered";
      break;
  }
  if(sefile[args[0]])
    if(sefile[args[0]].id != idJoueur) return message.reply("Le deck spécifié ne vous appartient pas.")
    sefile[args[0]] = {
      id:idJoueur,
      u:username,
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
  name: "setTier",
  type: "YuGiOh", //social fun Private ou admin
  usage: "setTier <ID> <Tier>",
  desc: "je modifie le deck à la liste des decks. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, `VeryLow` et `Untiered`."
}
