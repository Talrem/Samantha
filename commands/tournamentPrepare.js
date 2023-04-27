const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(message.channel.name!="tournois") return message.reply("Cette commande ne peut être utilisée que dans le channel des tournois.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(args.length < 1) return message.reply("Vous devez préciser de quoi sera le tournois...").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.some(role => role.name === "Gérant de tournois")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
    const participeRole = message.guild.roles.find(role => role.name === "Participant");
    if(!participeRole){
      try{
        participeRole = await message.guild.createRole({
          name: "Participant",
          color: "#10a010",
          "mentionable": true,
          permissions:[]
        })
      }catch(e){
        console.log(e.stack);
      }
    }
    var jeu = "";
    for(i = 0 ; i < args.length ; i++){
      jeu += args[i];
      if(i+1 != args.length)  jeu += " ";
    }
    message.channel.send(message.author +" a créé un tournois de `"+ jeu + "`. Afin d'y participer veuillez réagir à ce message avec 👍.")
    .then(msg=>{
      msg.react("👍");
      bot.on('messageReactionAdd', (reaction, user) => {
        if(!user.bot){
          if (reaction.emoji.name === "👍") {
            const guildMember = reaction.message.guild.members.get(user.id);
            const role = reaction.message.guild.roles.get(participeRole.id);
            guildMember.addRole(role);
          }
        }
      });
      bot.on('messageReactionRemove', (reaction, user) => {
        if(!user.bot){
          if (reaction.emoji.name === "👍") {
            const guildMember = reaction.message.guild.members.get(user.id);
            const role = reaction.message.guild.roles.get(participeRole.id);
            guildMember.removeRole(role);
          }
        }
      });
    });
}

module.exports.help = {
  name: "tournamentPrepare",
  type: "admin",
  usage: "tournamentPrepare <jeu>",
  desc: "je prépare un tournois du <jeu> donné en paramètre, pour être comptés dans les participants, les utilisateurs doivent réagir au message."
}
