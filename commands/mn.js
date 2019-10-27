const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!args.length){
    return message.reply("Veuillez préciser un nombre.");
  }
  message.delete();
  message.author.send("https://nhentai.net/g/" + args[0] + "/");
}

module.exports.help = {
  name: "mn",
  type: "Private",
  usage: "mn <nombre>",
  desc: "je donne un lien internet..."
}
