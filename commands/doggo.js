const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogembed = new Discord.RichEmbed()
  .setColor("f00f88")
  .setTitle("Doggo :dog:")
  .setImage(body.url);

  message.channel.send({embeds:[dogembed]})
  return;
}

module.exports.help = {
  name: "doggo",
  type: "fun",
  usage: "doggo",
  desc: "je montre un chien tout mignon."
}
