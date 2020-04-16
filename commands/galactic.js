const Discord = require("discord.js");

function decodeGalactique(galactiqueCode) {
    var ref = {
        'ᔑ':'a',
        'ʖ':'b',
        'ᓵ':'c',
        '↸':'d',
        'ᒷ':'e',
        '⎓':'f',
        '⊣':'g',
        '⍑':'h',
        '╎':'i',
        '⋮':'j',
        'ꖌ':'k',
        'ꖎ':'l',
        'ᒲ':'m',
        'リ':'n',
        '𝙹':'o',
        '!¡':'p',
        'ᑑ':'q',
        '∷':'r',
        'ᓭ':'s',
        'ℸ ̣':'t',
        '⚍':'u',
        '⍊':'v',
        '∴':'w',
        ' ̇/':'x',
        '||':'y',
        '⨅':'z',
        '1':  '1','2':  '2','3':  '3','4':  '4',
        '5':  '5','6':  '6','7':  '7', '8':  '8', '9':  '9',
        '0':  '0','._.':'.',
        ',':',', '!':'!', '?':'?', ';':';', ':':':','\'':'\'',
    };

    return galactiqueCode.split('  ').map(a => a.split(' ').map(b => ref[b]).join('')).join(' ');
}

function encodeGalactique(galactiqueCode) {
    var alphabet = {
        'a': 'ᔑ ', 'b': 'ʖ', 'c': 'ᓵ ', 'd': '↸ ',
        'e': 'ᒷ ', 'f': '⎓ ', 'g': '⊣ ', 'h': '⍑ ',
        'i': '╎ ', 'j': '⋮ ', 'k': 'ꖌ ', 'l': 'ꖎ ',
        'm': 'ᒲ ', 'n': 'リ ', 'o': '𝙹 ', 'p': '!¡ ',
        'q': 'ᑑ ', 'r': '∷ ', 's': 'ᓭ ', 't': 'ℸ ̣ ',
        'u': '⚍ ', 'v': '⍊ ', 'w': '∴ ', 'x': '̇/ ',
        'y': '|| ', 'z': '⨅ ', ' ': ' ',
        '.':'._.',',':', ', '!':'! ', '?':'? ', ';':'; ', ':':': ','\'':'\' ',
    }
    return galactiqueCode.split('  ').map(a => a.split(' ').map(b => alphabet[b]).join('')).join(' ');
}

module.exports.run = async (bot, message, args) => {
    message.delete().catch(error => console.log(`Impossible de supprimer le messages car ${error}`));
    if(args.length < 1) return message.channel.send("Veuillez préciser un message");
    hiddenMessage = "";
    result = "";
    for(i = 0; i < args.length;i++){
        hiddenMessage += args[i].toLowerCase() + " ";
    }
    result = decodeGalactique(hiddenMessage);
    if(result == ""){
        hiddenMessage = "";
        for(i = 0; i < args.length;i++){
            hiddenMessage += args[i].split('').join(' ').toLowerCase() + "      ";
        }
        result = encodeGalactique(hiddenMessage);
    }
    if(result == "" || result == "  "){
        return message.reply("Saisie invalide, veuillez n'utiliser que des lettres, chiffres ou des espaces ou bien des tirets, des points ou des espaces.\nSi vous utilisez de la ponctuation (`,` `?` `!` `;` `:`) ne mettez pas d'espace entre le signe et la lettre précédente. N'utilisez pas d'autres caractères que ceux cités précédemment");
    }else{
        return message.channel.send(message.author + " veut dire \"" + result + "\"");
    }
}

module.exports.help = {
    name: "galactic",
    type: "social", //social fun Private ou admin
    usage: "galactic <message>",
    desc: "je transcris un message de galactique à alphabétique ou d'alphabétique à galactique. Si vous écrivez en Galactique, il faut mettre un espace entre chaque caractère et trois espaces entre les mots. Pour l'Alphanumérique, écrivez juste normalement mais sans caractères spéciaux. Les seuls signes de poncutation autorisés sont `,` `:` `!` `;` et `?`"
}
