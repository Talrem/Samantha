const Discord = require("discord.js")
const fs = require("fs");
let prefixes = require("../prefixes.json");

module.exports.run = async (bot, message, args, prefix) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vos permissions sont trop basses pour utiliser cette commande.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[0]) return message.reply(`Vous devez donner un nouveau préfixe à utiliser.`).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
    if(err) console.log(err);
  })

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Préfixe défini!")
  .setDescription(`Défini sur ${args[0]}`);

  message.channel.send(sEmbed).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "prefix",
  type: "admin",
  usage: "prefix <préfixe voulu>",
  desc: "je réagirai maintenant au préfixe voulu."
}
