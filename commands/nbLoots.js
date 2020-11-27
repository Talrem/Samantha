const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!args.length) return message.channel.send("Veuillez préciser la difficulté (random, leader, mini-boss, boss ou boss-épique)");
    let difficulte_string = args[0];
    let difficulte = 0;
    switch(difficulte_string){
        case "random":
            difficulte = 1;
            break;
        case "leader":
            difficulte = 2
            break;
        case "mini-boss":
            difficulte = 3;
            break;
        case "boss":
            difficulte = 4;
            break;
        case "boss-épique":
            difficulte = 5;
            break;
        default:
            return message.channel.send("Difficulté invalide. Veuillez donner une difficulté valide : random, leader, mini-boss, boss ou boss-épique");
        break
    }
    let nb_Loot = 0;
    let a = Math.floor(Math.random() * 100) + 1;
    if(difficulte == 1){
      if(a < 20){
        nb_Loot = 1;
      }else{
        nb_Loot = 0;
      }
    }
    if(difficulte == 2){
      if(a < 40){
        nb_Loot = 1 + Math.floor(Math.random() * 2);
      }else{
        nb_Loot = 1;
      }
    }
    if(difficulte == 3){
      if(a <= 75){
        nb_Loot = 1 + Math.floor(Math.random() * 2);
      }else{
        nb_Loot = 1;
      }
    }
    if(difficulte == 4){
      if(a < 80){
        nb_Loot = 2 + Math.floor(Math.random() * 2);
      }else{
        nb_Loot = 2;
      }
    }
    if(difficulte == 5){
      if(a < 80){
        nb_Loot = 4 + Math.floor(Math.random() * 2);
      }else{
        nb_Loot = 4;
      }
    }
  return message.channel.send("Le monstre a drop " + nb_Loot + " items !");
}

module.exports.help = {
  name: "nbLoots",
  type: "Private",
  usage: "nbLoots <Difficulte>",
  desc: "je donne le nombre de drops d'un monstre."
}
