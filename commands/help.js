const Discord = require("discord.js")
const fs = require("fs");
const idfile = require('../0-jsons/monID.json');
const cheminfile = require('../0-jsons/chemin.json');

module.exports.run = async (bot, message, args) => {
  if(!args[0]){ //Si aucune commande n'est précisée.
    message.reply("La liste de mes commandes est en train de vous être envoyée par message privé. Pour plus d'informations utilisez `help <nomDeCommande>`");
    fs.readdir(cheminfile.commands,(err, files) => {
      if(err) console.log(err);
      let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0){
        console.log("La commande n'a pas été trouvée");
        return;
      }
      var nameFunlist = "";
      var nameSoclist = "";
      var nameAdmlist = "";
      var namePrivlist = "";
      jsfile.forEach((f, i) => {
        let props = require(cheminfile.commands + `${f}`);
        if(props.help.type == "fun"){
          nameFunlist += "`" + props.help.name + "` ";
        }
        if(props.help.type == "social"){
          nameSoclist += "`" + props.help.name + "` ";
        }
        if(props.help.type == "admin"){
          nameAdmlist += "`" + props.help.name + "` ";
        }
        if(message.author.id == idfile.id && props.help.type == "Private"){
          namePrivlist += "`" + props.help.name + "` ";
        }
      });
      if(message.author.id != idfile.id){
        let helpEmbed = new Discord.RichEmbed()
        .setTitle("Mes Commandes")
        .setColor("#00ff00")
        .addField("Commandes Funs", nameFunlist)
        .addField("Commandes Sociales", nameSoclist)
        .addField("Commandes d'Administration", nameAdmlist);
        message.author.send(helpEmbed);
      }else{
        let helpEmbedMe = new Discord.RichEmbed()
        .setTitle("Mes Commandes")
        .setColor("#00ff00")
        .addField("Commandes Funs", nameFunlist)
        .addField("Commandes Sociales", nameSoclist)
        .addField("Commandes d'Administration", nameAdmlist)
        .addField("Commandes de Talrem uniquement", namePrivlist);
        message.author.send(helpEmbedMe);
      }
    });
  }else{
    message.reply("Les informations sur la commande voulue sont en train de vous être envoyées par message privé. Pour obtenir la liste des commandes disponibles, utilisez `help`");
    fs.readdir(cheminfile.commands,(err, files) => {
    	if(err) console.log(err);
    	let jsfile = files.filter(f => f.split(".").pop() === "js")
    	if(jsfile.length <= 0){
    		console.log("La commande n'a pas été trouvée");
    		return;
    	}
      var cmdName = "";
      var cmdUse = "";
      var cmdDesc = "";
      var trouvee = 0;
      jsfile.forEach((f, i) => {
        let props = require(cheminfile.commands + `${f}`);
        if(props.help.name == args[0]){
          trouvee = 1;
          cmdName = props.help.name;
          cmdUse = props.help.usage;
          cmdDesc = props.help.desc;
        }
      });
      if(trouvee){
        message.author.send("La commande " + cmdName +" s'utilise avec " + cmdUse + " et fait que " + cmdDesc);
      }else{
        message.author.send("La commande spécifiée n'a pas été trouvée. Essayez `help` pour obtenir la liste des commandes disponibles.")
      }
    });
  }
}

module.exports.help = {
  name: "help",
  type: "social",
  usage: "help <commande>",
  desc: "Samantha donne des précisions sur la commande cible ou donne la liste de toutes les commandes si aucune commande n'est précisée."
}
