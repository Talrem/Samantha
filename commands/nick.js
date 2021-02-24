const Discord = require("discord.js");
const fs = require("fs");
let addonFile = JSON.parse(fs.readFileSync("./json/addons.json", "utf8"));
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit de faire ça.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  let nick = "";
  for(let i = 1; i < args.length ; i++){
      nick += args[i];
      if(i != args.length){
          nick += " ";
      }
  }
  //console.log(nick);
  let guild = message.guild;
  let user = guild.member(args[0]);
  //console.log(user);
  user.setNickname(nick);
  message.delete();
}

module.exports.help = {
  name: "nick",
  type: "Private",
  usage: "nick <id-Utilisateur> <nom>",
  desc: "je change le pseudo d'un utilisateur."
}
