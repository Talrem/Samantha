const Discord = require("discord.js")
const fs = require("fs");
const rolefile = require("../json/roles.json");

module.exports.run = async (bot, message, args) => {
  if(!message.guild.id=="311112661108785153") return message.reply("Cette commande n'est pas disponible sur ce serveur, veuillez m'excuser pour ce désagrément.");
  let member = message.member;
  var roles = member.roles.array();
  var roleIDs = new Array();
  for(var i =0; i < roles.length; i++){
    roleIDs[i] = roles[i].id;
  }

  rolefile[message.author.id] = {
    roles:roleIDs
  };

  fs.writeFile("./json/roles.json", JSON.stringify(rolefile), (err) =>{
    if(err) console.log(err);
  })
  return message.reply("C'est fait !");
}

module.exports.help = {
  name: "saveRoles",
  type: "social",
  usage: "saveRoles",
  desc: "je stock les rôles de l'utilisateur pour pouvoir les lui réappliquer avec la commande `saveMe`."
}
