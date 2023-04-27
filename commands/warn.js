const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./json/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  //!warn @daeshan <reason>
  if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Vous ne pouvez pas donner d'avertissement.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("L'utilisateur n'a pas été trouvé.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
  if(!args[1]) return message.channel.send("Précisez un motif");
  let toSave = message.guild.roles.find(`name`, "dontTouch");
  if(wUser.hasPermission("MANAGE_MESSAGES")|| wUser.roles.has(toSave.id)) return message.reply("Vous ne pouvez pas avertir cet utilisateur.").then(msg => {
    msg.delete({ timeout: 10000 })
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);

  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./json/warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Avertissement")
  .setAuthor(message.author.displayName)
  .setColor("#fff000")
  .addField("Utilisateur averti", `${wUser.displayName} avec l'ID ${wUser.id}`)
  .addField("Dans", message.channel)
  .addField("Nombre d'avertissements", warns[wUser.id].warns)
  .addField("Pour", reason);

  let warnchannel = message.guild.channels.find(`name`, "rapports");
  if(!warnchannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`))
  warnchannel.send({embeds:[warnEmbed]});

  if(warns[wUser.id].warns == 2){
    //création du role s'il n'existe pas
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

    let mutetime = "10m";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${wUser.displayName} a été rendu muet pour avertissements multiples`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id)
      message.reply(`${wUser.displayName} peut parler de nouveau.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 4){
    //création du role s'il n'existe pas
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

    let mutetime = "2h";
    await(wUser.addRole(muteRole.id));
    message.channel.send(`${wUser.displayName} a été rendu muet pour avertissements multiples`);

    setTimeout(function(){
      wUser.removeRole(muteRole.id)
      message.reply(`${wUser.displayName} peut parler de nouveau.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 6){
    message.reply(`${wUser.displayName} a été exclu pour avertissements multiples.`)
    message.guild.member(wUser).kick(reason);
  }
  if(warns[wUser.id].warns == 8){
    message.reply(`${wUser.displayName} a été banni pour avertissements multiples.`)
    message.guild.member(wUser).ban({days:0,reason:bReason});
  }

}

module.exports.help = {
  name: "warn",
  type: "admin",
  usage: "warn <utilisateur> <raison>",
  desc: "je donne un avertissement à la cible et applique les sanctions prévues en fonction du nombre d'avertissements."
}
