const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(args[0]){
    args[0] = parseInt(args[0],10);
    args[0] = args[0] + 1;
  }
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Vous n'avez pas la permission de supprimer des messages!");
  if(!args[0]) return message.channel.send("Précisez un nombre de messages à supprimer");
  if(args[0] > 99) return message.channel.send("Veuillez donner un nombre moins grand que 99.")
  message.channel.bulkDelete(args[0])
  .then(() => {
    args[0] = args[0] - 1;
    message.channel.send(`Clear de ${args[0]} messages.`).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  })
  .catch(error => message.reply(`Impossible de supprimer les messages car ${error}`));
}

module.exports.help = {
  name: "clear",
  type: "admin",
  usage: "clear <nombre>",
  desc: "j'effacerai le nombre de messages voulu."
}
