const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();


var mysql = require("mysql");
var naughtyWords = require("./words.json");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "swearJar"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});


bot.on("message", msg => {
  if (msg.content.startsWith("ping")) {
    msg.channel.sendMessage("pong!");
  }else if (!msg.content.startsWith("ping")){
    
    //Prevent bot-ception
    let role = msg.guild.roles.find("name", "bot");
    if(msg.member.roles.has(role.id)){return;}

    refreshWords();

    //Make entire string lowercase and remove all spaces
    //Remove spaces is to detect things like f u c k
    var message = msg.content.toLowerCase().replace(/ /g, '');
    var charged = 0.0;

    //Iterate through library of naught words and check the user message for them
    for(var i = 0; i < naughtyWords.naughtyWords.length; i++)
    {
      var num = 0;
      console.log("Checking " + naughtyWords.naughtyWords[i].word + "...");

      //See how often the word is found in the string
      num = occurrences(message, naughtyWords.naughtyWords[i].word);

      charged += num * naughtyWords.naughtyWords[i].cost;

      console.log("num: " + num);

      //Test message
      if(num > 0)
      {
        msg.channel.sendMessage(naughtyWords.naughtyWords[i].word + ": " + num);
      }
    }

    msg.channel.sendMessage("That message cost you: $" + charged);

  }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login(config.token);

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function refreshWords()
{
  naughtyWords = require("./words.json");
}
