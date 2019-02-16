const Discord = require("discord.js");

function decodeMorse(morseCode) {
var ref = {
  '.-':     'a','-...':   'b','-.-.':   'c','-..':    'd','.':      'e',
  '..-.':   'f','--.':    'g','....':   'h','..':     'i','.---':   'j',
  '-.-':    'k','.-..':   'l','--':     'm','-.':     'n','---':    'o',
  '.--.':   'p','--.-':   'q','.-.':    'r','...':    's','-':      't',
  '..-':    'u','...-':   'v','.--':    'w','-..-':   'x','-.--':   'y',
  '--..':   'z','.----':  '1','..---':  '2','...--':  '3','....-':  '4',
  '.....':  '5','-....':  '6','--...':  '7', '---..':  '8', '----.':  '9',
  '-----':  '0',
  ',':',', '!':'!', '?':'?', ';':';', ':':':','\'':'\'',
};

return morseCode.split('   ').map(a => a.split(' ').map(b => ref[b]).join('')).join(' ');
}

function encodeMorse(morseCode) {
var alphabet = {
    'a': '.- ',    'b': '-... ',  'c': '-.-. ', 'd': '-.. ',
    'e': '. ',     'f': '..-. ',  'g': '--. ',  'h': '.... ',
    'i': '.. ',    'j': '.--- ',  'k': '-.- ',  'l': '.-.. ',
    'm': '-- ',    'n': '-. ',    'o': '--- ',  'p': '.--. ',
    'q': '--.- ',  'r': '.-. ',   's': '... ',  't': '- ',
    'u': '..- ',   'v': '...- ',  'w': '.-- ',  'x': '-..- ',
    'y': '-.-- ',  'z': '--.. ',  ' ': '   ',
    '1': '.---- ', '2': '..--- ', '3': '...-- ', '4': '....- ',
    '5': '..... ', '6': '-.... ', '7': '--... ', '8': '---.. ',
    '9': '----. ', '0': '----- ',
    ',':', ', '!':'! ', '?':'? ', ';':'; ', ':':': ','\'':'\' ',
}
return morseCode.split('   ').map(a => a.split(' ').map(b => alphabet[b]).join('')).join(' ');
}

module.exports.run = async (bot, message, args) => {
  message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
  if(args.length < 1) return message.channel.send("Veuillez préciser un message");
  hiddenMessage = "";
  result = "";
  for(i = 0; i < args.length;i++){
    hiddenMessage += args[i].toLowerCase() + " ";
  }
  result = decodeMorse(hiddenMessage);
  if(result == ""){
    hiddenMessage = "";
    for(i = 0; i < args.length;i++){
      hiddenMessage += args[i].split('').join(' ').toLowerCase() + "      ";
    }
    result = encodeMorse(hiddenMessage);
  }
  if(result == "" || result == "  "){
    return message.reply("Saisie invalide, veuillez n'utiliser que des lettres, chiffres ou des espaces ou bien des tirets, des points ou des espaces.\nSi vous utilisez de la ponctuation (`,` `?` `!` `;` `:`) ne mettez pas d'espace entre le signe et la lettre précédente. N'utilisez pas d'autres caractères que ceux cités précédemment");
  }else{
    return message.channel.send(message.author + " veut dire \"" + result + "\"");
  }
}

module.exports.help = {
  name: "morse",
  type: "social", //social fun Private ou admin
  usage: "morse <message>",
  desc: "je transcris un message de morse à alphabétique ou d'alphabétique à morse. Si vous écrivez en Morse, il faut mettre un espace entre chaque caractère et trois espaces entre les mots. Pour l'Alphanumérique, écrivez juste normalement mais sans caractères spéciaux. Les seuls signes de poncutation autorisés sont `,` `:` `!` `;` et `?`"
}
