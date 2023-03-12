const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  console.log("refresh endpoint hit")
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/",
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
      console.log("this is refresh check " + data.body.access_token)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  console.log('I have logged in')
  const code = req.body.code
  console.log("req body code is " + code)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/",
    clientId: "75b8ee5250fc4c15b07c36fe24f9b35e",
    clientSecret: "30b6326f5f454595a1daf3d671ada60e",
  })

  spotifyApi.authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
      console.log("this is login check " + data.body.access_token)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.listen(3001)
