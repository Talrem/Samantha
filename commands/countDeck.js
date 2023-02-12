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
    role = message.member.guild.roles.find('name', roleName);
    if (!(message.member.roles.some(role => role.name === roleName))) {
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

    var jB = 0;

    var jVH = 0;

    var jH = 0;

    var jM = 0;

    var jL = 0;

    var jVL = 0;

    var jU = 0;

    for(i = 0; i < taille; i++){
        if(args[0] && args[0].toLowerCase() == "all"){
            nbDecks++;
            switch(sefile[i].t){
                case "Ban":
                    jB++;
                break;
                case "VeryHigh":
                    jVH++;
                break;
                case "High":
                    jH++;
                break;
                case "Mid":
                    jM++;
                break;
                case "Low":
                    jL++;
                break;
                case "VeryLow":
                    jVL++;
                break;
                case "Untiered":
                    jU++;
                break;
                default: return message.reply("Une erreur est survenue... arrêt de la commande.");
            }
        }else{
            if(sefile[i].id == idJoueur){
                nbDecks++;
                switch(sefile[i].t){
                    case "Ban":
                    jB++;
                    break;
                    case "VeryHigh":
                        jVH++;
                    break;
                    case "High":
                        jH++;
                    break;
                    case "Mid":
                        jM++;
                    break;
                    case "Low":
                        jL++;
                    break;
                    case "VeryLow":
                        jVL++;
                    break;
                    case "Untiered":
                        jU++;
                    break;
                    default: return message.reply("Une erreur est survenue... arrêt de la commande.");
                }
            }
        }
    }

    if(!jB && !jVH && !jH && !jM && !jL && !jVL){
        return message.reply("La cible ne possède aucun deck.");
    }
        messToSend = "Nombre total de decks de la cible : " + nbDecks + "\n";
        /*Là on fait la fusion des messages*/
    if(jB != 0){
        messToSend += "`Ban` au nombre de " + jB+"\n";
    }

    if(jVH != 0){
        messToSend += "`Very High` au nombre de " + jVH + "\n";
    }

    if(jH != 0){
        messToSend += "`High` au nombre de " + jH + "\n";
    }

    if(jM != 0){
        messToSend += "`Mid` au nombre de " + jM + "\n";
    }

    if(jL != 0){
        messToSend += "`Low` au nombre de " + jL + "\n";
    }

    if(jVL != 0){
        messToSend += "`Very Low` au nombre de " + jVL + "\n";
    }

    if(jU != 0){
        messToSend += "`Untiered` au nombre de " + jU + "\n";
    }
    return message.author.send(messToSend);
}

module.exports.help = {
    name: "countDeck",
    type: "YuGiOh", //social fun Private ou admin
    usage: "countDeck <utilisateur>",
    desc: "j'envoit le nombre des decks de l'utilisateur voulu. Si aucun utilisateur n'est précisé, vous serez la cible de la commande."
}
