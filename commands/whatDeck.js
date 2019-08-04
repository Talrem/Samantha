const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../decks.json");

module.exports.run = async (bot, message, args) => {
  if(args.length != 4 && args.length != 0) return message.reply("La liste des arguments est invalide, vous devez préciser <Provenance> <Concept> <WinCon> <Tier>, ou remplacer par un `-` ceux qui n'importent pas.");
  if(args.length && args[3] != '-' && args[3] != 'Ban' && args[3] != 'VeryHigh' && args[3] != 'High' && args[3] != 'Mid' && args[3] != 'Low' && args[3] != 'VeryLow'){
    return message.reply("Le tier précisé est invalide. Veuillez utiliser un tier parmis `-`, `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, et `VeryLow`.");
  }
  let taille = sefile[-1].number;
  let idJoueur = message.author.id;
  var i = 0;
  var lesDeck = new Array();
  var j = 0;
  for(i = 0; i < taille; i++){
    if(sefile[i].id == idJoueur){
      if(args.length){
        if((args[0] == "-" || sefile[i].p == args[0]) && (args[1] == "-" || sefile[i].c == args[1]) && (args[2] == "-" || sefile[i].w == args[2]) && (args[3] == "-" || sefile[i].t == args[3])){
          if(!(sefile[i].t == "Ban" && args[3] != "Ban")){
            lesDeck[j] = sefile[i];
            j++;
          }
        }
      }else{
        if(!(sefile[i].t == "Ban" && args[3] != "Ban")){
          lesDeck[j] = sefile[i];
          j++;
        }
      }
    }
  }
  if(j == 0) return message.reply("Vous ne possédez aucun deck... Ou alors aucun d'entre eux ne correspond aux arguments fournis...");
  let leDeck = lesDeck[Math.floor(Math.random() * j)];
  let deckEmbed = new Discord.RichEmbed()
  .setDescription("Deck à utiliser")
  .setColor("#15f153")
  .setThumbnail(message.author.avatarURL)
  .addField("Nom", leDeck.n)
  .addField("Provenance", leDeck.p)
  .addField("Concept", leDeck.c)
  .addField("Win Condition", leDeck.w)
  .addField("Tier", leDeck.t);
  return message.channel.send(deckEmbed);
}

module.exports.help = {
  name: "whatDeck",
  type: "social", //social fun Private ou admin
  usage: "whatDeck <Provenance> <Concept> <WinCon> <Tier>",
  desc: "je donne le nom d'un deck pris au hasard qui correspond aux arguments donnés. Si la valeur de l'argument n'est pas importante, mettez un `-`. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low` et `VeryLow`."
}
