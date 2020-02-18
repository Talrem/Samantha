const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let taille = args[0];
  let poids = args[1];
  if(args.length < 2) return message.reply("Veuillez fournir une taille et un poids.").then(msg => msg.delete(60000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(taille == 0 || poids == 0) return message.reply("Veuillez fournir un poids et une taille non-nuls.").then(msg => msg.delete(60000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  taille /= 100;
  let imc = poids / (taille * taille);
  let answer = "Votre IMC est de " + Math.round(imc*100)/100 + ". ";
  if(imc < 16) answer += "Vous devriez vraiment essayer de mieux vous nourrir... Je m'inquiète pour vous. L'anorexie c'est pas la folie..."
  if(imc >= 16 && imc < 18.5) answer += "Vous devriez essayer de mieux vous nourrir... Je m'inquiète pour vous. La maigreur ça fait pas fureur..."
  if(imc >= 18.5 && imc < 25) answer += "Vous avez une corpulence normale, et ça, c'est de la balle!"
  if(imc >= 25 && imc < 30) answer += "Peut-être devriez-vous limiter votre consommation de nourriture non-équilibrée, le surpoid c'est un mauvais choix."
  if(imc >= 30 && imc < 35) answer += "Vous devriez essayer de mieux vous nourrir, en limitant la consommation de matière grasse, sucrée, salée... L'obésité modérée c'est pas très stylé..."
  if(imc >= 35 && imc < 40) answer += "Vous devriez essayer de remédier à ça en revoyant fortement votre mode de vie. L'obésité élevée vous met en danger..."
  if(imc >= 40) answer += "Vraiment là, je m'inquiète pour vous, vous devriez changer totalement votre mode de vie, c'est urgent. Une obésité morbide, c'est loin d'être splendide..."
  return message.channel.send(answer).then(msg => msg.delete(60000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "imc",
  type: "social",
  usage: "imc <taille> <poids>",
  desc: "je vous donne l'IMC correspondant aux données. La <taille> doit être fournie en cm, et le <poids> en kg"
}
