const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  if(args.length != 5) return message.reply("La liste des arguments est invalide, attente de 5 arguments : <ID> <Nom>, <Provenance>, <Concept> et <WinCon>.");
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  let idJoueur = sefile[args[0]].id;
  let username = sefile[args[0]].u;
  let nomDeck = args[1];
  let provenance = args[2].toLowerCase();
  let concept = args[3].toLowerCase();
  let winCon = args[4].toLowerCase();
  let tier = sefile[args[0]].t;
  if(sefile[args[0]])
    if(sefile[args[0]].id != idJoueur && message.author.id != 212556854147022849) return message.reply("Le deck spécifié ne vous appartient pas.")
    let previousName = sefile[args[0]].n;
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
  if(previousName != sefile[args[0]].n) message.channel.send("Veuillez préciser le changement de nom du deck à Talrem pour la base d'images.");
  return message.channel.send("Le deck a été enregistré avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "changeDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "changeDeck <ID> <Nom> <Provenance> <Concept> <WinCon>",
  desc: "je modifie le deck à la liste des decks. Veuillez vérifier que vous n'avez pas créé de conflit dans la base de données avec `+>debugVarDecks all`"
}
