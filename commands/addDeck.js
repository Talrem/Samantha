const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  let idJoueur = message.author.id;
  if(args.length != 5) return message.reply("La liste des arguments est invalide, attente de 5 arguments : <Nom>, <Provenance>, <Concept>, <WinCon> et <Tier>.");
  if(args[4] != "Ban" && args[4] != "VeryHigh" && args[4] != "High" && args[4] != "Mid" && args[4] != "Low" && args[4] != "VeryLow"){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow`.");
  }
  let nomDeck = args[0]
  let username = message.author.username;
  let provenance = args[1].toLowerCase();
  let concept = args[2].toLowerCase();
  let winCon = args[3].toLowerCase();
  let tier = args[4];
  let taille = sefile[-1].number;
  if(!sefile[taille])
    sefile[taille] = {
      id:idJoueur,
      u:username,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier
    };
    sefile[-1].number++;
  fs.writeFile("./decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès. son id est : " + (sefile[-1].number - 1)).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "addDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "addDeck <Nom> <Provenance> <Concept> <WinCon> <Tier>",
  desc: "j'ajoute le deck à la liste des decks. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low` et `VeryLow`."
}
