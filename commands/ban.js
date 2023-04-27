const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!bUser) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let bReason = args.join(" ").slice(22);
  if(!args[1]) return message.channel.send("Précisez un motif");
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(bUser.hasPermission("MANAGE_MESSAGES")|| bUser.roles.has(toSave.id)) return message.channel.send("Cet utilisateur ne peut être banni");
  let banEmbed = new Discord.RichEmbed()
  .setDescription("Bannissement")
  .setColor("#000000")
  .addFields(
    {name:"Utilisateur banni", value: `${bUser} avec l'ID : ${bUser.id}`},
    {name:"Banni par",value:`${message.author} avec l'ID : ${message.author.id}`},
    {name:"Dans le channel",value:message.channel},
    {name:"A",value:message.createdAt},
    {name:"Pour",value:bReason}
  );

  let banchannel = message.guild.channels.find(`name`, "rapports");
  if(!banchannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  banchannel.send({embeds:[banEmbed]});
  message.guild.member(bUser).ban({days:0,reason:bReason});
  return;
}

module.exports.help = {
  name: "ban",
  type: "admin",
  usage: "ban <utilisateur>",
  desc: "je banni la cible."
}
