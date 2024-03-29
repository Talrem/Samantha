const botconfig = require('./json/botconfig.json');
const tokenfile = require('./0-jsons/token.json');
const cheminfile = require('./0-jsons/chemin.json');
const Discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const can = require("./json/canPlay.json");
const bot = new Client({ intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]});
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
    bot.user.setPresence({
        activities: [{ name: `Samantha. help`, type: ActivityType.Watching }],
        status: 'c',
    });
});

//acceuil
bot.on('guildMemberAdd', function(member){
    var role = member.bot ? member.guild.roles.find('name', 'Bots') :member.guild.roles.find('name', 'Connecté');
    if(role) member.addRole(role)
    member.createDM().then(function(channel){
        return channel.send('Bienvenue sur le serveur ' + member.displayName + ".\nJe suis le bot créé par Talrem, n'hésites à poser lui des questions ^^\nPour avoir accès à la liste des commandes, envois +>help")
    }).catch(console.error)
});

bot.on("messageUpdate", function(oldMessage, newMessage){
    /*let mes = newMessage.content.toUpperCase();
    if(mes.includes("U") && newMessage.author.id ==233191261417373696){
        newMessage.author.createDM().then(function(channel){
            channel.send(message.content.split("u").join("`u`").split("U").join("`U`"));
        }).catch(console.error)
        newMessage.channel.send("Ah ah, t'es n`u`l Alexis");
        newMessage.delete();
    }*/
    if(newMessage.channel.id==627587389346283526){
        newMessage.author.createDM().then(function(channel){
            channel.send("Hé dis donc, tu crois que je t'ai pas vu changer la citation : \""+oldMessage+"\"\n en \""+newMessage+"\"\n");
        }).catch(console.error)
        newMessage.delete();
    }
});

/*PTDR LE ROI DU SILENCE*/
bot.on("voiceStateUpdate", function(oldMember, newMember){
    if(newMember.selfMute){
        if(newMember.roles.some(role => role.name === 'Roi Du Silence')){
            newMember.user.createDM().then(function(channel){
                channel.send(`Dis donc c'est pas un peu de la triche d'être mute pendant un Roi du Silence ? You're Out ! (petite merde).`);
                console.log(member.user.username + " a perdu au roi du silence !");
            }).catch(console.error)
        }
        let myRole = newMember.guild.roles.find(role => role.name === 'Roi Du Silence');
        newMember.removeRole(myRole);
    }
});
bot.on("guildMemberSpeaking", function(member, speaking){
    if(speaking){
        if(member.roles.some(role => role.name === 'Roi Du Silence')){
            member.user.createDM().then(function(channel){
                channel.send(`Tu as perdu au roi du silence... You're Out ! (petite merde).`);
                console.log(member.user.username + " a perdu au roi du silence !");
            }).catch(console.error)
            let myRole = member.guild.roles.find(role => role.name === 'Roi Du Silence');
            member.removeRole(myRole);
        }
    }
});
/*FIN DU ROI DU SILENCE*/


//pour les messages qui commencent par le préfixe
bot.on("messageCreate", (message) => {
    if(message.author.bot) return;
    if(message.guild === null){
        console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a envoyé "' + message + '"' + " en message privé.")
        let replies = ["J'ai déjà un petit copain...","俺 は エミリア が 好き だ...","Je ne répond pas aux messages privés.","Désolée, je préfère qu'on reste amis...","Mais oui c'est clair !","Sorry, next.","Je ne peux pas te parler, j'ai aqualicorne. C'est comme de l'aqua poney, mais avec des licornes."];
        res = Math.floor((Math.random() * replies.length));
        return message.channel.send(replies[res]);
    }
    res = Math.floor(Math.random() * 10000) + 1;
    if(res == 1 || res == 12 || res == 42 || res == 69 || res == 420 || res == 666 || res == 1000){
        message.author.createDM().then(function(channel){
            channel.send("J'ai perdu...");
        }).catch(console.error)
        console.log("\n"+Date() + " " + message.author.username + "#" + message.author.discriminator + "    " + res+"\n");
    }
    let mes = message.content.toUpperCase();
    let prefixes = JSON.parse(fs.readFileSync("./json/prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    //pour les messages qui commencent sans le préfixe
    /*Vérification que les messages qui sont des citations sont du bon type*/
    if(message.channel.id==627587389346283526){
        let roleName = "PuniDeCitation";
        role = message.member.guild.roles.find('name', roleName);
        if ((message.member.roles.some(role => role.name === roleName))) {
            message.author.send(`Tu as été puni de citations.`);
            message.delete();
            return console.log("puni de citation.");
        }
        var citation = new RegExp(/"[\w|\W]+" - [\w|\W]+, \d+/);
        if(!citation.test(message.content)) {
            message.author.send("Votre message est : " + message.content);
            message.delete();
            return message.author.send('Il est incorrect, vous devez suivre la syntaxe `"message" - Auteur, Année`');
        }
    }
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
        message.author.send(res = Math.floor(Math.random() * 449516) + 1);
        console.log(res);
        message.delete();
        break;
        case "69E":
        res = Math.floor(Math.random() * 449516) + 1;
        console.log(res);
        message.author.send("https://nhentai.net/g/" + res + "/");
        message.delete();
        break;
        case "FUCKGOBACK":
        message.channel.bulkDelete(2);
        break;
        case "RASEDRO":
            message.reply(new Date().getTime() - message.createdTimestamp + " ms -- Inspecteur Badget !");
        break;
        case "LOL SOPALIN":
        message.channel.send("BOTTOM TEXT");
        break;
        case "NO W":
        let bUser = message.author;
        let banEmbed = new Discord.RichEmbed()
        .setDescription("Bannissement")
        .setColor("#000000")
        .addField("Utilisateur banni", `${bUser} avec l'ID : ${bUser.id}`)
        .addField("Banni par", `${message.author} avec l'ID : ${message.author.id}`)
        .addField("Dans le channel", message.channel)
        .addField("A", message.createdAt)
        .addField("Pour", "A utilisé trop de puissance par rapport à ce qu'il pouvait...");
        let banchannel = message.guild.channels.find(`name`, "rapports");
        if(!banchannel) return message.channel.send("le salon des rapports n'a pas été trouvé.");
        message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
        banchannel.send(banEmbed);
        message.guild.member(bUser).ban({days:0,reason:"Tu as utilisé trop de puissance par rapport à ce que tu pouvais..."});
        message.channel.send(message.author + "était trop puissant, il a fallu que je m'en débarasse...");
        break;
        default:break;
    }

    /*if(mes.includes("U") && message.author.id ==233191261417373696){
        message.author.createDM().then(function(channel){
            channel.send(message.content.split("u").join("`u`").split("U").join("`U`"));
        }).catch(console.error)
        message.channel.send("Ah ah, t'es n`u`l Alexis");
        message.delete();
    }*/

    if(mes.startsWith('DEJA VU') || mes.startsWith('DÉJÀ VU') || mes.startsWith('DEJÀ VU') || mes.startsWith('DÉJA VU')) {
        message.channel.send("I've just been to this place before")
    };

    //John Steewart
    if (mes.startsWith('AND') && message.channel.guild.id==311112661108785153) {
        //let emoji = message.guild.emojis.find('name', "johnsteewart");
        //message.react(emoji);
        message.channel.send({
            content:"'his name is JOHN STEEWART !!!!!'",
            files: ["./images/JohnS.jpg"] 
        });
    };

    //test des préfixes
    if(!message.content.startsWith(prefix) && !message.content.toLowerCase().startsWith("samantha. ")) return;
    console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a utilisé la commande "' + message.content + '"\n');
    if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply("Veuillez attendre 5 secondes entre les commandes.").then(msg => {
            msg.delete({ timeout: 10000 })
          })
          .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    }

    let messageArray = message.content.split(" ");
    let cmd;
    let args;
    let commandfile;
    if(message.content.toLowerCase().startsWith("samantha. ")){
        cmd = messageArray[1];
        args = messageArray.slice(2);
        commandfile = bot.commands.get(cmd);
    }else{
        cmd = messageArray[0];
        args = messageArray.slice(1);
        commandfile = bot.commands.get(cmd.slice(prefix.length));
    }
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
