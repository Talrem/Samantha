const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Vous ne pouvez pas placer les gens sur la ligne rouge.");
  if(!args[0])return message.channel.send("Veuillez préciser un utilisateur.")
  let toSave = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!toSave) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let ligneRougeRole = message.guild.roles.find(`name`, "ligne rouge");
  if(!ligneRougeRole){
    try{
      ligneRougeRole = await message.guild.createRole({
        name: "onTheLine",
        color: "#ff0000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(ligneRougeRole, {
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  await(toSave.addRole(ligneRougeRole.id));

  return;
}

module.exports.help = {
  name: "onTheLine",
  type: "admin",
  usage: "onTheLine <utilisateur>",
  desc: "je met la cible sur la ligne rouge."
}
