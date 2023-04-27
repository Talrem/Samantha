const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Je ne peux pas vous laisser faire ça.")
    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Veuillez donner un ID pour que je puisse déban la personne.")
    let bReason = args.slice(1).join(" ");
        if(!bReason) reason = "et pourquoi pas ?";
    try{
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} a été déban du serveur !`);
    }catch(e){
        console.log(e.message)
    }
    return;
}

module.exports.help = {
  name: "unban",
  type: "admin",
  usage: "unban <ID d'utilisateur>",
  desc: "je débanni la cible."
}
