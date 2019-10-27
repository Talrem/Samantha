const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
		if(args.length < 3){
			return message.reply("Veuillez donner 3 arguments : <Auteur> <Année> <Message>");
		}
		let messageToSend = "", messageTS;
		let i;
		messageToSend = args[2];
		for(i = 3 ; i < args.length; i++) messageToSend+= " " + args[i];
		messageTS = '"' + messageToSend + '" - ' + args[0] + ', ' + args[1];
		message.author.send(messageTS);
  return;
}

module.exports.help = {
  name: "citation",
  type: "social",
	usage: "citation <Auteur> <Année> <Message>",
  desc: "je donne la bonne syntaxe pour la citation voulue en privée."
}
