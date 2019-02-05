const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!kUser) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let kReason = args.join(" ").slice(22);
  if(!args[1]) return message.channel.send("Précisez un motif");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(kUser.hasPermission("MANAGE_MESSAGES")|| kUser.roles.has(toSave.id)) return message.channel.send("Cet utilisateur ne peut être exclu");
  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Exclusion")
  .setColor("#ff0000")
  .addField("Utilisateur exclu", `${kUser} avec l'ID : ${kUser.id}`)
  .addField("Exclu par", `${message.author} avec l'ID : ${message.author.id}`)
  .addField("Dans le channel", message.channel)
  .addField("A", message.createdAt)
  .addField("Pour", kReason);

  let kickchannel = message.guild.channels.find(`name`, "rapports");
  if(!kickchannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  kickchannel.send(kickEmbed);
  message.guild.member(kUser).kick(kReason);
  return;
}

module.exports.help = {
  name: "kick",
  type: "admin",
  usage: "kick <utilisateur>",
  desc: "je kick la cible."
}
