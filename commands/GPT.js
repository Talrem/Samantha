const Discord = require("discord.js")
const { Configuration, OpenAIApi } = require('openai');
const tokenfile = require('../0-jsons/GPTtoken.json');

const configuration = new Configuration({
  apiKey: tokenfile.token,
});

const openai = new OpenAIApi(configuration);

module.exports.run = async (bot, message, args) => {
  try{const prompt = message.content.slice(4);
    const completion = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: prompt,
    });
    return message.channel.send(completion.data.choices[0].text);
  }catch(e){
    return message.reply("Désolé, le capitalisme m'empêche d'acceder à votre requête. Si vous voulez, vous pouvez me financer pour que je puisse répondre, mais David, il a pas de moulah.");
  }
}

module.exports.help = {
  name: "GPT",
  type: "fun",
  usage: "GPT <requête>",
  desc: "je pose une question à mon pote GPT."
}
