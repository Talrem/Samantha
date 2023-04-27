const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let muteRole = message.guild.roles.find(`name`, "fullmute");
  let muteRole2 = message.guild.roles.find(`name`, "mute");
  if(!toMute.roles.has(muteRole.id) && !toMute.roles.has(muteRole2.id))return message.channel.send("Cet utilisateur n'est pas muet.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(muteRole)
  toMute.removeRole(muteRole.id);
  if(muteRole2)
  toMute.removeRole(muteRole2.id);
  message.channel.send(`${toMute} peut de nouveau parler.`)
}

module.exports.help = {
  name: "unmute",
  type: "admin",
  usage: "unmute <utilisateur>",
  desc: "je demute la cible."
}
