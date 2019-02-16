const Discord = require("discord.js");
let purge = require("../purge.json");

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(purge.date == "") return message.reply("La prochaine purge n'a pas été programmée... ( ≧Д≦)").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  var datePurge = new Date(purge.date);
  var dateActu = new Date();
  var nbSecTot = Math.ceil((datePurge.getTime()-dateActu.getTime())/(1000));
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
  messageToSend += "avant la prochaine purge."
  return message.reply(messageToSend).then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "whenIsThePurge",
  type: "social", //social fun Private ou admin
  usage: "whenIsThePurge",
  desc: "donne le temps restant avant la prochaine purge."
}
