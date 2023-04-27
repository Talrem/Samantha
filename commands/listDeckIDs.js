const Discord = require("discord.js");
const fs = require("fs");
const sefile = require("../json/decks.json");

function isIn(tab, argument) {
    var i;
    for(i = 0 ; i < tab.length;i++){
        if(argument.toLowerCase() == tab[i].toLowerCase()) return 1;
    }
    return 0;
}

module.exports.run = async (bot, message, args) => {
    let roleName = "Dueliste";
    role = message.member.guild.roles.cache.find(role => role.name === roleName);
    if (!(message.member.roles.cache.has(role.id))) {
        return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
    }
    let taille = sefile[-1].number;
    var playerNames = new Array();
    var playerIDs = new Array();
    var nbPlayers = 0;
    let nbDecks = 0;
    for(i = 0; i < taille; i++){
        if(!isIn(playerIDs,sefile[i].id)){
            playerIDs[nbPlayers] = sefile[i].id;
            playerNames[nbPlayers] = sefile[i].u;
            nbPlayers += 1;
        }
    }
    var trouve = 0;
    let idJoueur = 0;
    if(args.length){
        if(args[0].toLowerCase() != "all" && !isIn( playerNames, args[0].toLowerCase() ) ){
            if(args[0].includes("<") && args[0].includes(">") && args[0].includes("@")){
                idJoueur = message.mentions.users.first().id;
            }
        }else{
            for(j = 0; j < nbPlayers; j++){
                if(args[0].toLowerCase() == playerNames[j].toLowerCase()){
                    idJoueur = playerIDs[j];
                    trouve = 1;
                }
            }
            if(!trouve){
                idJoueur = message.author.id;
            }
        }
    }else{
        idJoueur = message.author.id;
    }

    var i = 0;

    var decksToSend = new Array();

    for(i = 0; i < taille; i++){
        if(args[0] && args[0].toLowerCase() == "all"){
            decksToSend[nbDecks] = "ID : " + i + " - `" + sefile[i].n + "` de " + sefile[i].u;
            nbDecks++;
        }else{
            if(sefile[i].id == idJoueur){
                decksToSend[nbDecks] = "ID : " + i + " - `" + sefile[i].n + "`";
                nbDecks++;
            }
        }
    }

    if(!nbDecks){
        return message.reply("La cible ne possède aucun deck.");
    }
    mTSB = "Nombre total de decks de la cible : " + nbDecks + "\n";
    for(i = 0; i < decksToSend.length ;i++){
        mTSB += decksToSend[i] +"\n";
        if(i != 0 && i%16 == 0){
            message.author.send(mTSB);
            mTSB = "";
        }
    }
    if(mTSB != "") message.author.send(mTSB);
}

module.exports.help = {
    name: "listDeckIDs",
    type: "YuGiOh", //social fun Private ou admin
    usage: "listDeckIDs <utilisateur>",
    desc: "j'envoit la liste des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
