const Discord = require("discord.js")
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!args[1]) return message.channel.send("Précisez un temps de mute").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(!args[2]) return message.channel.send("Précisez un motif").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(toMute.hasPermission("MANAGE_MESSAGES") || toMute.roles.has(toSave.id)) return message.channel.send("Cet utilisateur ne peut être rendu muet.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

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
  if(!muteTime) return message.reply("Précisez un temps de mute.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let mReason = args[2];
  await(toMute.addRole(muteRole.id));
  message.reply(`${toMute} a été rendu muet pour ${ms(ms(muteTime))}.`);

  let muteEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#ffff00")
  .addField("Utilisateur rendu muet", `${toMute} avec l'ID : ${toMute.id}`)
  .addField("Rendu muet par", `${message.author} avec l'ID : ${message.author.id}`)
  .addField("Dans le channel", message.channel)
  .addField("A", message.createdAt)
  .addField("Pour", mReason)
  .addField("Pendant", ms(ms(muteTime)));

  let mutechannel = message.guild.channels.find(`name`, "rapports");
  if(!mutechannel) return message.channel.send("le salon des rapports n'a pas été trouvé.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

  mutechannel.send({embeds:[muteEmbed]});

  setTimeout(function(){
    if(toMute.roles.has(muteRole2.id))return message.channel.send("Étant donné que l'utilisateur est mute à un niveau supérieur, je ne peux pas le démute de son tempmute.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    toMute.removeRole(muteRole.id);
    message.channel.send(`${toMute} peut de nouveau parler.`).then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  }, ms(muteTime));

}

module.exports.help = {
  name: "tempmute",
  type: "admin",
  usage: "tempmute <utilisateur> <temps> <raison>",
  desc: "je mute temporairement la cible pour la raison donnée pendant le temps voulu et en informe le staff."
}
