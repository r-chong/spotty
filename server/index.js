require("dotenv").config()
const path = require('path');
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")
const port = process.env.PORT || 8080;

const app = express()
app.use(cors())

// middleware to read body, parse it and place results in req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// deta??
app.listen(port, '0.0.0.0');
app.use(express.static(path.resolve(__dirname, './build')));

app.use("/refresh", (req, res) => {
  console.log("refresh endpoint hit")
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    // This was http://localhost:3000/login, watch to see if errors from .env
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
            });
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      // console.log(data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})


app.get("/lyrics", async (req, res) => {
  const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.get('/*', async (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});
app.get('/favicon.ico', async (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'favicon.ico'));
});