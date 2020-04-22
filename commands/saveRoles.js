const Discord = require("discord.js")
const fs = require("fs");
const rolefile = require("../json/roles.json");

module.exports.run = async (bot, message, args) => {
    if(message.author.id==="281484394290741250") return message.reply("Mais voyons, vous savez que ça ne sert à rien :)").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    message.channel.send("Êtes-vous sûr(e) de vouloir sauvegarder tout les rôles que vous avez `ACTUELLEMENT` dans le fichier de sauvegarde ? Veuillez réagir à ce message avec 👍 si c'est ce que vous voulez.")
    .then(msg=>{
        msg.react("👍");
        bot.on('messageReactionAdd', (reaction, user) => {
            if(!user.bot){
                let member = message.member;
                if(user.id == member.id){
                    var roles = member.roles.array();
                    var roleIDs = new Array();
                    for(var i =0; i < roles.length; i++){
                        roleIDs[i] = roles[i].id;
                    }

                    rolefile[message.author.id] = {
                        roles:roleIDs
                    };

                    fs.writeFile("./json/roles.json", JSON.stringify(rolefile), (err) =>{
                        if(err) console.log(err);
                    })
                    return message.reply("C'est fait !");

                }
            };
        });
    });
}

module.exports.help = {
    name: "saveRoles",
    type: "social",
    usage: "saveRoles",
    desc: "je stock les rôles de l'utilisateur pour pouvoir les lui réappliquer avec la commande `saveMe`."
}
