const Discord = require("discord.js");
const fs = require("fs");
const rolefile = require("../json/roleNames.json");
const idfile = require('../0-jsons/monID.json');

module.exports.run = async (bot, message, args) => {
  if(message.author.id != idfile.id){
    return message.channel.send("Vous n'avez pas le droit d'ajouter de nouveaux addons.");
  }
  if(args.length < 2) return message.reply("La liste des arguments est invalide, attente d'au moins 2 arguments : +>addGameRole <Abbréviation> <Nom Du Jeu>.");
  let abr = args[0];
  let provenance = args[1].toLowerCase();
  let taille = rolefile[-1].number;
  let nomJeu = "";
  for(let i = 1; i < args.length; i++){
    nomJeu += args[i];
    if(i+1 != args.length) nomJeu += " ";
  }
  if(!rolefile[taille])
    rolefile[taille] = {
      abrev:abr,
      nom:nomJeu
    };
    rolefile[-1].number++;
  fs.writeFile("./json/roleNames.json", JSON.stringify(rolefile), (err) =>{
    if(err) console.log(err);
  })
  let guild = message.guild;
  guild.createRole({name: abr,color: 'RED'})
    .then(role => console.log(`Nouveau rôle créé : ${role.name}`))
    .catch(console.error);
  return message.channel.send("Le jeu a été ajouté avec succès.");
}

module.exports.help = {
  name: "addGameRole",
  type: "Private", //social fun Private ou admin
  usage: "addGameRole <Abbréviation> <Nom Du Jeu>",
  desc: "j'ajoute un jeu à la liste des rôles reconnus."
}
