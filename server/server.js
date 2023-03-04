const express =  require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyWebApi = require('spotify-web-api-node');

const app = express();

app.post('/login',(req,res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '75b8ee5250fc4c15b07c36fe24f9b35e',
        clientSecret: ''
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accesToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(()=>{
        res.sendStatus(400)
    })
})