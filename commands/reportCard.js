const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");

module.exports.run = async (bot, message, args) => {
  let nomCarte = "";
  if(args.length < 1) return message.reply("Veuillez préciser un joueur dont vous vous plaignez.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(args.length < 2) return message.reply("Veuillez préciser une carte dont vous vous plaignez.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  nomCarte+= args[1];
  for(i=2; i < args.length;i++){
    nomCarte+= " " + args[i];
  }
  console.log(nomCarte);
  let taille = sefile[-1].number;
  if(!sefile[taille])
    sefile[taille] = {
      joueur:args[0],
      carte:nomCarte,
      nerf:0,
      plaintif:message.author.username
    };
    sefile[-1].number++;
  fs.writeFile("./ticketsReportsCartes.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("La plainte a été déposée avec succès. son id est : " + (sefile[-1].number - 1)).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "reportCard",
  type: "social", //social fun Private ou admin
  usage: "reportCard <nom du joueur dont on se plaint> <nom de la carte dont on se plaint>",
  desc: "j'ajoute une plainte aux plaintes ."
}
