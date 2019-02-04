const Discord = require("discord.js")
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("Vos permissions sont trop basses pour faire ça.");
  if(!args[0] || args[0 == "help"]) return message.reply(`Usage : ${prefix}prefix <préfix voulu ici>`);

  let prefixes = JSON.parse(fs.readFileSync("../prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("../0-jsons/prefixes.json", JSON.stringify(prefixes), (err) => {
      if(err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#FF9900")
  .setTitle("Préfixe défini!")
  .setDescription(`Défini sur ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix",
  type: "admin",
  usage: "prefix <préfixe voulu>",
  desc: "Samantha réagira maintenant au préfixe voulu."
}
