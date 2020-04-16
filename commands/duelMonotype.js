const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

module.exports.run = async (bot, message, args) => {
  if(args.length != 1) return message.reply("La liste des arguments est invalide, vous devez préciser un adversaire.");
  if(args.length){
    idJoueur1 = message.author.id;
    idJoueur2 = message.mentions.users.first().id;
  }
  if(idJoueur1 == idJoueur2) return message.reply("Vous ne pouvez pas vous affronter vous même...")
  var type = ["Normal", "Plante", "Poison", "Eau", "Feu", "Combat", "Vol", "Sol", "Electrik", "Fée", "Acier", "Roche", "Insecte", "Dragon", "Psy", "Glace", "Spectre"];
  message.mentions.users.first().send("Vous avez été défié en duel, je vous suggère d'utiliser le type " + type[Math.floor(Math.random() * type.length)]);
  message.author.send("Je vous suggère d'utiliser le type " + type[Math.floor(Math.random() * type.length)]);
}

module.exports.help = {
  name: "duelMonotype",
  type: "fun", //social fun Private ou admin
  usage: "duelMonotype <Utilisateur>",
  desc: "j'envois à chaque Utilisateur un type à utiliser en privé. Le premier dueliste est l'autheur du message."
}
