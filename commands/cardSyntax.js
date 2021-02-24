const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let roleName = "Dueliste";
  role = message.member.guild.roles.find('name', roleName);
  if (!(message.member.roles.some(role => role.name === roleName))) {
    return message.reply("Vous n'êtes pas un Dueliste, je ne peux pas vous laisser faire ça.");
  }
  if(args.length != 2) return message.reply("La liste des arguments est invalide, attente de 2 arguments : +>cardSyntax <langue> <type>.");
  let i;
  let typeValide = 0;
  let langueValide = 0;
  let type = args[1].toLowerCase();
  var valideTypes = new Array("fusion","xyz","synchro","link","spirit","union","gemini","token","marisa");
  /*"fusion","xyz","synchro","link","spirit","union","gemini","token"*/
  var frRules = new Array("Fusion : \"`nom de materiel a`\" + \"`nom de materiel b`\"\nFusion contact : \"`nom de materiel a`\" + \"`nom de materiel b`\" Vous pouvez invoquer specialement cette carte en <envoyant au cimetiere/bannissant> les materiels ci-dessus que vous controlez (auquel cas, n\'utilisez pas \"Polymerisation\").","XYZ : `y`+ monstres niveau `x`","Synchro : `x` monstres Synthoniseur + `y`+ monstres non-Synthoniseur","Link 1 : 1 `ceQueTuVeux` monstre\nLink 2: 2 `ceQueTuVeux` monstres\nLink 3 et plus: 2+ `ceQueTuVeux` monstres","Spirit : Non Invocable Specialement. Durant la End Phase du tour où cette carte est Invoquee Normalement ou retournee face recto : renvoyez-la à la main.","Union : Une fois par tour, vous pouvez SOIT : ciblez 1 monstre `ceQueTuVeux` que vous contrôlez ; equipez cette carte à la cible, SOIT : desequipez cette carte et Invoquez-la Specialement. Un monstre equipe avec cette carte `effet`, et aussi, si le monstre equipe va être detruit au combat ou par un effet de carte, detruisez cette carte à la place.","Gemini : Cette carte est traitee comme un Monstre Normal tant qu'elle est face recto sur le Terrain ou dans le Cimetiere. Tant que cette carte est un Monstre Normal sur le Terrain, vous pouvez l'Invoquer Normalement pour qu'elle devienne un Monstre à Effet avec cet effet.\n● `effet`","Token : Vous pouvez invoquer specialement un jeton `n` \"`nom`\" Token (`Type`-Type/`Attribut`/Level `x`/ATK `y`/DEF `z`).","Marisa : Quand cette carte est Invoquee Normalement, Ciblez 1 carte au hasard dans la main de votre adversaire, et si la carte est un monstre Invocable Normalement, Posable et Invocable Specialement, Invoquez le Specialement de votre côte du terrain, et si vous le faites, votre adversaire pioche 1 carte. Vous pouvez realiser une seconde Invocation Normale le tour ou vous avez active cet effet, mais pas Poser. Vous ne pouvez Invoquer Normalement qu'un seul \"Nom du Monstre\" par tour. Cette carte ne peut pas être sacrifiee le tour où elle a ete invoquee normalement.");
  var enRules = new Array("Fusion : \"`nom de materiel a`\" + \"`nom de materiel b`\"\nFusion contact : \"`nom de materiel a`\" + \"`nom de materiel b`\" You can Special Summon this card by <sending to the graveyard/banishing> the above materials you control (In which case you do not use \"Polymerisation\").","XYZ : `y`+ Level `x` monsters","Synchro : `x` Tuner + `y`+ non-Tuner monsters","Link 1 : 1 `ceQueTuVeux` monster\nLink 2: 2 `ceQueTuVeux` monsters\nLink 3 et plus: 2+ `ceQueTuVeux` monsters","Spirit : Cannot be Special Summoned. [effets] Once per turn, during the End Phase, if this card was Normal Summoned or flipped face-up this turn: Return it to the hand.","Union : Once per turn, you can either: Target 1 `ceQueTuVeux` monster you control; equip this card to that target, OR: Unequip this card and Special Summon it. A monster equipped with this card `effet`, also if the equipped monster would be destroyed by battle or card effect, destroy this card instead.","Gemini : This card is treated as a Normal Monster while face-up on the field or in the Graveyard. While this card is a Normal Monster on the field, you can Normal Summon it to have it become an Effect Monster with this effect.\n● `effet`","Token : Special Summon n \"nom Token\" (`Type`-Type/`ATTRIBUT`/Level `x`/ATK `y`/DEF `z`).","Marisa : When this card is normal summoned, Target 1 random card in your opponent's hand and if the selected card is a monster that can be Normal Summoned, Set and Special Summoned, Special Summon it to your side of the field, and if you do, your opponent draws 1 card. That monster has it's effects negated and is destroyed during the end phase of this turn. After you activate this effect, you can perform another Normal Summon but not Set in addition to your Normal Summon this turn. You can only Normal Summon 1 \"Nom du Monstre\" per turn. This card cannot be tributed the turn it's Normal Summoned.");
  for(i = 0; i < valideTypes.length && !typeValide ;i++){
    if(type == valideTypes[i]) typeValide = 1;
  }
  i--;
  if(args[0].toLowerCase() == "en" || args[0].toLowerCase() == "fr") langueValide = 1;
  if(!langueValide || !typeValide){
    switch (langueValide) {
      case 0:
          return message.reply("La langue n'est pas valide, veuillez preciser une langue qui soit `EN` ou `FR`");
        break;
      default:
        return message.reply("Le type n'est pas valide, veuillez preciser un type qui soit `Token`, `Spirit`, `Union`, `Gemini`, `Synchro`, `XYZ`, `Link` ou `Fusion`")
    }
  }
  switch (args[0].toLowerCase()) {
    case "en":
      return message.author.send(enRules[i]);
      break;
    default:
      return message.author.send(frRules[i]);
  }
}

module.exports.help = {
  name: "cardSyntax",
  type: "YuGiOh", //social fun Private ou admin
  usage: "cardSyntax <langue> <type>",
  desc: "je donne la syntaxe pour la creation de cartes custom. Les langues valides sont `EN` et `FR`. Les types valables sont `Token`, `Spirit`, `Union`, `Gemini`, `Synchro`, `XYZ`, `Link` et `Fusion`."
}
