const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  message.delete();
  if(message.channel.name!="tournois") return message.reply("Cette commande ne peut être utilisée que dans le channel des tournois.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let j = 0;
  let lesJoueurs = new Array();
  const list = bot.guilds.get(message.guild.id);
  list.members.forEach(member => {
    if(member.roles.some(role => role.name === "Participant")){
      lesJoueurs[j++] = member.user.username + "#" + member.user.discriminator;
    }
  });
  if(lesJoueurs.length == 1){
    return message.channel.send("Le gagnant du tournois est : `"+lesJoueurs[0]+"` ! Félicitations !");
  }
  let messageToSend = "";
  let turn = 0;
  for(let i = 0; i < lesJoueurs.length; i++){
    k = Math.floor(Math.random() * lesJoueurs.length)
    while(lesJoueurs[k] == "0"){
      k = Math.floor(Math.random() * lesJoueurs.length)
    }
    switch (turn%2) {
      case 0:
        messageToSend += "`"+lesJoueurs[k] + "` ";
      break;
      default:
        messageToSend += "VS `" + lesJoueurs[k] + "`\n\n";
      break
    }
    lesJoueurs[k] = "0";
    turn++;
  }
  message.channel.send("Le tournois a été lancé ! Si vous perdez, réagissez avec 😖 pour que je vous retire de la liste des participants.\nVoici les affrontements qui auront lieu lors de ce round. :\n" + messageToSend)
  .then(msg=>{
    msg.react("😖");
    bot.on('messageReactionAdd', (reaction, user) => {
      if(!user.bot){
        if (reaction.emoji.name === "😖") {
          const guildMember = reaction.message.guild.members.get(user.id);
          const role = reaction.message.guild.roles.find(role => role.name === "Participant");
          if (guildMember.roles.some(role => role.name === "Participant")) {
            guildMember.removeRole(role).catch(console.error);
          }
        }
      }
    });
  });
}

module.exports.help = {
  name: "tournamentStart",
  type: "admin",
  usage: "tournamentStart",
  desc: "je donne les affrontements à faire, pour réutiliser cette commande, les perdants devront réagir avec l'émoji 😖."
}
