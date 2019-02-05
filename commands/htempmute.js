const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!args[1]) return message.channel.send("Précisez un temps de mute");
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(toMute.hasPermission("MANAGE_MESSAGES") || toMute.roles.has(toSave.id)) return message.channel.send("Cet utilisateur ne peut être rendu muet.");

  //création du role s'il n'existe pas
  let muteRole2 = message.guild.roles.find(`name`, "fullmute");
  let muteRole = message.guild.roles.find(`name`, "mute");
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "mute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //fin de la création du role
  let muteTime = args[1];
  if(!muteTime) return message.reply("Précisez un temps de mute.");
  let mReason = args[2];
  await(toMute.addRole(muteRole.id));
  message.reply(`${toMute} a été rendu muet pour ${ms(ms(muteTime))}.`);
  setTimeout(function(){
    if(toMute.roles.has(muteRole2.id))return message.channel.send("Étant donné que l'utilisateur est mute à un niveau supérieur, je ne peux pas le démute de son tempmute.");
    toMute.removeRole(muteRole.id);
    message.channel.send(`${toMute} peut de nouveau parler.`)
  }, ms(muteTime));

}

module.exports.help = {
  name: "htempmute",
  type: "Private",
  usage: "htempmute <utilisateur>",
  desc: "je mute temporairement la cible sans en informer le channel rapports."
}
