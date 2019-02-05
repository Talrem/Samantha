const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let rep = "Votre résultat est : ";
  var i = 0;
  var total = 0;
  var results ="";
  let res = 0;
  let nbUn = 0;
  let nbDesLances = 0;
  let argsArray = message.content.split(" ");
  if(message.content.includes("d")){
    let dices = argsArray[1];
    let diceArray = dices.split("d");
    let nbDes = parseInt(diceArray[0]);
    let nbFaces = diceArray[1];
    if(nbDes < 1 || isNaN(nbDes)){
      return message.reply("Veuillez lancer au moins un dé.");
    }
    if(nbFaces < 2 || isNaN(nbFaces)){
      return message.reply("Veuillez avoir un dé à au moins 2 faces.");
    }
    res = Math.floor(Math.random() * nbFaces) + 1;
    nbDesLances++;
    total += res;
    if(res == 1){
      nbUn++;
    }
    if(res == 1 || (res == 100 && nbFaces == 100)){
      results += " `" + res.toString() + "`";
    }else{
      results += " " + res.toString();
    }
    for (i = 1; i < nbDes ; i++) {
      res = Math.floor(Math.random() * nbFaces) + 1;
      nbDesLances++;
      total += res;
      if(res == 1){
        nbUn++;
      }
      if(res == 1 || (res == 100 && nbFaces == 100)){
        results += " `" + res.toString() + "`";
      }else{
        results += " " + res.toString();
      }
    }
  }else{
    res = Math.floor(Math.random() * args[0]) + 1;
    nbDesLances++;
    total += res;
    if(res == 1){
      nbUn++;
    }
    if(res == 1 || (res == 100 && args[0] == 100)){
      results += " `" + res.toString() + "`";
    }else{
      results += " " + res.toString();
    }
    for (i = 1; args[i] ; i++) {
      res = Math.floor(Math.random() * args[i]) + 1;
      nbDesLances++;
      total += res;
      if(res == 1){
        nbUn++;
      }
      if(res == 1 || (res == 100 && args[0] == 100)){
        results += " `" + res.toString() + "`";
      }else{
        results += " " + res.toString();
      }
    }
  }
  rep += total + " (";
  let moyenne = total / nbDesLances
  rep += results + " )." + "\nAvec un total de " + nbUn + " fois le chiffre 1." + "\nLa moyenne est de : " + moyenne;
  return message.channel.send(rep);
}

module.exports.help = {
  name: "roll",
  type: "fun",
  usage: "roll <nombre1>...<nombreN> OU roll <nombreDeDés X>d<nombreDeFaces Y>",
  desc: "je lance des des de taille N précisées OU X dés de taille Y."
}
