const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let codeEmbed = new Discord.RichEmbed()
  .setTitle("Code pénal du LegitLair")
  .setColor("#ff0000")
  .addFields(
    {name:"Article 1", value:"Les bromos font ce qu'ils veulent."},
    {name:"Article 2", value:"Les connectés peuvent se plaindre via la commande report."},
    {name:"Article 3", value:"Pas d'incitations à la haine, sauf envers les noirs, les pds, les femmes, les arabes, les gros, les pauvres, les handicapés, les roux..."},
    {name:"Article 4", value:"Le général c'est pour parler, le débat c'est pour débattre, le spam commandes c'est pour les commandes, le BIDM c'est pour le reste et le hentai c'est pour le warn."},
    {name:"Article 5", value:"La censure est autorisée."}
  );
  message.channel.send(codeEmbed);
  return;
}

module.exports.help = {
  name: "codePenal",
  type: "fun",
  usage: "codePenal",
  desc: "je donne les règles du serveur."
}
