const Discord = require("discord.js");
let purge = require("../purge.json");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  if(!args[0]) return message.reply("Veuillez préciser une date en <annee-mois-jour> <heure:minutes:secondes>").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[1]) args[1] = "00:00:00";
  var dateVoulue = new Date(args[0] + " " + args[1]);
  purge.date = dateVoulue;
  return message.reply("La purge a été programmée avec succès.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "setThePurge",
  type: "admin", //social fun Private ou admin
  usage: "setThePurge <annee-mois-jour> <heure:minutes:secondes>, Si l'heure n'est pas spécifiée, ce sera minuit.",
  desc: "je note la date de la prochaine purge."
}
