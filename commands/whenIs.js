const Discord = require("discord.js");
let purge = require("../json/purge.json");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[0]) return message.reply("Veuillez préciser une date en <annee-mois-jour> <heure:minutes:secondes>").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(!args[1]) args[1] = "00:00:00";
  var dateVoulue = new Date(args[0] + " " + args[1]);
  var dateActu = new Date();
  var nbSecTot = Math.ceil((dateVoulue.getTime()-dateActu.getTime())/(1000));
  seconds = Number(nbSecTot);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 3600 % 60);
  var dAff = d > 0 ? d + (d == 1 ? " jour " : " jours ") : "";
  var hAff = h > 0 ? h + (h == 1 ? " heure " : " heures ") : "";
  var mAff = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
  var sAff = s > 0 ? s + (s == 1 ? " seconde " : " secondes ") : "";
  let messageToSend = "Il reste ";
  messageToSend += dAff;
  if(sAff === "" && mAff === "" && !(hAff === "") && !(jAff === "")){ //Si il y a un jour ET une heure ET pas de minutes ET pas de secondes
    messageToSend += "et ";
  }
  messageToSend += hAff;
  if(sAff === "" && !(mAff === "") && (!(hAff === "") || !(jAff === ""))){ //Si il y a un jour OU une heure ET une minute ET pas de secondes
    messageToSend += "et ";
  }
  messageToSend += mAff;
  if(!(sAff === "") && (!(mAff === "") || !(hAff === "") || !(jAff === ""))){ //Si il y a un jour OU une heure OU une minute ET une seconde
    messageToSend += "et "
  }
  messageToSend += sAff;
  messageToSend += "avant la date spécifiée."//calcul du temps et préparation de l'affichage
  if(messageToSend === "Il reste avant la date spécifiée.") return message.reply("Veuillez préciser une date postérieure à la date actuelle.");
  return message.reply(messageToSend).then(msg => msg.delete(10000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  return message.channel.send("Une erreur est survenue...").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "whenIs",
  type: "social", //social fun Private ou admin
  usage: "whenIs <annee-mois-jour> <heure:minutes:secondes>, Si l'heure n'est pas spécifiée, ce sera minuit.", //whenIs 2020-12-31 23:59:59
  desc: "je donne le temps restant avant la date indiquée."
}
