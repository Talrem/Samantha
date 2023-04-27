const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let person = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!person) return message.reply("L'utilisateur n'a pas été trouvé").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  // love is the percentage
  // loveIndex is a number from 0 to 10, based on that love variable
  const love = Math.floor(Math.random() * 101);
  const loveIndex = Math.floor(love / 10);
  const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
  let embed = new Discord.RichEmbed()
      .setColor("#ffb6c1")
      .addField(`**${person.displayName}** aime **${message.member.displayName}** à ce point:`,`💟 ${Math.floor(love)}%\n\n${loveLevel}`);

  message.channel.send({embeds:[embed]});
}

module.exports.help = {
  name: "loveAffinity",
  type: "fun",
  usage: "loveAffinity <utilisateur>",
  desc: "je donne le taux d'affinité affectueuse de la cible."
}
