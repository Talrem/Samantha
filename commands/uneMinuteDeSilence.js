const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let muteTime = "1m";
  //création du role s'il n'existe pas
  let muteRole = message.guild.roles.find(`name`, "MinuteDeSilence");
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "MinuteDeSilence",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          CONNECT: false,
          SPEAK: false,
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //fin de la création du role
  await(toMute.addRole(muteRole.id));
  message.reply(`${toMute} a été rendu muet pour ${ms(ms(muteTime))}.`);
  setTimeout(function(){
    toMute.removeRole(muteRole.id);
    message.channel.send(`${toMute} peut de nouveau parler.`)
  }, ms(muteTime));
}

module.exports.help = {
  name: "uneMinuteDeSilence",
  type: "admin",
  usage: "uneMinuteDeSilence <utilisateur>",
  desc: "je mute la cible pendant une minute."
}
