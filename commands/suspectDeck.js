const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(args.length != 1) return message.reply("La liste des arguments est invalide, on ne souhaite avoir que l'<ID> du deck.");
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  if(sefile[args[0]].t == "Untiered" || (sefile[args[0]].t == "Ban" && message.author.id != idfile.id) || sefile[args[0]].s == "1") return message.reply("Un deck ban, untiered ou suspect ne peut être modifié par cette commande.")
  let idJoueur = sefile[args[0]].id
  let nomDeck = sefile[args[0]].n;
  let username = sefile[args[0]].u;
  let provenance = sefile[args[0]].p;
  let concept = sefile[args[0]].c;
  let winCon = sefile[args[0]].w;
  let tier = sefile[args[0]].t;
  if(sefile[args[0]])
    if(sefile[args[0]].id != idJoueur && message.author.id != idfile.id) return message.reply("Le deck spécifié ne vous appartient pas.")
    sefile[args[0]] = {
      id:idJoueur,
      u:username,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier,
      s:"1"
    };
  fs.writeFile("./decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "suspectDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "suspectDeck <ID>",
  desc: "je rajoute ce deck à la liste ceux que l'on considère comme étant mal placé et dont on aimerait qu'il soient reconsidérés."
}
