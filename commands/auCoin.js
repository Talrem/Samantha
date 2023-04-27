const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas le droit de faire ça.");
  let tocoin = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!args[1]) return message.reply("Précisez un temps de coin (nombre suivi de `s` `m` ou `h`)");
  if(!args[2]) return message.reply(`Précisez une raison de mettre ${tocoin} au coin`);
  if(!tocoin) return message.reply("L'utilisateur n'a pas été trouvé.");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  let coinTime = args[1];
  let cReason = args[2];
  message.reply(`${tocoin} a été mis au coin pour ${ms(ms(coinTime))}.`);
  setTimeout(function(){
    message.reply(`${tocoin} peut sortir du coin !`)
  }, ms(coinTime));

}

module.exports.help = {
  name: "auCoin",
  type: "admin",
  usage: "auCoin <utilisateur> <temps> <raison>",
  desc: "Je préviens quand quelqu'un peut sortir du coin."
}
