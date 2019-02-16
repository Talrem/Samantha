const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    return message.reply(new Date().getTime() - message.createdTimestamp + " ms -- pong !").then(msg => msg.delete(5000)).catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
}

module.exports.help = {
  name: "ping",
  type: "social",
  usage: "ping",
  desc: "je répond à votre message."
}
