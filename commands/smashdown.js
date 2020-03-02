const Discord = require("discord.js")

const timer = 120000;

function traite(tab, utilisateur){
  utilisateur.send("Vous jouerez `" + tab.shift() + "`");
}

module.exports.run = async (bot, message, args) => {
  if(!args.length) return message.channel.send("Veuillez préciser un adversaire...");
  let joueur = message.member;
  let adversaire = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(adversaire.user.bot) return message.channel.send("Veuillez préciser un adversaire humain.");
  if(joueur == adversaire) return message.channel.send("Vous devez choisir un adversaire autre que vous...");
  let scoreP = 0;
  let scoreA = 0;
  var characters = new Array("Mario","Donkey Kong", "Link", "Samus","Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu", "Luigi", "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario", "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy", "Chrom", "Mr. Game & Watch", "Meta Knight" , "Pit", "Dark Pit", "Zero Suit Samus", "Wario", "Snake", "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas", "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B", "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer", "Rosalina & Luma", "Little Mac", "Greninja", "Mii Brawler", "Mii Swordfighter", "Mii Gunner", "Palutena", "Pac-Mac", "Robin", "Shulk", " Bowser Jr.", "Duck Hunt", "Ryu", "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon", "Richter", "King K. Rool", "Isabelle", "Incineroar");
  var dlcChar = new Array("Piranha Plant", "Joker", "Hero", "Banjo & Kazooie", "Terry", "Byleth");
  if(args.length > 1){
    message.channel.send("Les personnages dlc sont inclus dans le roaster.")
    characters = characters.concat(dlcChar);
  }else{
    message.channel.send("Les personnages dlc ne sont pas inclus dans le roaster.")
  }
  maxRounds = Math.ceil(characters.length/2);
  let res = 0;
  let cP = new Array();
  let cA = new Array();
  let done = false;
  let neededScore = Math.ceil(characters.length/4);
  let messageToSendP = "";
  let messageToSendA = "";
  message.channel.send("Début du smashdown ! Je vais maintenant envoyer en privé à chacun des participants le personnage à utiliser toutes les "+timer/60000+" minutes.");
  for(round = 0;round < maxRounds; round++){
    res = Math.floor((Math.random() * characters.length));
    cP[cP.length] = characters[res];
    characters.splice(res, 1);
    res = Math.floor((Math.random() * characters.length));
    cA[cA.length] = characters[res];
    characters.splice(res, 1);
  }
  traite(cA,adversaire);
  traite(cP,joueur);
  setInterval(function(){
    traite(cA,adversaire)
  },timer);
  setInterval(function(){
    traite(cP,joueur)
  },timer);
}

module.exports.help = {
  name: "smashdown",
  type: "fun",
  usage: "smashdown <utilisateur> <dlc>",
  desc: "je choisis des personnages de smash ultimate au hasard, en tenant compte des scores. L'argument DLC est optionnel."
}
