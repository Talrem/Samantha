/*Ce fichier contient les lignes pour les permissions. Collez seulement les lignes qui vous intéressent dans votre commande*/
/*Moi only*/
const idfile = require('../0-jsons/monID.json');
if(message.author.id != idfile.id){
  return message.channel.send("Nope").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

/*Admin*/
if(!message.member.hasPermission("ADMINISTRATOR")){
  return message.reply("Nope").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

/*Message manager*/
if(!message.member.hasPermission("MANAGE_MESSAGES")){
  return message.reply("Nope").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}
