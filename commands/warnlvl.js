const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("L'utilisateur n'a pas été trouvé");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(wUser.hasPermission("MANAGE_MESSAGES")|| wUser.roles.has(toSave.id)) return message.reply("Cet utilisateur ne peut recevoir d'avertissements et n'en a donc aucun.")
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> a ${warnlevel} avertissements.`);

}

module.exports.help = {
  name: "warnlvl",
  type: "social",
  usage: "warnlvl <utilisateur>",
  desc: "Samantha donne le nombre d'avertissements de la cible."
}
