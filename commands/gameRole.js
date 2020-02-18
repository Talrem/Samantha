const Discord = require("discord.js");
const idfile = require('../0-jsons/monID.json');
const sefile = require("../json/roleNames.json");

function isIn(tab, argument) {
  var i;
  for(i = 0 ; i < tab.length;i++){
    if(argument == tab[i]) return 1;
  }
  return 0;
}

module.exports.run = async (bot, message, args) => {
  let roleName = args[0];
  var lesRoles = new Array();
  let msgRoles = "";
  let taille = sefile[-1].number;
  let j = 0;
  for(i = 0; i < taille; i++){
    lesRoles[j] = sefile[i].abrev;
    msgRoles += " `"+lesRoles[j]+"` pour "+sefile[i].nom + "\n";
    j++;
  }
  msgRoles +=".";
  if(!isIn(lesRoles,roleName)) return message.reply("Le rôle spécifié n'est pas un role valide. Les rôles valides sont :\n" + msgRoles);
  role = message.member.guild.roles.find('name', roleName);
  if (message.member.roles.some(role => role.name === roleName)) {
    message.member.removeRole(role).catch(console.error);
  }else{
    message.member.addRole(role).catch(console.error);
  }
  return message.channel.send("La modification de vos rôles a été effectuée.");
}

module.exports.help = {
  name: "gameRole",
  type: "social",
  usage: "gameRole <nom du jeu>",
  desc: "j'ajoute ou retire un role de jeu à l'utilisateur. Les rôles de jeu valide sont `mc` pour minecraft,`sm` pour super mario maker 2,`Dueliste` pour YuGiOh!,`L4D2` pour Left 4 Dead 2,`FEH` pour Fire Emblem Heroes,`GM` pour Garry's Mod,`PD2` pour PayDay 2,`LoL` pour League of Legends, `Civ6` pour Civilization 6, `Ck2` pour Crusader Kings 2, `Terraria`, `Starbound`, `MHW`"
}
