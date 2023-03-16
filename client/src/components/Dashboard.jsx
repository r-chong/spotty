import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import useAuth from "../useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./index.css";

const GoodCensor = require("good-censor");
const badwordsArray = require("badwords/array");

// note: this is the app client id, not user
const spotifyApi = new SpotifyWebApi({
  clientId: "75b8ee5250fc4c15b07c36fe24f9b35e",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  // clear search and choose track
  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  // censorship options, for if user requests to not see profanity
  const myCensorOptions = { censorText: "▇" };
  const myCensor = new GoodCensor(badwordsArray);
  const censorEnabled = false;

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get("http://localhost:8888/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    // make request, if new request made, then stop
    // to prevent lots of requests when typing
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className="flex flex-col py-2" style={{ height: "100vh" }}>
      {/* Search box */}
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Part where the songs appear under search */}
      <div
        className="flex flex-col py-2"
        style={{ overflowY: "auto", flexGrow: 1 }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* if no search results then show lyrics*/}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {/* If censorEnabled setting on, then run through good-censor */}
            {censorEnabled ? myCensor.censor(lyrics, myCensorOptions) : lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
