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

  //Make entire string is lowercase and remove all spaces
  //Remove spaces is to detect things like f u c k
  var message = msg.content.toLowerCase().replace(/ /g, '');

  //Grab who sent the message
  var memberId = msg.member.user.username;

  //Iterate through library of naught words and check the user message for them
  for(var i = 0; i < naughtyWords.length; i++)
  {
    //Save target naughty word and it's id in local variables
    var tarWord = naughtyWords[i].word;
    var wordId = naughtyWords[i].id;

    //Check if the target naughty word is in the message
    checkForNaughtyWord(message, tarWord, memberId, wordId).then(function(data){

      //If it was in the message then select that entry for that word and member
      return selectWordsUttered(data);
    }).then(function(data){
      
      //And update the number of occurrences for that word and member
      return updateWordsUttered(data);
    })
  }

});

let checkForNaughtyWord = function(message, word, memberId, wordId){

  //selectWordsUttered is dependent on this executing, also only want this function to execute one at a time
  return new Promise(function(resolve, reject){
    //See how often the word is found in the string
    var numOccur = occurrences(message, word);

    //If the word was found then resolve, else reject
    if(numOccur > 0){
      
      //If the target word was found then construct a key/value
      //array to hold all pertinent info for the select
      //and update queries
      var data = {"msg" : message, 
                  "tarWord" : word, 
                  "numOccur" : numOccur,
                  "memberId" : memberId,
                  "wordId" : wordId
      };

      //Send that data up
      resolve(data);
    }
    else
      reject();
  }); //End of Promise
}; //End of variable

let selectWordsUttered = function(data){

  //This function is dependent on checkForNaughtyWord and updateWordsUttered is depend on this function
  return new Promise(function(resolve, reject){

    //Construct query string
    var queryStr = util.format("SELECT * FROM words_uttered WHERE member_name='%s' AND word_id=%d;", data["memberId"], data["wordId"]);

    //Debug message
    //console.log(queryStr);

    //Select all entries for memberId in words_uttered table
    con.query(queryStr, function(err, res){
      if(err) {
        throw err;
        reject();
      }else{
        //Confirmation message
        console.log('words_uttered select query complete.');
        data["res"] = res;

        //Return data for use in updateWordsUttered
        resolve(data);
      }
    }); //End of con.query
  }); //End of Promise
}; //End of variable


let updateWordsUttered = function(data){

  //This function will just return a promise since this function is a dependency of selectWordsUttered
  return new Promise(function(resolve, reject){

    //If data is undefined then just use numOccur, else include data's occurrences
    var n = 0;
    if(data["res"].length > 0)
      n = data["numOccur"] + data["res"][0].occurrences;
    else
      n = data["numOccur"];

    var queryStr = "";

    //This word has already been uttered by this user
    if(data["res"].length > 0)
    {
      //Update occurrences with the new number of occurrences found in recent message
      queryStr = util.format("UPDATE words_uttered SET occurrences=%d WHERE word_id=%d;", n, data["wordId"]);

    }else{ //Else this is the user's first time using this word
      //Insert a new entry for this word and user
      queryStr = util.format("INSERT INTO words_uttered (member_name, word_id, occurrences) VALUES ('%s', %d, %d);", data["memberId"], data["wordId"], n);
    }

    //Debug message
    //console.log(queryStr);

    //Execute query
    con.query(queryStr, function(err, res){
      if(err) {
        throw err;
        reject();
      }else{
        //Confirmation message
        console.log('words_uttered update/insert query complete.');
        resolve();
      }
    }); //End of con.query
  }); //End of promise
}; //End of variable


bot.on('ready', () => {

  //Simple message to notify console the bot is ready
  console.log('Fuckin\' SwearJar is online!');
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
    
    //Notify console of an error
    if(err){
      console.log('Error connecting to Db.');
      callback(err, null);
    }
    
    //If no error, print confirmation message
    console.log('Connection for naughty_words query established.');
  });

  //Construct query string
  var queryStr = "SELECT * FROM naughty_words;";

  //Select all naughty words from naughty_words table
  con.query(queryStr,function(err,data){

    //Throw an error if trouble was encountered
    if(err) throw err;

    //Confirmation message
    console.log('Data received from Db...');

    //Send back all them naughty, naughty words
    callback(null, data);
  });
}
