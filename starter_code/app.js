const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
var Spotify = require('spotify-web-api-js');
var s = new Spotify();


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:
const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = '1284cf6871ed46a2800ffcc3febd0248',
    clientSecret = '94b2291ba7684f4e8a52aabb73ca46b1';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })



// the routes go here:


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
