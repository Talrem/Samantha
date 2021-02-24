const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var result = "";
    var types = new Array("arme","bijou","armure","poignet");
    var typesA = new Array("Percant","Critique","Cruel","Sanguin");
    var typesS = new Array("maille","toile");
    var typesP = new Array("Energetique","Vital");
    var typesB = new Array("Percant","Deg C.","Taux C.","Vol vital","Energetique","Vital","Deviant");
    if(args.length != 0){
        switch(args[0].toLowerCase()){
            case "arme":
                result += "Arme " + typesA[Math.floor(Math.random() * typesA.length)];
            break;
            case "bijou":
                result += "Bijou " + typesB[Math.floor(Math.random() * typesB.length)];
            break;
            case "armure":
                result += "Armure " + typesS[Math.floor(Math.random() * typesS.length)];
            break;
            case "poignet":
                result += "Poignet " + typesP[Math.floor(Math.random() * typesP.length)];
            break;
            default:
                return console.log("Erreur : Type d'équipement invalide");
            break;
        }
    }else{
        switch(types[Math.floor(Math.random() * types.length)]){
            case "arme":
                result += "Arme " + typesA[Math.floor(Math.random() * typesA.length)];
            break;
            case "bijou":
                result += "Bijou " + typesB[Math.floor(Math.random() * typesB.length)];
            break;
            case "armure":
                result += "Armure " + typesS[Math.floor(Math.random() * typesS.length)];
            break;
            case "poignet":
                result += "Poignet " + typesP[Math.floor(Math.random() * typesP.length)];
            break;
            default:
                return console.log("Erreur : Type d'équipement invalide");
            break;
        }
    }
    message.author.send(result);
    return message.delete();
}

module.exports.help = {
  name: "whatLoot",
  type: "Private",
  usage: "whatLoot",
  desc: "je choisirai pour vous."
}
