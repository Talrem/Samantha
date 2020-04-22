const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(args[0] < 1 || !args[0]) return message.reply("Vous devez avoir au minimum 1 option");
  if(args[0] > 6) return message.reply("Vous devez avoir au maximum 6 options");
  let question = ""
  for(i = 0; i < args.length;i++){
    question += args[i] + " "
  }
  message.channel.send("Répondez au sondage :\n\n`" + question + "`\n\nde " + message.author + "\nen réagissant sous ce message !")
      .then( async message => {
          try{
              message.react("🤷")
              if(args[0] >= 1){
                let emoji = message.guild.emojis.find('name', "un");
                await message.react(emoji)
              }
              if(args[0] >= 2){
                let emoji = message.guild.emojis.find('name', "deux");
                await message.react(emoji)
              }
              if(args[0] >= 3){
                let emoji = message.guild.emojis.find('name', "trois");
                await message.react(emoji)
              }
              if(args[0] >= 4){
                let emoji = message.guild.emojis.find('name', "quatre");
                await message.react(emoji)
              }
              if(args[0] >= 5){
                let emoji = message.guild.emojis.find('name', "cinq");
                await message.react(emoji)
              }
              if(args[0] >= 6){
                let emoji = message.guild.emojis.find('name', "six");
                await message.react(emoji)
              }
          }catch (error) {console.log(error)}
      })
  return;
}

module.exports.help = {
  name: "pollN",
  type: "social",
  usage: "pollN <nombre N> <choix 1> ... <choix N>",
  desc: "je permet aux utilisateurs de choisir entre vos N choix (maximum 6) avec des réactions."
}
