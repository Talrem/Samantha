const botconfig = require('./json/botconfig.json');
const tokenfile = require('./0-jsons/token.json');
const cheminfile = require('./0-jsons/chemin.json');
const Discord = require('discord.js');
const can = require("./json/canPlay.json");
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
    bot.user.setActivity("Samantha. help", {type: "WATCHING"})
    .then(() => console.log('Activité mise en place avec succès\n'))
    .catch(console.error)
});

//acceuil
bot.on('guildMemberAdd', function(member){
    var role = member.bot ? member.guild.roles.find('name', 'Bots') :member.guild.roles.find('name', 'Connecté');
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
        message.author.send(res = Math.floor(Math.random() * 288856) + 1);
        message.delete();
        break;
        case "69E":
        res = Math.floor(Math.random() * 288856) + 1;
        message.author.send("https://nhentai.net/g/" + res + "/");
        message.delete();
        break;
        case "FUCKGOBACK":
        message.channel.bulkDelete(2);
        break;
        case "LOL SOPALIN":
        message.channel.send("BOTTOM TEXT");
        break;
        default:break;
    }
    if(mes.startsWith('DEJA VU') || mes.startsWith('DÉJÀ VU') || mes.startsWith('DEJÀ VU') || mes.startsWith('DÉJA VU')) {
        message.channel.send("I've just been to this place before")
    };

    //John Steewart
    if (mes.startsWith('AND') && message.channel.guild.id==311112661108785153) {
        let emoji = message.guild.emojis.find('name', "johnsteewart");
        message.react(emoji);
        message.channel.send('his name is JOHN STEEWART !!!!!')
        message.channel.send("", {
            file : "./images/JohnS.jpg"
        });
    };

    //test des préfixes
    if(!message.content.startsWith(prefix) && !message.content.toLowerCase().startsWith("samantha. ")) return;
    console.log(Date() + " " + message.author.username + "#" + message.author.discriminator + ' a utilisé la commande "' + message + '"\n');
    if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply("Veuillez attendre 5 secondes entre les commandes.").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
        cooldown.add(message.author.id);
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
