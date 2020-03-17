const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(message.channel.name!="tournois") return message.reply("Cette commande ne peut être utilisée que dans le channel des tournois.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.some(role => role.name === "Gérant de tournois")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  const list = bot.guilds.get(message.guild.id);
  const role = message.guild.roles.find(role => role.name === "Participant");
  list.members.forEach(member => {
    if (member.roles.some(role => role.name === "Participant")) {
      member.removeRole(role).catch(console.error);
    }
    if (member.roles.some(role => role.name === "Gérant de tournois")) {
      member.removeRole(role).catch(console.error);
    }
  });
  return message.channel.send("Fin du tournois, merci à tous de votre participation.");
}

module.exports.help = {
  name: "tournamentEnd",
  type: "admin",
  usage: "tournamentEnd",
  desc: "je met fin au tournois, retirant le rôle `Participant` à tous."
}
