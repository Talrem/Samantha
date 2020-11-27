const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!args.length) return message.channel.send("Veuillez préciser la difficulté (random, leader, mini-boss, boss ou boss-épique)");
    if(args.length < 2) return message.channel.send("Veuillez donner combien d'items ont été drops.");
    let difficulte_string = args[0];
    let difficulte = 0;
    let nb_loots = args[1];
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
    let commun = 0;
    let rare = 0;
    let epique = 0;
    let legendaire = 0;
    let maudit = 0;
    for(i = 0; i < nb_loots; i++){
        let a = Math.floor(Math.random() * 100) + 1;
        switch (difficulte) {
            case 1:
                if(a >= 36){
                    commun += 1;
                }else if(a > 8){
                    rare += 1;
                }else{
                    epique += 1;
                }
            break;
            case 2:
                if(a >= 58){
                    commun += 1;
                }else if(a > 16){
                    rare += 1;
                }else{
                    epique += 1;
                }
            break;
            case 3:
                if(a >= 58){
                    commun += 1;
                }else if(a > 16){
                    rare += 1;
                }else if(a > 2){
                    epique += 1;
                }else if(a == 2){
                    legendaire += 1;
                }else{
                    maudit += 1;
                }
            break;
            case 4:
                if(a >= 41){
                    rare += 1;
                }else if(a > 11){
                    epique += 1;
                }else if(a > 5){
                    legendaire += 1;
                }else{
                    maudit += 1;
                }
            break;
            case 5:
                if(a >= 32){
                    epique += 1;
                }else if(a > 16){
                    legendaire += 1;
                }else{
                    maudit += 1;
                }
            break;
            default:
        }
    }
    let messageToSend = "Le monstre a drop :\n";
    if(commun) messageToSend += commun + " Objets communs\n";
    if(rare) messageToSend += rare + " Objets rares\n";
    if(epique) messageToSend += epique + " Objets épiques\n";
    if(legendaire) messageToSend += legendaire + " Objets légendaires\n";
    if(maudit) messageToSend += maudit + " Objets maudits";
  return message.channel.send(messageToSend);
}

module.exports.help = {
  name: "rareLoots",
  type: "Private",
  usage: "rareLoots <Difficulte> <Nb_loots>",
  desc: "je donne la rareté des loots."
}
