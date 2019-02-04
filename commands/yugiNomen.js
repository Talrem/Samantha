const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {
  if(message.channel.guild.id!=508380503473258516)return message.channel.send("Vous ne pouvez pas utiliser cette commande sur ce serveur");
  let yugiNomenclatureEmbed = new Discord.RichEmbed()
  .setTitle("Nomeclature pour les decks selon Talrem")
  .setColor("#fff000")
  .addField("charactère 1", "'0' si le deck n'est pas viable, '1' s'il l'est.")
  .addField("charactère 2", "'a' si le deck est un archétype, 'f' si le deck est fun, 't' si le deck est basé sur un type de monstre")
  .addField("charactère 3", "'-a' si le deck peut être joué en advanced, '-t' s'il doit être joué en traditionnal, '-u' sinon")
  .addField("charactère 4", "' -e ' si le deck est expérimental (optionnel)")
  .addField("charactère 5", "le type du deck s'il en a un, ou son archétype, ou les gimmicks du fun, dépend du charactère 2")
  .addField("charactère 6", "si le deck est un deck typé, donner son archétype s'il y en a un (optionnel)");
  message.channel.send(yugiNomenclatureEmbed);
  setTimeout(function(){
    message.channel.send("En Advanced, on respecte strictement la ban list.\nEn Traditionnal, on considère les cartes bannies comme limitées mais on respecte le reste de la ban list.\nEn unlimited, osef de la ban list. triple pot of greed si tu veux. Y'a pas problème.\n\nUn type est par exemple spellcaster, un archétype de spellcaster est par exemple Dark Magician. un deck fun est par exemple un deck avec uniquement des cartes basées sur la chance, ça ne s'inscrit ni dans un type, ni dans un archétype.\nPar exemple : 1a-t Pendulum est\nun deck viable, basé sur l'archétype pendulum, jouable en traditionnal.\nLà où 0f-a finalcountdown est\nUn deck non viable mais fun, jouable en advanced et basé sur Final countdown.\nfinalement, 0t-t -e rock Exxod est\nUn deck non viable, expérimental de type rocher, jouable en traditionnal et basé sur Exxod.")
  }, ms(1000));
  return;
}

module.exports.help = {
  name: "yugiNomen",
  type: "yugi",
  usage: "yugiNomen",
  desc: "Samantha donne la façon de nomer les decks de Talrem pour la comprendre si on en reçoit."
}
