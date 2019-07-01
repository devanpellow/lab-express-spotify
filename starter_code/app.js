const express = require("express");
const hbs = require("hbs");

const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

hbs.registerPartials(__dirname + "/views/partials");


const clientId = "1284cf6871ed46a2800ffcc3febd0248",
	clientSecret = "94b2291ba7684f4e8a52aabb73ca46b1";

const spotifyApi = new SpotifyWebApi({
	clientId: clientId,
	clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi
	.clientCredentialsGrant()
	.then(data => {
		spotifyApi.setAccessToken(data.body["access_token"]);
	})
	.catch(error => {
		console.log(
			"Something went wrong when retrieving an access token",
			error
		);
	});

// the routes go here:
app.get("/", (req, res, next) => {
	res.render("index");
});

// get artists
app.get("/artists/", (req, res, next) => {
	const search = req.query.q;

	spotifyApi
		.searchArtists(search)
		.then(data => {

			const items = data.body.artists.items;
      res.render("artists", { items });
      // "artists" is the name of the hbs file in views folder
      // { items } above is the array that will be passed into the view/artists.hbs
		})
		.catch(err => {
			console.log("The error while searching artists occurred: ", err);
		});
});

// get albums
app.get("/albums/:artistId", (req, res) => {
	// console.log(req.params);
	const artistId = req.params.artistId;

	spotifyApi
		.getArtistAlbums(artistId)
		.then(data => {
			const albums = data.body.items;
			res.render("albums", { albums });
		})
		.catch(err => {
			console.log("The error while searching artists occurred: ", err);
		});
});

// get tracks
app.get("/tracks/:albumId", (req, res) => {
  const albumId = req.params.albumId;

  spotifyApi.getAlbumTracks(albumId)
  .then(data => {
    const tracks = data.body.items
    // res.send(tracks)
      res.render("tracks", { tracks });
      
  })
	.catch(err => {
			console.log("Something went wrong!", err);

    })

})

app.listen(3000, () =>
	console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
