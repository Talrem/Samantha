require('dotenv').config('../.env');
const Discord = require("discord.js")
const fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const idfile = require('../0-jsons/monID.json');
const cheminfile = require('../0-jsons/chemin.json');

module.exports.run = async (bot, message, args) => {
  fs.readdir(cheminfile.commands,(err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("La commande n'a pas été trouvée");
      return;
    }

    jsfile.forEach((f, i) => {
      let props = require(cheminfile.commands + `${f}`);
      switch(props.help.type){
        case "fun":
        case "social":
        case "admin":
        case "YuGiOh":

          var commands = {
            name: props.help.name,
            description: props.help.desc
          }

          const rest = new REST({version: '10'}).setToken(process.env.TOKEN);
          (async() =>{
              try{
                  console.log(`Registering Slash Command : ${props.help.usage}`)

                  await rest.put(
                      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                      {body: commands}
                  )
                  console.log('Slash commands registered successfully')
              } catch(error){
                  console.log(`Il y a eu une erreur : ${error}\nlors de l'ajout de : ${props.help.usage}`)
              }
          })()
        break;
        case "Private":
          console.log("Commande privée non ajoutée.")
        break;
        default:
          console.log("Il y a eu une erreur. Une commanded dont le type n'existe pas...");
        break;
      }
    });
  });
}

module.exports.help = {
  name: "registerCommands",
  type: "Private",
  usage: "registerCommands",
  desc: "j'enregistre les commandes pour qu'elles soient compatibles avec les Slash Commands."
}