const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())

// middleware to read body, parse it and place results in req.body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/refresh", (req, res) => {
  console.log("refresh endpoint hit")
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/login",
    clientId: "75b8ee5250fc4c15b07c36fe24f9b35e",
    clientSecret: "30b6326f5f454595a1daf3d671ada60e",
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
    redirectUri: "http://localhost:3000",
    clientId: "75b8ee5250fc4c15b07c36fe24f9b35e",
    clientSecret: "30b6326f5f454595a1daf3d671ada60e",
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
      console.log(err)
      res.sendStatus(400)
    })
})

app.listen(3001)
