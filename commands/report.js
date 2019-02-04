const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.gets(args[0]));
  if(!rUser) return message.channel.send("L'utilisateur n'a pas été trouvé.");
  let reason = args.join(" ").slice(22);
  let toSave = message.guild.roles.find(`name`, "Bromo Rangers");
  if(rUser.roles.has(toSave.id)){
    message.channel.send(`Je présume que vous vouliez dire :\n+>report ${message.author} insubordination\nJe transmet donc la version corrigée.`);
    reason = "insubordination";
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Signalement")
    .setColor("#ffff00")
    .addField("Utilisateur signalé", `${message.author} avec l'ID : ${message.author.id}`)
    .addField("Signalé par", `${message.author} avec l'ID : ${message.author.id}`)
    .addField("Dans le channel", message.channel)
    .addField("A", message.createdAt)
    .addField("Pour", reason);
    let reportschannel = message.guild.channels.find(`name`, "rapports");
    if(!reportschannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
    if(reportEmbed) reportschannel.send(reportEmbed);
  }else{
    let reportEmbed1 = new Discord.RichEmbed()
      .setDescription("Signalement")
      .setColor("#ffff00")
      .addField("Utilisateur signalé", `${rUser} avec l'ID : ${rUser.id}`)
      .addField("Signalé par", `${message.author} avec l'ID : ${message.author.id}`)
      .addField("Dans le channel", message.channel)
      .addField("A", message.createdAt)
      .addField("Pour", reason);
    let reportschannel = message.guild.channels.find(`name`, "rapports");
    if(!reportschannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
    message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    reportschannel.send(reportEmbed1);
  }
}

module.exports.help = {
  name: "report",
  type: "social",
  usage: "report <utilisateur> <raison>",
  desc: "Samantha informe les admins du comportement de la cible pour la raison donnée."
}
