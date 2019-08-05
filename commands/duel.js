const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  if(args.length != 1 && args.length != 2) return message.reply("La liste des arguments est invalide, vous devez préciser un adversaire et si vous le souhaitez, un tier.");
  if(args.length){
    idJoueur1 = message.author.id;
    idJoueur2 = message.mentions.users.first().id;
  }
  if(idJoueur1 == idJoueur2) return message.reply("Vous ne pouvez pas vous affronter vous même...")
  if(args.length == 2 && args[1] != '-' && args[1] != 'Ban' && args[1] != 'VeryHigh' && args[1] != 'High' && args[1] != 'Mid' && args[1] != 'Low' && args[1] != 'VeryLow'){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow` ou ne pas renseigner de 3ème argument.");
  }
  let taille = sefile[-1].number;
  var i = 0;
  var lesDeck1 = new Array();
  var lesDeck2 = new Array();
  var j1 = 0;
  var j2 = 0;
  for(i = 0; i < taille; i++){
    switch (sefile[i].id) {
      case idJoueur1:
        if(args.length == 2){
          if(sefile[i].t == args[1]){
            if(!(sefile[i].t == "Ban" && args[1] != "Ban")){
              lesDeck1[j1] = sefile[i];
              j1++;
            }
          }
        }else{
          if(!(sefile[i].t == "Ban" && args[1] != "Ban")){
            lesDeck1[j1] = sefile[i];
            j1++;
          }
        }
        break;
      case idJoueur2:
        if(args.length == 2){
          if(sefile[i].t == args[1]){
            if(!(sefile[i].t == "Ban" && args[1] != "Ban")){
              lesDeck2[j2] = sefile[i];
              j2++;
            }
          }
        }else{
          if(!(sefile[i].t == "Ban" && args[1] != "Ban")){
            lesDeck2[j2] = sefile[i];
            j2++;
          }
        }
        break;
      default:
    }
  }
  if(!j1) message.reply("Vous Ne possèdez aucun deck ... Ou alors aucun d'entre eux ne correspond aux arguments fournis...");
  if(!j2) message.reply(args[0] + " Ne possède aucun deck ... Ou alors aucun d'entre eux ne correspond aux arguments fournis...");
  if(!j1 || !j2) return;
  let leDeck1 = lesDeck1[Math.floor(Math.random() * j1)];
  let leDeck2 = lesDeck2[Math.floor(Math.random() * j2)];
  let deckEmbed1 = new Discord.RichEmbed()
  .setDescription("Deck à utiliser")
  .setColor("#15f153")
  .addField("Nom", leDeck1.n)
  .addField("Provenance", leDeck1.p)
  .addField("Concept", leDeck1.c)
  .addField("Win Condition", leDeck1.w)
  .addField("Tier", leDeck1.t);
  let deckEmbed2 = new Discord.RichEmbed()
  .setDescription("Deck à utiliser")
  .setColor("#15f153")
  .addField("Nom", leDeck2.n)
  .addField("Provenance", leDeck2.p)
  .addField("Concept", leDeck2.c)
  .addField("Win Condition", leDeck2.w)
  .addField("Tier", leDeck2.t);
  message.author.send(deckEmbed1);
  message.mentions.users.first().send(message.author.displayName + "Vous a défié en duel, voici le deck que je vous suggère d'utiliser :")
  return message.mentions.users.first().send(deckEmbed2);
}

module.exports.help = {
  name: "duel",
  type: "social", //social fun Private ou admin
  usage: "duel <Utilisateur> <Tier>",
  desc: "j'envois à chaque Utilisateur un deck à utiliser en privé. Le premier dueliste est l'autheur du message. Le Tier n'est pas obbligatoire."
}
