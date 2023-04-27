const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length != 1 && args.length != 2) return message.reply("La liste des arguments est invalide, vous devez préciser un adversaire.");
  if(args.length){
    idJoueur1 = message.author.id;
    idJoueur2 = message.mentions.users.first().id;
  }
  if(idJoueur1 == idJoueur2) return message.reply("Vous ne pouvez pas vous affronter vous même...")
  let taille = sefile[-1].number;
  var i = 0;
  var lesDeck1 = new Array();
  var lesDeck2 = new Array();
  var canVH1 = 0;
  var canVH2 = 0;
  var canH1 = 0;
  var canH2 = 0;
  var canM1 = 0;
  var canM2 = 0;
  var canL1 = 0;
  var canL2 = 0;
  var canVL1 = 0;
  var canVL2 = 0;
  /*compte des decks*/
  var j1 = 0;
  var j2 = 0;
  var tierChoisi;
  var tiersPossibles = new Array();
  var k = 0;
  /*récupération des tiers des joueurs 1 et 2*/
  for(i = 0; i < taille; i++){
    switch (sefile[i].id) {
      case idJoueur1:
        switch (sefile[i].t) {
          //case "VeryHigh": canVH1 = 1;
          //break;
          case "High": canH1 = 2;
          break;
          case "Mid": canM1 = 3;
          break;
          case "Low": canL1 = 4;
          break;
          case "VeryLov": canVL1 = 5;
          break;
          default:
        }
      break;
      case idJoueur2:
        switch (sefile[i].t) {
          //case "VeryHigh": canVH2 = 1;
          //break;
          case "High": canH2 = 2;
          break;
          case "Mid": canM2 = 3;
          break;
          case "Low": canL2 = 4;
          break;
          case "VeryLov": canVL2 = 5;
          break;
          default:
        }
      break;
      default:
    }
  }
  /*Choix du tier en fonction des disponibilités de chaque joueur*/
  if(canVH1 && canVH2) tiersPossibles[k++] = "VeryHigh";
  if(canH1 && canH2) tiersPossibles[k++] = "High";
  if(canM1 && canM2) tiersPossibles[k++] = "Mid";
  if(canL1 && canL2) tiersPossibles[k++] = "Low";
  if(canVL1 && canVL2) tiersPossibles[k++] = "VeryLow";
  tierChoisi = tiersPossibles[Math.floor(Math.random() * k)];
  /*Application des decks pour chaque joueur*/
  for(i = 0; i < taille; i++){
    if(sefile[i].t == tierChoisi){
      switch (sefile[i].id) {
        case idJoueur1:
            lesDeck1[j1] = sefile[i];
            j1++;
        break;
        case idJoueur2:
            lesDeck2[j2] = sefile[i];
            j2++;
        break;
        default:
      }
    }
  }
  if(!j1 || !j2) return message.reply("Un duel ne peut pas être fair entre vous du fait que vous ne possedez pas de decks de tiers similaires...");;
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
  message.author.send({embeds:[deckEmbed1]});
  message.author.send({
    files : ['./images/DECKS/' + leDeck1.u + '/' + leDeck1.n + '.jpg']
  });
  message.mentions.users.first().send("Vous avez été défié en duel, voici le deck que je vous suggère d'utiliser :")
  message.mentions.users.first().send({embeds:[deckEmbed2]});
  return message.mentions.users.first().send({
    files : ['./images/DECKS/' + leDeck2.u + '/' + leDeck2.n + '.jpg']
  });
}

module.exports.help = {
  name: "duelFair",
  type: "YuGiOh", //social fun Private ou admin
  usage: "duelFair <Utilisateur>",
  desc: "j'envois à chaque Utilisateur un deck à utiliser en privé, les tiers de ces decks sont égaux, pas de decks Ban ni Untiered. Le premier dueliste est l'autheur du message."
}
