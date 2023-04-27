const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.cache.find(role => role.name === roleName);
  if (!(message.member.roles.cache.has(role.id))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length != 1 && args.length != 2) return message.reply("La liste des arguments est invalide, vous devez préciser un adversaire et si vous le souhaitez, un tier.");
  if(args.length){
    idJoueur1 = message.author.id;
    idJoueur2 = message.mentions.users.first().id;
  }
  if(idJoueur1 == idJoueur2) return message.reply("Vous ne pouvez pas vous affronter vous même...")
  if(args.length == 2 && args[1].toLowerCase() != 'ban' && args[1].toLowerCase() != 'veryhigh' && args[1].toLowerCase() != 'high' && args[1].toLowerCase() != 'mid' && args[1].toLowerCase() != 'low' && args[1].toLowerCase() != 'veryllow' && args[1].toLowerCase() != 'untiered'){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow` ou ne pas renseigner cet argument.");
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
          if(sefile[i].t.toLowerCase() == args[1].toLowerCase()){
            if(!(sefile[i].t == "Ban" && args[1].toLowerCase() != "ban")){
              lesDeck1[j1] = sefile[i];
              j1++;
            }
          }
        }else{
          if(!(sefile[i].t == "Ban")){
            lesDeck1[j1] = sefile[i];
            j1++;
          }
        }
        break;
      case idJoueur2:
        if(args.length == 2){
          if(sefile[i].t.toLowerCase() == args[1].toLowerCase()){
            if(!(sefile[i].t == "Ban" && args[1].toLowerCase() != "ban")){
              lesDeck2[j2] = sefile[i];
              j2++;
            }
          }
        }else{
          if(!(sefile[i].t == "Ban")){
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
  name: "duel",
  type: "YuGiOh", //social fun Private ou admin
  usage: "duel <Utilisateur> <Tier>",
  desc: "j'envois à chaque Utilisateur un deck à utiliser en privé. Le premier dueliste est l'autheur du message. Le Tier n'est pas obbligatoire."
}
