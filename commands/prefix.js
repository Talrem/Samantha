const Discord = require("discord.js")
const fs = require("fs");
let prefixes = require("../json/prefixes.json");

module.exports.run = async (bot, message, args, prefix) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply("Vos permissions sont trop basses pour utiliser cette commande.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(!args[0]) return message.reply(`Vous devez donner un nouveau préfixe à utiliser.`).then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./json/prefixes.json", JSON.stringify(prefixes), (err) =>{
    if(err) console.log(err);
  })

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Préfixe défini!")
  .setDescription(`Défini sur ${args[0]}`);

  message.channel.send({embeds:[sEmbed]}).then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
}

module.exports.help = {
  name: "prefix",
  type: "admin",
  usage: "prefix <préfixe voulu>",
  desc: "je réagirai maintenant au préfixe voulu."
}
