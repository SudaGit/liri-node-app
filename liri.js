 clientKeys = require('./keys.js');
 liritwit = require('twitter');
 lirispot = require('spotify');
 liriimdb = require('request');
 liriinq  = require('inquirer');
 lirifa   = require('fs');

 var thisAction = "";
 var thisSong = "";
 var thisMovie = "";


 liriinq.prompt([
 {name: 'thisAction', message: 'Choose your option', type:'list', choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'] }
 ]).then(function(answers){
      
         thisAction = answers.thisAction;
         console.log(thisAction);

 switch (thisAction){
  case 'my-tweets':
       liriTweets();
       break;

  case 'spotify-this-song':
         //console.log(thisAction);

       liriinq.prompt([{name: 'thisSong', message: 'Spotify Which song ?', default: "What's my age again?"}]).then(function(spotifySong){
		       
		                thisSong = spotifySong.thisSong; 
			        liriSpot();
				}); 

         break;
  case 'movie-this':
       liriinq.prompt([ {name: 'thisMovie', message: 'Request Which movie?' } ]).then(function(answers){
      
         thisMovie = answers.thisMovie;
	 liriMovieRequest() ; });
         break;
  case 'do-what-it-says':
         break;
  default:
     console.log("please choose a valid Action");
     console.log("valid actions are: " + "my-tweets\n"+ "spotify-this-song [song name]\n" + "movie-this [movie name]\n" + "do-what-it-says");

  };
 });



// get tweets from twitter
function liriTweets(){
 var client = new liritwit ({
   consumer_key: clientKeys.twitterKeys.consumer_key,
     consumer_secret: clientKeys.twitterKeys.consumer_secret,
       access_token_key: clientKeys.twitterKeys.access_token_key,
         access_token_secret: clientKeys.twitterKeys.access_token_secret
	 });

 console.log(client);

 client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
   if (!error){
   for (var i = 0; i<1; i++){ 
   console.log(tweets);
   console.log(response);
   }
   }
   else {
    console.log(" error occured " + error);
   };
   });
   };




// Search Song using Spotify
function liriSpot() 
{
 lirispot.search({ type: 'track', query: thisSong}, function(err, data) {
    if ( err ) {
            console.log('Error occurred: ' + err);
	    return;
	}
     else { 
     
            console.log("you requested information for " + thisSong);
            console.log("now displaying first two results" + thisSong);
	    for (i=0;i<2;i++)
	    {
           console.log("Song Name   : " + data.tracks.items[i].name); 
           console.log("Album       : " + data.tracks.items[i].album.name); 
           console.log( "Artists    : " + data.tracks.items[i].artists[0].name); 
           console.log("Preview Url : " + data.tracks.items[i].preview_url); 
	   console.log("");
	   console.log("______________________");
	   }
          
     }
			 
			     });
};

// get Movie information
function liriMovieRequest() 
{
  var url = "http://www.omdbapi.com/?t=" + thisMovie + "&r=json";
 
 liriimdb({url: url}, function (error, response, body) {

   var jmovie = JSON.parse(body);
    //console.log(body);
    //console.log(jmovie);
    console.log("Title        : " + jmovie.Title);
    console.log("Year         : " + jmovie.Year);
    console.log("Rated        : " + jmovie.Rated);
    console.log("Country      : " + jmovie.Country);
    console.log("Language     : " + jmovie.Language);
    console.log("Plot         : " + jmovie.Plot);
    console.log("Actors       : " + jmovie.Actors); 
    });
}

function liriFileAction(){}
