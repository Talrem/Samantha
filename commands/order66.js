const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
if(message.guild.id!="311112661108785153") return message.reply("Cette commande n'est pas disponible sur ce serveur");
  let kReason = "La puuuuuuurge !";
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let i;
  // Get the Guild and store it under the variable "list"
  const list = bot.guilds.get("311112661108785153");
  // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
  list.members.forEach(member => {
    if(member.roles.has("512016395089870884") && !member.hasPermission("ADMINISTRATOR")){
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("Purge")
      .setColor("#ff0000")
      .addField("Utilisateur purgé", `${member} avec l'ID : ${member.id}`)
      .addField("A", message.createdAt);
      let kickchannel = message.guild.channels.find(`name`, "rapports");
      if(!kickchannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
      kickchannel.send(kickEmbed);
      message.guild.member(member).kick(kReason)
    }
  });
  return message.reply("L'ordre a été exécuté.");
}

module.exports.help = {
  name: "order66",
  type: "admin",
  usage: "order66",
  desc: "j'exécute toutes les personnes à purger."
}
