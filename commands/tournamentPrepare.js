const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(message.channel.name!="tournois") return message.reply("Cette commande ne peut être utilisée que dans le channel des tournois.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(args.length < 1) return message.reply("Vous devez préciser de quoi sera le tournois...").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous ne pouvez pas créer de tournois.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    let participeRole = message.guild.roles.find(`name`, "Participant");
    if(!participeRole){
      try{
        participeRole = await message.guild.createRole({
          name: "Participant",
          color: "#123456",
          permissions:[]
        })
      }catch(e){
        console.log(e.stack);
      }
    }
    var jeu = "";
    for(i = 0 ; i < args.length ; i++){
      jeu += args[i];
      if(i != args.length)  jeu += " ";
    }
    message.channel.send(message.author +" a créé un tournois de "+ args[0] + ". Afin d'y participer veuillez réagir à ce message avec 👍.")
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
