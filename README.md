# LiriNodeApp
Node command-line app that searches Spotify, Bands in Town, and OMDB for information

LIRI is an app that you run from the Terminal-BASH command line. LIRI uses AJAX search of web APIs to display three different kinds of entertainment information:
•    Movies – By title, searching the OMDB API
•    Songs – By title, searching the Spotify API
•    Bands – By band/artist name, searching the Bandsintown API

BASH Input – Songs
To search for a song on Spotify, run the app and enter a string like this:
$ node liri.js spotify-this-song


BASH Input – Movies
To search for a movie title in the Online Movie Database, run the app and enter a string like this:
$ node liri.js movie-this ronin

LIRI displays a few lines of information about the movie. If no title is entered, the information for the film “Mr. Nobody” is displayed.


BASH Input – Bands
To search “Bandsintown” for entertainment, run the app and enter a string like this:
$ node liri.js concert-this Emo Night Karaoke

