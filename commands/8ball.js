const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(args.length < 2) return message.reply("Précisez une question!");
  var repliesOK = new Array("Oui.","Non.","Peut-être.","Objectivement non.","Objectivement oui.","Probablement.","Je ne pense pas.");
  var repliesNO = new Array("Je ne sais pas.","Redemandes moi plus tard.");
  let question = args.slice(0).join(" ");
  let res = 0;
  let reply = "";
  let n = Math.floor((Math.random()*4));
  switch (n) {
    case 0:
    res = Math.floor((Math.random() * repliesNO.length));
    reply = repliesNO[res]
    break;
    default:
    res = Math.floor((Math.random() * repliesOK.length));
    reply = repliesOK[res]
    break;
  }
  if(message.content.toLowerCase().includes("  ")) reply = repliesOK[0];
  if(message.content.toLowerCase().includes("   ")) reply = repliesOK[1];
  if(message.content.toLowerCase().includes("objectivement")) reply = "Je pense qu'on ne peut que difficilement être objectif, chacun a un point de vue sur les choses et je ne fais pas exception, c'est une tâche trop difficile que d'essayer d'obtenir la vérité objective, car nous sommes tous cantonnés à notre propre version de la réalité, et en conséquence je ne peux répondre à cette question, j'en suis désolée."
  let ballEmbed = new Discord.EmbedBuilder()
  .setAuthor(message.author.tag)
  .setColor("#ff9900")
  .addFields(
    {name:"Question", value:question},
    {name:"Réponse", value:reply});

  return message.channel.send({embeds:[ballEmbed]});
}

module.exports.help = {
  name: "8ball",
  type: "fun",
  usage: "8ball <question>?",
  desc: "je répond à votre question."
}
