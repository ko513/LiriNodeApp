
require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var nodeSpotifyApi = require('node-spotify-api');


switch (process.argv[2]) {
  case "concert-this":
    displayBand();
    break;

  case "movie-this":
    displayMovie();
    break;

  case "spotify-this-song":
    displaySong();
}


function displaySong() {
  //  Song to search for, with a fallback if the user does not enter a song title
  var songName, defaultSong = "The%20%Sign";

  process.argv.splice(0, 3);
  songName = process.argv.join(' ')
  if (songName.length == 0)
    songName = defaultSong;
 
  var nsa = new nodeSpotifyApi({
    id: "8fa8f455af8e43f7b583e3b8ab3cb6fc",
    secret: "eb5b2f7962f24bfab9510fe9e8858ea5"
  });

  nsa.search({ type: 'track', query: songName }, function(err, data) {
    if (err) { return console.log('Error occurred: ' + err); }

    var jsonData = data.tracks.items[0].album;

    var songData = [
      "Name:    " + data.tracks.items[0].name,
      "Artist:  " + jsonData.artists[0].name,
      "Album:   " + jsonData.name,
      "Link:    " + jsonData.artists[0].external_urls.spotify
    ].join("\n");

    console.log("\n" + songData + "\n");
  })
}  //  displaySong()



function displayMovie() {
  //  Movie to search for, with a fallback if the user does not enter a song title
  var movieName, defaultMovie = "Mr. Nobody";

  process.argv.splice(0, 3);
  movieName = process.argv.join(' ')
  if (movieName.length == 0)
    movieName = defaultMovie;
 

  // Create a query string for axios to make a request to the OMDB API
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
  
  //  Display the values from the OMDB object returned by the query
  axios.get(queryUrl).then(
    function(response) {
      console.log("\n");
      console.log("Movie:        " + response.data.Title + " (" + response.data.Year + ")");
      console.log("Starring:     " + response.data.Actors);
      console.log("Produced in:  " + response.data.Country);
      console.log("Language(s):  " + response.data.Language);

      console.log("\n" + response.data.Plot);

      console.log("\nRatings:");
      for (i = 0; i < response.data.Ratings.length; i++) {
        var displayRatings = response.data.Ratings[i].Source + ":  " + response.data.Ratings[i].Value;
        if (i == 0)
          { displayRatings +=  " (" + response.data.imdbVotes + " votes)" };
        console.log(displayRatings);
      }
      console.log("\n");
    }  //  function(response)
  );  //  axios query
}  //  displayMovie()



function displayBand() {
  process.argv.splice(0, 3);
  var bandName = process.argv.join(' ')

  //  Create a query string for axios to make a request to the bandsintown API
  var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(
    function(response) {
      console.log("\n");
      console.log("Artist:    " + bandName);
      console.log("Venue:     " + response.data[0].venue.name);
      console.log("Location:  " + response.data[0].venue.city + ", " + response.data[0].venue.region);
      console.log("Date:      " + moment(response.data[0].venue.datetime).format('MM/DD/YYYY'));
      console.log("\n");
    }  //  function(response)
  );  //  axios query
}  //  displayBand()

