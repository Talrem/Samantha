const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!args[2])return message.reply("Précisez une question!");
  let replies = ["Oui.","Non","Je ne sais pas.","Redemandes moi plus tard.","Peut-être"];

  res = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag)
  .setColor("#ff9900")
  .addField("Question", question)
  .addField("Réponse", replies[res]);

  message.channel.send(ballEmbed);

  return;
}

module.exports.help = {
  name: "8ball",
  type: "fun",
  usage: "8ball <question>?",
  desc: "Samantha répondra à votre question."
}
