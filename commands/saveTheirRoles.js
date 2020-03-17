const Discord = require("discord.js")
const fs = require("fs");
const idfile = require('../0-jsons/monID.json');
const rolefile = require("../json/roles.json");

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.reply('Seul mon créateur a le droit à cette commande').then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  }
  if(!args.length) return message.reply("Veuillez préciser une cible").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  message.channel.send("Êtes-vous sûr(e) de vouloir sauvegarder tout les rôles que vous avez `ACTUELLEMENT` dans le fichier de sauvegarde ? Veuillez réagir à ce message avec 👍 si c'est ce que vous voulez.")
  .then(msg=>{
    msg.react("👍");
    bot.on('messageReactionAdd', (reaction, user) => {
      if(!user.bot){
        let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
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
    });
  });
}

module.exports.help = {
  name: "saveTheirRoles",
  type: "Private",
  usage: "saveTheirRoles <utilisateur>",
  desc: "je stock les rôles de l'utilisateur pour pouvoir les lui réappliquer avec la commande `saveMe`."
}
