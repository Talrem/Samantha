const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Non!");
  let botmessage = args.join(" ");
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  message.channel.send(botmessage);
  return;
}

module.exports.help = {
  name: "say",
  type: "admin",
  usage: "say <message>",
  desc: "je réplique votre message."
}
