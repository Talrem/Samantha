const Discord = require("discord.js")
const fs = require("fs");
let sefile = JSON.parse(fs.readFileSync("./addons.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  let baselink = "https://steamcommunity.com/sharedfiles/filedetails/?id=";
  let taille = sefile[-1].number;
  let skinToSend = "";
  let armeToSend = "";
  let armeSpeToSend = "";
  let effetToSend = "";
  let modeToSend = "";
  let textureToSend = "";
  let types = ["skin","arme","armeSpe","effet","mode","texture"];
  let trouve = 0;
  let i,j;
  let msg;
  let compteur = 0;
  if(args){
    for(i = 0; i < types.length; i++){
      if(args[0].toLowerCase()==types[i]) trouve = 1;
    }
    if(!trouve) return message.channel.send("Le type que vous avez précisé n'est pas valide. Veuillez préciser un type valide. (utilisez la commande `help addons` pour obtenir les types valides).")
    message.channel.send("\n`" + args[0].toLowerCase() + "` :");
    skinToSend = "";
    armeToSend = "";
    armeSpeToSend = "";
    effetToSend = "";
    modeToSend = "";
    textureToSend = "";
    for(i = 0; i < taille ; i++){
      msg = "";
      msg += sefile[i].name + " - " + baselink + sefile[i].url + "\n";
      switch (args[0].toLowerCase()) {
        case "skin":
          if(sefile[i].type == "skin"){
            skinToSend += msg;
            compteur++;
          }
          if(compteur==7){
            if(skinToSend.length) message.channel.send(skinToSend);
            skinToSend = "";
            compteur = 0;
          }
          break;
        case "arme":
          if(sefile[i].type == "arme"){
            armeToSend += msg;
            compteur++;
          }
          if(compteur==7){
            if(armeToSend.length) message.channel.send(armeToSend);
            armeToSend = "";
            compteur = 0;
          }
          break;
        case "armeSpe":
          if(sefile[i].type == "armeSpe"){
            armeSpeToSend += msg;
            compteur++;
          }
          if(compteur==7){
            if(armeSpeToSend.length) message.channel.send(armeSpeToSend);
            armeSpeToSend = "";
            compteur = 0;
          }
          break;
        case "effet":
          if(sefile[i].type == "effet"){
            effetToSend += msg;
            compteur++;
          }
          if(compteur==7){
            if(effetToSend.length) message.channel.send(effetToSend);
            effetToSend = "";
            compteur = 0;
          }
          break;
        case "mode":
          if(sefile[i].type == "mode"){
            modeToSend += msg;
            compteur++;
          }
          if(compteur==7){
            if(modeToSend.length) message.channel.send(modeToSend);
            modeToSend = "";
            compteur = 0;
          }
          break;
        case "texture":
          if(sefile[i].type == "texture"){
            textureToSend += sefile[i].name + " - " + sefile[i].url + "\n";
            compteur++;
          }
          if(!compteur==7){
            if(textureToSend.length) message.channel.send(textureToSend);
            textureToSend = "";
            compteur = 0;
          }
          break;
      }
    }
    if(skinToSend.length) message.channel.send(skinToSend);
    skinToSend = "";
    if(armeToSend.length) message.channel.send(armeToSend);
    armeToSend = "";
    if(armeSpeToSend.length) message.channel.send(armeSpeToSend);
    armeSpeToSend = "";
    if(effetToSend.length) message.channel.send(effetToSend);
    effetToSend = "";
    if(modeToSend.length) message.channel.send(modeToSend);
    modeToSend = "";
    if(textureToSend.length) message.channel.send(textureToSend);
    textureToSend = "";
  }else{
    for(j = 0; j < types.length; j++){
      message.channel.send("\n`" + types[j] + "` :");
      skinToSend = "";
      armeToSend = "";
      armeSpeToSend = "";
      effetToSend = "";
      modeToSend = "";
      textureToSend = "";
      for(i = 0; i < taille ; i++){
        msg = "";
        msg += sefile[i].name + " - " + baselink + sefile[i].url + "\n";
        switch (types[j]) {
          case "skin":
            if(sefile[i].type == "skin"){
              skinToSend += msg;
              compteur++;
            }
            if(compteur==7){
              if(skinToSend.length) message.channel.send(skinToSend);
              skinToSend = "";
              compteur = 0;
            }
            break;
          case "arme":
            if(sefile[i].type == "arme"){
              armeToSend += msg;
              compteur++;
            }
            if(compteur==7){
              if(armeToSend.length) message.channel.send(armeToSend);
              armeToSend = "";
              compteur = 0;
            }
            break;
          case "armeSpe":
            if(sefile[i].type == "armeSpe"){
              armeSpeToSend += msg;
              compteur++;
            }
            if(compteur==7){
              if(armeSpeToSend.length) message.channel.send(armeSpeToSend);
              armeSpeToSend = "";
              compteur = 0;
            }
            break;
          case "effet":
            if(sefile[i].type == "effet"){
              effetToSend += msg;
              compteur++;
            }
            if(compteur==7){
              if(effetToSend.length) message.channel.send(effetToSend);
              effetToSend = "";
              compteur = 0;
            }
            break;
          case "mode":
            if(sefile[i].type == "mode"){
              modeToSend += msg;
              compteur++;
            }
            if(compteur==7){
              if(modeToSend.length) message.channel.send(modeToSend);
              modeToSend = "";
              compteur = 0;
            }
            break;
          case "texture":
            if(sefile[i].type == "texture"){
              textureToSend += sefile[i].name + " - " + sefile[i].url + "\n";
              compteur++;
            }
            if(!compteur==7){
              if(textureToSend.length) message.channel.send(textureToSend);
              textureToSend = "";
              compteur = 0;
            }
            break;
        }
      }
      if(skinToSend.length) message.channel.send(skinToSend);
      skinToSend = "";
      if(armeToSend.length) message.channel.send(armeToSend);
      armeToSend = "";
      if(armeSpeToSend.length) message.channel.send(armeSpeToSend);
      armeSpeToSend = "";
      if(effetToSend.length) message.channel.send(effetToSend);
      effetToSend = "";
      if(modeToSend.length) message.channel.send(modeToSend);
      modeToSend = "";
      if(textureToSend.length) message.channel.send(textureToSend);
      textureToSend = "";
    }
  }
  return;
}

module.exports.help = {
  name: "addons",
  type: "fun",
  usage: "addons <type>",
  desc: "j'envois les liens des addons d'un type donné ou tout les addons si aucun type n'est précisé. Les types possibles sont : `skin`, `arme`, `armeSpe`, `effet`, `mode` et `texture`."
}
