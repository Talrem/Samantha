const Discord = require("discord.js");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit.");
  }
  if(!args[0])return message.channel.send("Veuillez préciser un utilisateur.")
  let toSave = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toSave) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let dontTouchRole = message.guild.roles.find(`name`, "ligne rouge");
  if(!dontTouchRole){
    try{
      dontTouchRole = await message.guild.createRole({
        name: "onTheLine",
        color: "#ff0000",
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

  return;
}

module.exports.help = {
  name: "onTheLine",
  type: "admin",
  usage: "onTheLine <utilisateur>",
  desc: "Samantha met la cible sur la ligne rouge."
}