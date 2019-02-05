const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas le droit de faire ça.");
  if(!args[0])return message.channel.send("Veuillez préciser un utilisateur à rendre muet.");
  let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!args[1]) return message.channel.send("Précisez un motif");
  if(!toMute) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(toMute.hasPermission("MANAGE_MESSAGES") || toMute.roles.has(toSave.id)) return message.channel.send("Cet utilisateur ne peut être rendu muet.");

  //création du role s'il n'existe pas
  let muteRole = message.guild.roles.find(`name`, "fullmute");
  let muteRole2 = message.guild.roles.find(`name`, "mute");
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "fullmute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          CONNECT: false,
          SPEAK: false,
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  await(toMute.addRole(muteRole.id));
  message.reply(`${toMute} a été rendu muet.`);
  if(toMute.roles.has(muteRole2.id)){
    message.channel.send('à un niveau supérieur au précédent.')
    toMute.removeRole(muteRole2.id);
  }
  let muteEmbed = new Discord.RichEmbed()
  .setDescription("Mute")
  .setColor("#ffff00")
  .addField("Utilisateur rendu muet", `${toMute} avec l'ID : ${toMute.id}`)
  .addField("Rendu muet par", `${message.author} avec l'ID : ${message.author.id}`)
  .addField("Dans le channel", message.channel)
  .addField("A", message.createdAt);

  let mutechannel = message.guild.channels.find(`name`, "rapports");
  if(!mutechannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");

  mutechannel.send(muteEmbed);
}

module.exports.help = {
  name: "mute",
  type: "admin",
  usage: "mute <utilisateur>",
  desc: "je mute la cible."
}
