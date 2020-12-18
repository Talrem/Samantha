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

function whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, argument){
    if(isIn(lesTiers, argument)) return "t";
    if(isIn(lesProvenances, argument)) return "p";
    if(isIn(lesConcepts, argument)) return "c";
    if(isIn(lesWinCons, argument)) return "w";
    if(isIn(lesNoms, argument)) return "n";
    if(isIn(lesCreateurs, argument)) return "u";
    return "";
}

module.exports.run = async (bot, message, args) => {
    let roleName = "Dueliste";
    role = message.member.guild.roles.find('name', roleName);
    if (!(message.member.roles.some(role => role.name === roleName))) {
        return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
    }
    if(args.length >= 6 && args.length <= 0) return message.reply("La liste des arguments est invalide, vous devez préciser si vous souhaitez <Nom> <Créateur> <Provenance> <Concept> <WinCon> <Tier> dans l'ordre que vous voulez.");
    let taille = sefile[-1].number;
    var i = 0;
    var j = 0;
    var k = 0;
    var uOk = 1;
    var nOk = 1;
    var tOk = 1;
    var pOk = 1;
    var cOk = 1;
    var wOk = 1;
    var argument0 = "";
    var argument1 = "";
    var argument2 = "";
    var argument3 = "";
    var argument4 = "";
    var argument5 = "";
    var lesDeck = new Array();
    var lesDeckID = new Array();
    var lesProvenances = new Array();
    var lesConcepts = new Array();
    var lesWinCons = new Array();
    var lesTiers = new Array();
    var lesCreateurs = new Array();
    var lesNoms = new Array();
    /*Récupération de toutes les variables de tout les decks de l'utilisateur*/
    for(i = 0; i < taille; i++){
        lesProvenances[k] = sefile[i].p;
        lesConcepts[k] = sefile[i].c;
        lesWinCons[k] = sefile[i].w;
        lesTiers[k] = sefile[i].t;
        lesNoms[k] = sefile[i].n
        lesCreateurs[k] = sefile[i].u
        k++;
    }

    /*Choix du deck*/
    for(i = 0; i < taille; i++){
        if(!args.length){
            lesDeck[j] = sefile[i];
            j++;
        }else{
            if(args[0]) argument0 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[0]);
            if(args[1]) argument1 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[1]);
            if(args[2]) argument2 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[2]);
            if(args[3]) argument3 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[3]);
            if(args[4]) argument4 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[4]);
            if(args[5]) argument5 = whatTab(lesTiers, lesProvenances, lesConcepts, lesWinCons, lesNoms, lesCreateurs, args[5]);
            tOk = 1;
            pOk = 1;
            cOk = 1;
            wOk = 1;
            uOk = 1;
            nOk = 1;
            if(argument0 != "" || argument1 != "" || argument2 != "" || argument3 != "" || argument4 != "" || argument5 != ""){
                switch (argument0) {
                    case "t":
                    if(args[0].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[0].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[0].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[0].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[0].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[0].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                switch (argument1) {
                    case "t":
                    if(args[1].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[1].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[1].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[1].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[1].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[1].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                switch (argument2) {
                    case "t":
                    if(args[2].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[2].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[2].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[2].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[2].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[2].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                switch (argument3) {
                    case "t":
                    if(args[3].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[3].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[3].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[3].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[3].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[3].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                switch (argument4) {
                    case "t":
                    if(args[4].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[4].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[4].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[4].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[4].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[4].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                switch (argument5) {
                    case "t":
                    if(args[5].toLowerCase() != sefile[i].t.toLowerCase()) tOk = 0;
                    break;
                    case "p":
                    if(args[5].toLowerCase() != sefile[i].p.toLowerCase()) pOk = 0;
                    break;
                    case "c":
                    if(args[5].toLowerCase() != sefile[i].c.toLowerCase()) cOk = 0;
                    break;
                    case "w":
                    if(args[5].toLowerCase() != sefile[i].w.toLowerCase()) wOk = 0;
                    break;
                    case "n":
                    if(args[5].toLowerCase() != sefile[i].n.toLowerCase()) wOk = 0;
                    break;
                    case "u":
                    if(args[5].toLowerCase() != sefile[i].u.toLowerCase()) wOk = 0;
                    break;
                    default:break;
                }
                if(tOk && pOk && cOk && wOk && nOk && uOk){
                    lesDeckID[j] = i;
                    lesDeck[j] = sefile[i];
                    j++;
                }
            }
        }
    }
    if(j == 0) return message.reply("Aucun deck ne correspond aux arguments fournis...");
    let messageToSend = "";
    for(let k = 0; k < lesDeck.length; k++){
        if(args.length){
            messageToSend+= lesDeckID[k]+" `"+lesDeck[k].n + "` (`"+lesDeck[k].t+"`) de `" + lesDeck[k].u+"`\n";
        }else{
            messageToSend+= k+" `"+lesDeck[k].n + "` (`"+lesDeck[k].t+"`) de `" + lesDeck[k].u+"`\n";
        }
        if(k%15==0 && k != 0){
            message.channel.send(messageToSend);
            messageToSend = "";
        }
    }
    if(messageToSend!=""){
        message.channel.send(messageToSend);
    }
}

module.exports.help = {
    name: "listDeckByTag",
    type: "YuGiOh", //social fun Private ou admin
    usage: "listDeckByTag <Tag> <...> <...> <...> <...> <...>",
    desc: "je donne le nom des decks qui correspondent aux arguments donnés. Les tiers valables sont `Ban`, `VeryHigh`, `High`, `Mid`, `Low`, `VeryLow` et `Untiered`."
}
