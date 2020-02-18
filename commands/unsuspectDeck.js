const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(args.length != 1) return message.reply("La liste des arguments est invalide, on ne souhaite avoir que l'<ID> du deck. : +>unsuspectDeck <ID>");
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  if(message.author.id != idfile.id) return message.reply("Je ne peux pas vous laisser faire ça...")
  let idJoueur = sefile[args[0]].id
  let nomDeck = sefile[args[0]].n;
  let username = sefile[args[0]].u;
  let provenance = sefile[args[0]].p;
  let concept = sefile[args[0]].c;
  let winCon = sefile[args[0]].w;
  let tier = sefile[args[0]].t;
  if(sefile[args[0]])
    sefile[args[0]] = {
      id:idJoueur,
      u:username,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier,
      s:"0"
    };
  fs.writeFile("./json/decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "unsuspectDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "unsuspectDeck <ID>",
  desc: "je retire ce deck à la liste ceux que l'on considère comme étant mal placés et dont on aimerait qu'il soient reconsidérés."
}
