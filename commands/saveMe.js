const Discord = require("discord.js")
const rolefile = require("../json/roles.json");

module.exports.run = async (bot, message, args) => {
  if(message.author.id==="281484394290741250") return message.reply("Mais voyons, vous savez que ça ne sert à rien :)").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));

  if(rolefile[message.author.id]){
    var roles = new Array();
    roles = rolefile[message.author.id].roles;

    for(let i = 0; i < roles.length;i++){

      let roleID = roles[i];
      let myRole = message.guild.roles.get(roleID);
      if(!message.member.roles.some(role => role.id === roleID)) {
        message.member.addRole(myRole).catch(console.error);
      }
    }
  }else{
    return message.reply("Aucun rôle à attribuer.");
  }
  return message.reply("Et voilà !")
}

module.exports.help = {
  name: "saveMe",
  type: "social",
  usage: "saveMe",
  desc: "je rend les rôles de l'utilisateur qui ont été sauvegardés au préalable avec la commande `saveRoles`."
}
