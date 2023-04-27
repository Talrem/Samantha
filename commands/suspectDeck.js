const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length < 1 || args.length > 2) return message.reply("La liste des arguments est invalide, arguments attendus +>suspectDeck <ID> <+/-> pour savoir quel deck et vers où il est suspecté.");
  let taille = sefile[-1].number;
  if(args[0] > taille) return message.reply("Le deck avec l'ID précisé n'existe pas.");
  if(sefile[args[0]].t == "Untiered" || (sefile[args[0]].t == "Ban" && message.author.id != idfile.id) || sefile[args[0]].s == "1") return message.reply("Un deck ban, untiered ou suspect ne peut être modifié par cette commande.")
  if(sefile[args[0]].t == "VeryLow" && args[1] == "-") return message.reply("On ne peut pas faire baisser un deck Very Low.");
  let idJoueur = sefile[args[0]].id
  let nomDeck = sefile[args[0]].n;
  let username = sefile[args[0]].u;
  let provenance = sefile[args[0]].p;
  let concept = sefile[args[0]].c;
  let winCon = sefile[args[0]].w;
  let tier = sefile[args[0]].t;
  var sus = "0";
  if(args.length == 2){
    switch(args[1]){
      case "+":
        sus = "1"
      break;
      case "-":
        sus = "-1"
      break;
      default: return message.reply("L'argument est invalide, soit + ou - pour dire si vous pensez que le deck devrait augmenter ou baisser son tier.")
    }
  }
  if(sefile[args[0]])
    sefile[args[0]] = {
      id:idJoueur,
      u:username,
      n:nomDeck,
      p:provenance,
      c:concept,
      w:winCon,
      t:tier,
      s:sus
    };
  fs.writeFile("./json/decks.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("Le deck a été enregistré avec succès.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "suspectDeck",
  type: "YuGiOh", //social fun Private ou admin
  usage: "suspectDeck <ID> <+/->",
  desc: "je rajoute ce deck à la liste ceux que l'on considère comme étant mal placé et dont on aimerait qu'il soient reconsidérés."
}
