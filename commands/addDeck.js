const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  let idJoueur = message.author.id;
  if(args.length != 5) return message.reply("La liste des arguments est invalide, attente de 5 arguments : <Nom>, <Provenance>, <Concept>, <WinCon> et <Tier>.");
  if(args[4].toLowerCase() != "ban" && args[4].toLowerCase() != "veryhigh" && args[4].toLowerCase() != "high" && args[4].toLowerCase() != "mid" && args[4].toLowerCase() != "low" && args[4].toLowerCase() != "verylow" && args[4].toLowerCase() != "untiered"){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow`.");
  }
  let nomDeck = args[0]
  let username = message.author.username;
  let provenance = args[1].toLowerCase();
  let concept = args[2].toLowerCase();
  let winCon = args[3].toLowerCase();
  let tier = "Ban";
  switch(args[4].toLowerCase()){
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
  let taille = sefile[-1].number;
  if(!sefile[taille])
    sefile[taille] = {
      id:idJoueur,
      u:username,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier,
      s:"0"
    };
    sefile[-1].number++;
  fs.writeFile("./decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès.\nN'oubliez pas d'envoyer une image représentant votre deck à Talrem.\nL'id de votre deck est : " + (sefile[-1].number - 1)).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "addDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "addDeck <Nom> <Provenance> <Concept> <WinCon> <Tier>",
  desc: "j'ajoute le deck à la liste des decks. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, `VeryLow` et `Untiered`."
}
