const Discord = require("discord.js")
const fs = require("fs");
const takenFile = require("../json/hisoutensoku.json");

module.exports.run = async (bot, message, args) => {
    var lesPersos = lesPersos = ["Alice Margatroid","Aya Shameimaru","Iku Nagae","Komachi Onozuka","Marisa Kirisame","Patchouli Knowledge","Reimu Hakurei","Reisen Udonge Inaba","Remilia Scarlet","Sakuya Izayoi","Suika Ibuki","Tenshi Hinanawi","Youmu Konpaku","Yukari Yakumo","Yuyuko Saigyouji","Cirno","Hong Meiling","Sanae Kochiya","Suwako Moriya","Utsuho Reiuji"];
    let nuzzlock = false;
    if(args.length){
        if(args[0] != "reset"){
            nuzzlock = true;
            console.log("On joue donc en nuzzlock");
        }else{
            for(var i = 0; i < takenFile.takenChamps.length; i++){
                takenFile.takenChamps[i] = "available";
            }
            fs.writeFile("./json/hisoutensoku.json", JSON.stringify(takenFile), (err) =>{
                if(err) console.log(err);
            })
            return message.reply("C'est fait.");
        }
    }
    var some1Left = false;
    var randomNumber = Math.floor(Math.random() * lesPersos.length);
    if(nuzzlock){
        console.log("Le nuzzlock");
        for(var i = 1; i < takenFile.takenChamps.length && some1Left == false; i++){
            some1Left = takenFile.takenChamps[i]=="available";
        }
        if(!some1Left){
            message.channel.send("Tous ont déjà été joués, on reset.");
            for(var i = 0; i < takenFile.takenChamps.length; i++){
                takenFile.takenChamps[i] = "available";
            }
        }
        while(takenFile.takenChamps[randomNumber]!="available"){
            randomNumber = Math.floor(Math.random() * lesPersos.length);
        }
        takenFile.takenChamps[randomNumber] = "nono";
    }
    message.channel.send("Utilisez "+lesPersos[randomNumber]);
    if(nuzzlock){
        fs.writeFile("./json/hisoutensoku.json", JSON.stringify(takenFile), (err) =>{
            if(err) console.log(err);
        })
    }
}

module.exports.help = {
    name: "12.3",
    type: "Private",
    usage: "12.3 <nuzzlock>",
    desc: "je donne les personnages à utiliser, si on veut des personnages différents à chaque fois, on précise un argument."
}
