const Discord = require("discord.js");
const config = require("./config.json");
const util = require("util");
const bot = new Discord.Client();

//Init db variable
var mysql = require("mysql");

//Set connection info
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "swearJar"
});

//init global naughtyWords variable
var naughtyWords;

//Make call to get naughtyWords
getNaughtyWords(function(err, data){

  //If there is an error then log it
  //else set global variable with data
  if(err)
    console.log("uh oh...error refreshing words");
  else{
    naughtyWords = data;
  }

});

//For every message...
bot.on("message", msg => {
    
  //Prevent bot-ception
  let role = msg.guild.roles.find("name", "bot");
  if(msg.member.roles.has(role.id)){return;}

  var memberId = msg.member.user.username;

  //Make entire string is lowercase and remove all spaces
  //Remove spaces is to detect things like f u c k
  var message = msg.content.toLowerCase().replace(/ /g, '');
  var charged = 0.0;

  //Iterate through library of naught words and check the user message for them
  for(var i = 0; i < naughtyWords.length; i++)
  {
    //Variable to hold # of occurrences for a word
    var numOccur = 0;

    //Debug message
    //console.log("Checking " + naughtyWords[i].word + "...");

    //See how often the word is found in the string
    numOccur = occurrences(message, naughtyWords[i].word);

    //Accumilate the charge
    charged += numOccur * naughtyWords[i].cost;

    //Debug message
    //console.log("numOccur: " + numOccur);

    //how many occurrences were found
    if(numOccur > 0)
    {
      //See if user has an entry for this word

      var wordId = naughtyWords[i].id;

      //Make call to get naughtyWords
      selectWordsUttered(memberId, wordId, function(err, data){

        //If there was an error with the select then return, else update/insert entry
        if(err)
          return;
        else
          //TODO(adam): numOccur isn't scoping correctly I think, getting passed as 0
          updateWordsUttered(memberId, wordId, numOccur, data);

      });

      //Debug message
      msg.channel.sendMessage(naughtyWords[i].word + ": " + numOccur);
    }
  }

  //Debug message to make sure total message charges accumilating correctly
  msg.channel.sendMessage("That message cost you: $" + charged);

});

bot.on('ready', () => {

  //Debug to make sure all words getting grabbed before bot is ready
  /*for(var i = 0; i < naughtyWords.length; i++)
  {
    //console.log(rows[i].word + ": " + rows[i].cost.toFixed(2));
    if(naughtyWords[i].cost < 0)
      console.log(naughtyWords[i].word + ": ($" + naughtyWords[i].cost.toFixed(2)*-1.00 + ")");
    else
      console.log(naughtyWords[i].word + ": $" + naughtyWords[i].cost.toFixed(2));
  }*/

  console.log('I am ready!');
});

//Load login info for server
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

/*Function that returns a mysql query in a callback
 */
function getNaughtyWords(callback)
{
  //Establish a connection to the db
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db.');
      callback(err, null);
      //return;
    }
    console.log('Connection for naughty_words query established.');
  });

  var queryStr = "SELECT * FROM naughty_words;";

  //Select all naughty words from naughtyWords table
  con.query(queryStr,function(err,data){
    if(err) throw err;

    //Confirmation message
    console.log('Data received from Db...');

    callback(null, data);
  });

  /*//Close connection to db
  con.end(function(err){
    if(err) throw err;

    console.log("Connection for naughty_words query closed.");
  });*/

}

function selectWordsUttered(memberId, wordId, callback)
{

  /*//Establish a connection to the db
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db for words_uttered select query.');
      throw err;
      callback(err, null);
    }else{
      console.log('Connection for words_uttered select query established.');


      //Close connection to db
      con.end(function(err){
        if(err) throw err;

        console.log("Connection for words_uttered select query closed.");
      });

    }

  });*/


      var queryStr = util.format("SELECT * FROM words_uttered WHERE member_name='%s' AND word_id=%d;", memberId, wordId);
      console.log(queryStr);

      //Select all entries for memberId in words_uttered table
      con.query(queryStr, function(err, res){
        if(err) throw err;

        //Confirmation message
        console.log('words_uttered select query complete.');

        callback(null, res);
      });
}

function updateWordsUttered(memberId, wordId, numOccur, data)
{
  /*//Establish a connection to the db
  con.connect(function(err){
    if(err){
      console.log('Error connecting to Db for words_uttered insert query.');
      console.log(err);
      return;
    }
    console.log('Connection for words_uttered insert query established.');
  });*/

  console.log("starting update query...");
  var queryStr = "";

  //This word has already been uttered by this user
  if(data.length > 0)
  {
    console.log("Updated! " + (numOccur + data.occurrences));
    //Update occurrences with the new number of occurrences found in recent message
    queryStr = util.format("UPDATE words_uttered SET occurrences=%d;", numOccur + data.occurrences);

  }else{ //Else this is the user's first time using this word
    //Insert a new entry for this word and user
    console.log("New! " + numOccur);
    queryStr = util.format("INSERT INTO words_uttered (member_name, word_id, occurrences) VALUES ('%s', %d, %d);", memberId, wordId, numOccur);
  }

  console.log(queryStr);

  //Execute query
  con.query(queryStr, function(err, res){
    if(err) throw err;

    //Confirmation message
    console.log('words_uttered update/insert query complete.');

  });

  /*
  //Close connection to db
  con.end(function(err){
    if(err) throw err;

    console.log("Connection for words_uttered insert query closed.");
  });*/
}
