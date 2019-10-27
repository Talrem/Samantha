const botconfig = require('./botconfig.json');
const nbCommandesPrec = require('./nbCommandesPrec.json');
const tokenfile = require('./0-jsons/token.json');
const cheminfile = require('./0-jsons/chemin.json');
let coins = require("./coins.json");
const Discord = require('discord.js');
const can = require("./canPlay.json");
const bot = new Discord.Client()
const fs = require("fs");
bot.commands = new Discord.Collection();
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;
const YTDL = require("ytdl-core");
global.servers = {};

function playing(connection, message){
  var server = servers[message.guild.id]
  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
  server.queue.shift();
  server.dispatcher.on("end", function(){
    if(server.queue[0]){
      playing(connection, message);
    }
  });
}

function alea(n){
  return Math.floor(Math.random() * n);
}
//lecture des commandes du bot et log
fs.readdir(cheminfile.commands,(err, files) => {
  console.log("Début du chargement des commandes.\n")
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("La commande n'a pas été trouvée\n");
		return;
	}
  let nbCommandes = 0;
  let nbCommandesPriv = 0;
	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log("Chargement de : " + props.help.name + "     type : " + props.help.type  + "\nusage : " + props.help.usage + "\n");
    nbCommandes++;
    if(props.help.type == "Private") nbCommandesPriv++;
		bot.commands.set(props.help.name, props);
	});
  console.log(nbCommandes + " commandes ont été chargées. Dont " + nbCommandesPriv + " commandes privées.\n");
});

//le bot en lui meme
bot.on('ready', async () => {
	console.log(`${bot.user.username} est en ligne!\n`)
  console.log(`${bot.user.username} est connectée sur ${bot.guilds.size} serveurs!\n`);
	bot.user.setActivity("+>help", {type: "WATCHING"})
	.then(() => console.log('Activité mise en place avec succès\n'))
	.catch(console.error)
});

//acceuil
bot.on('guildMemberAdd', function(member){
	var role = member.guild.roles.find('name', 'Connecté');
  if(role) member.addRole(role)
	member.createDM().then(function(channel){
		return channel.send('Bienvenue sur le serveur ' + member.displayName + ".\nJe suis le bot créé par Talrem, n'hésites à poser lui des questions ^^\nPour avoir accès à la liste des commandes, envois +>help")
	}).catch(console.error)
});

//pour les messages qui commencent par le préfixe
bot.on("message", async message =>{
	if(message.author.bot) return;
  if(message.guild === null){
    console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a envoyé "' + message + '"' + " en message privé.")
    let replies = ["J'ai déjà un petit copain...","俺 は エミリア が 好き だ...","Je ne répond pas aux messages privés.","Désolée, je préfère qu'on reste amis...","Mais oui c'est clair !","Sorry, next.","Je ne peux pas te parler, j'ai aqualicorne. C'est comme de l'aqua poney, mais avec des licornes."];
    res = Math.floor((Math.random() * replies.length));
    return message.channel.send(replies[res]);
  }
  res = Math.floor(Math.random() * 1000) + 1;
  if(res == 1 || res == 12 || res == 42 || res == 69 || res == 420 || res == 666 || res == 1000){
    message.author.createDM().then(function(channel){
  		channel.send("J'ai perdu...");
  	}).catch(console.error)
    console.log("\n"+Date() + " " + message.author.username + "#" + message.author.discriminator + "    " + res+"\n");
  }
  let mes = message.content.toUpperCase();
	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	if(!prefixes[message.guild.id]){
		prefixes[message.guild.id] = {
			prefixes: botconfig.prefix
		};
	}
  let prefix = prefixes[message.guild.id].prefixes;
  //pour les messages qui commencent sans le préfixe
  /*Vérification que les messages qui sont des citations sont du bon type*/
  if(message.channel.id==627587389346283526){
    var citation = new RegExp(/"[\w|\W]+" - [\w|\W]+, \d+/);
    if(!citation.test(message.content)) {
      message.author.send("Votre message est : " + message.content);
      message.delete();
      return message.author.send('Il est incorrect, vous devez suivre la syntaxe `"message" - Auteur, Année`');
    }
  }
  //time to duel serveur duels
  if(message.content.startsWith('@everyone')) {
    if(message.channel.guild.id!=508380503473258516) return;
    message.channel.send("It's time to du-du-du-DUEL !\nA toi de jouer !!")
    message.channel.send("", {
      file : "./images/duel.gif"
    });
  };
  switch(mes){
    case "4":
      message.author.send(Date());
      message.delete();
    break;
    case "8":
      message.author.send("J'ai perdu");
      message.delete();
    break;
    case "12":
      message.author.send("Jaune");
      message.delete();
    break;
    case "69":
      message.author.send(res = Math.floor(Math.random() * 288856) + 1);
      message.delete();
    break;
    default:break;
  }
  if(mes.startsWith('DEJA VU') || mes.startsWith('DÉJÀ VU') || mes.startsWith('DEJÀ VU') || mes.startsWith('DÉJA VU')) {
    message.channel.send("I've just been to this place before")
    /*if(!can.can || message.guild.voiceConnection) return;
    if(message.member.voiceChannel){
      if(!servers[message.guild.id]){
        servers[message.guild.id] = {queue:[]}
      }
      message.member.voiceChannel.join()
      .then(connection =>{
        var server = servers[message.guild.id];
        server.queue.push("https://youtu.be/BY2J3I_l2P4")
        playing(connection, message);
      })
      if(message.guild.voiceConnection){
        message.guild.voiceConnection.disconnect()
        return;
      }else{
        return message.reply("Je ne suis pas en vocal...").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
      }
    }*/
  };

  /*if(mes.includes('THIS IS SO SAD') &&  mes.includes('PLAY DESPACITO')){
    if(!can.can) return message.reply("Je n'ai pas actuellement le droit de venir en vocal...")
    if(message.guild.voiceConnection) return;
    if(message.member.voiceChannel){
      if(!servers[message.guild.id]){
        servers[message.guild.id] = {queue:[]}
      }
      message.member.voiceChannel.join()
      .then(connection =>{
        var server = servers[message.guild.id];
        server.queue.push("https://youtu.be/nGl8IpFZ97Y")
        playing(connection, message);
      })
      if(message.guild.voiceConnection){
        message.guild.voiceConnection.disconnect()
        return;
      }else{
        return message.reply("Je ne suis pas en vocal...").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
      }
    }else{
      return message.reply("Vous devez être dans un channel vocal pour me faire venir.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    }
  };*/
  //systeme d'économie
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }
  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if(err) console.log(err)
    });
  }

  //John Steewart
  if (mes.startsWith('AND') && message.channel.guild.id==311112661108785153) {
    let emoji = message.guild.emojis.find('name', "johnsteewart");
    message.react(emoji);
    message.channel.send('his name is JOHN STEEWART !!!!!')
    message.channel.send("", {
      file : "./images/JohnS.jpg"
    });
  };

  //suppression des mots bannis
  /*let banlist = [
  "CHOCOLATINE",
  "BITE",
  "SUCEUR",
  "FIGHTCLUB",
  "FIGHT CLUB",
  "MICOSE",
  "LINK OSE",
  "JUL"
  ];
  let trouver = false;
  for (var i in banlist){
    if(mes.startsWith(banlist[i]) || mes.includes("\n" + banlist[i]) || mes.includes(" " + banlist[i]) || mes.includes(banlist[i] + " ")){
      trouver = true;
    }
  }
  if (trouver){
    message.delete();
    console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + " a dit " + message + "\n")
    message.reply("On ne parle pas de ça ici ! è_é")
    .then(message => message.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    return;
  }*/

  //réaction aux insultes
  /*let insulteList = [
  "MOCHE",
  "CON",
  "SUCEUR",
  "BACHI BOUZOUK",
  "CONNARD",
  "FDP",
  "BATARD",
  "BÂTARD",
  "ENCULÉ",
  "ENCULER",
  "SALE",
  "DE PUTE"
  ];
  let trouverInsulte = false;
  for (var i in insulteList){
    if(mes.startsWith(insulteList[i] + " ") || mes.includes("\n" + insulteList[i] + " ") || mes.includes(" " + insulteList[i]  + " ")){
      trouverInsulte = true;
    }
  }
  if (trouverInsulte && !mes.startsWith(prefix)){
    console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + " a dit " + message)
    return message.reply("No U")
  }*/

  //popopo
  /*if (mes.startsWith('POPOPO')) {
    message.channel.send('', {
      file : './images/POPOPO.gif'
    });
  }*/

  //test des préfixes
	if(!message.content.startsWith(prefix)) return;
  console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a utilisé la commande "' + message + '"\n');
	if(cooldown.has(message.author.id)){
		message.delete();
		return message.reply("Veuillez attendre 5 secondes entre les commandes.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
	}
	if(!message.member.hasPermission("ADMINISTRATOR")){
		cooldown.add(message.author.id);
	}
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile){
    commandfile.run(bot,message,args);
  }else{
    message.reply("Désolée, la commande n'a pas été trouvée, peut-être devriez vous consulter l'aide avec `" + prefix + "help`");
  }

	setTimeout(() => {
		cooldown.delete(message.author.id)
	}, cdseconds * 1000)

});

//lien du bot au code
bot.login(tokenfile.token);
