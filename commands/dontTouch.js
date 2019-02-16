const Discord = require("discord.js");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit.");
  }
  if(!args[0])return message.channel.send("Veuillez préciser un utilisateur.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let toSave = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toSave) return message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let dontTouchRole = message.guild.roles.find(`name`, "dontTouch");
  if(!dontTouchRole){
    try{
      dontTouchRole = await message.guild.createRole({
        name: "dontTouch",
        color: "#cfecfe",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(dontTouchRole, {
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  await(toSave.addRole(dontTouchRole.id));

  message.channel.send(`${toSave} est maintenant protégé.`).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  return;
}

module.exports.help = {
  name: "dontTouch",
  type: "Private",
  usage: "dontTouch <utilisateur>",
  desc: "je n'ai plus le droit d'appliquer les commandes de modération sur la cible."
}
