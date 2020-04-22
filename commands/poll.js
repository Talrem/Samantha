const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let question = ""
  if(args.length == 0) return message.reply("Un sondage c'est mieux quand ça demande quelque chose.");
  for(i = 0; i < args.length;i++){
    question += args[i] + " "
  }
  message.channel.send("Répondez au sondage de " + message.author + ":\n\n`" + question + "`\n\nen réagissant sous ce message !")
      .then( async message => {
          try{
              await message.react("👍")
              await message.react("🤷")
              await message.react("👎")
          } catch (error) {console.log(error)}
      })
  return;
}

module.exports.help = {
  name: "poll",
  type: "social",
  usage: "poll <question>",
  desc: "je permet aux utilisateurs de réagir à un sondage sur votre question."
}
