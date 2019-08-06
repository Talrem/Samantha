const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../ticketsReportsCartes.json");

module.exports.run = async (bot, message, args) => {
  let nomCarte = "";
  if(args.length < 1) return message.reply("Veuillez préciser un joueur dont vous vous plaignez.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  let nomJoueur = args[0].toLowerCase();
  if(args.length < 2) return message.reply("Veuillez préciser une carte dont vous vous plaignez.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  nomCarte+= args[1];
  let nomPlaintif = message.author.username
  nomPlaintif = nomPlaintif.toLowerCase();
  for(i=2; i < args.length;i++){
    nomCarte+= " " + args[i];
  }
  console.log(nomCarte);
  let taille = sefile[-1].number;

  if(!sefile[taille])
    sefile[taille] = {
      joueur: nomJoueur,
      carte:nomCarte,
      nerf:0,
      plaintif:nomPlaintif
    };
    sefile[-1].number++;
  fs.writeFile("./ticketsReportsCartes.json", JSON.stringify(sefile), (err) =>{
    if(err) console.log(err);
  })
  return message.channel.send("La plainte a été déposée avec succès. son id est : " + (sefile[-1].number - 1)).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "reportCard",
  type: "YuGiOh", //social fun Private ou admin
  usage: "reportCard <nom du joueur dont on se plaint> <nom de la carte dont on se plaint>",
  desc: "j'ajoute une plainte aux plaintes ."
}
