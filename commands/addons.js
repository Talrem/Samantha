const Discord = require("discord.js")
const fs = require("fs");
let sefile = JSON.parse(fs.readFileSync("./addons.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  let baselink = "https://steamcommunity.com/sharedfiles/filedetails/?id=";
  let taille = sefile[-1].number;
  let message1ToSend = "";
  let message2ToSend = "";
  let message3ToSend = "";
  let skin1ToSend = "";
  let skin2ToSend = "";
  let skin3ToSend = "";
  let armeToSend = "";
  let armeStoSend = "";
  let effetToSend = "";
  let modToSend = "";
  let textureToSend = "";
  let types = ["skin","arme","armeSpe","effet","mode","texture"];
  let i;
  for(i = 0; i < taille ; i++){
    if(args[0]){
      if(sefile[i].type == args[0]){
        if(args[0] != "texture"){
          if(message1ToSend.length < 1700){
            message1ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
          }else if(message2ToSend.length < 1700){
            message2ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
          }else if(message3ToSend.length < 1700){
            message3ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
          }
        }else{
          message1ToSend += sefile[i].name + " : " + sefile[i].url + "\n";
        }
      }
    }else{
      if(sefile[i].type == types[0]){
        if(skin1ToSend.length < 1700){
          skin1ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
        }else if(skin2ToSend.length < 1700){
          skin2ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
        }else if(skin3ToSend.length < 1700){
          skin3ToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
        }
      }else if(sefile[i].type == types[1]){
        armeToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
      }else if(sefile[i].type == types[2]){
        armeStoSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
      }else if(sefile[i].type == types[3]){
        effetToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
      }else if(sefile[i].type == types[4]){
        modToSend += sefile[i].name + " : " + baselink + sefile[i].url + "\n";
      }else if(sefile[i].type == types[5]){
        textureToSend += sefile[i].name + " : " + sefile[i].url + "\n";
      }
    }
  }
  if(args[0]){
    if(message1ToSend.length)
      message.channel.send(message1ToSend);
    if(message2ToSend.length)
      message.channel.send(message2ToSend);
    if(message3ToSend.length)
      message.channel.send(message3ToSend);
  }else{
    if(skin1ToSend.length)
    message.channel.send("`Skin :`\n" + skin1ToSend);
    if(skin2ToSend.length)
      message.channel.send(skin2ToSend);
    if(skin3ToSend.length)
      message.channel.send(skin3ToSend);
    if(armeToSend.length)
      message.channel.send("`Arme :`\n" + armeToSend);
    if(armeStoSend.length)
      message.channel.send("`Arme Spéciale :`\n" + armeStoSend);
    if(effetToSend.length)
      message.channel.send("`Effet :`\n" + effetToSend);
    if(modToSend.length)
      message.channel.send("`Mode :`\n" + modToSend);
    if(textureToSend.length)
      return message.channel.send("`Textures :`\n" + textureToSend);
  }
  if(!message1ToSend.length)
    return message.channel.send("Le type que vous avez précisé n'est pas valide. Veuillez préciser un type valide. (utilisez la commande `help addons` pour obtenir les types valides).")
}

module.exports.help = {
  name: "addons",
  type: "fun",
  usage: "addons <type>",
  desc: "j'envois les liens des addons d'un type donné ou tout les addons si aucun type n'est précisé. Les types possibles sont : `skin`, `arme`, `armeSpe`, `effet`, `mode` et `texture`."
}
